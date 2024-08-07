import React, { useEffect, useRef, useState } from 'react'
import { db, storage } from '../../main'
import Moment from 'react-moment';
import Container from '../../UI/Container/Container';
import GroupSideBar from './GroupSideBar';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MdAdd, MdOutlineAddReaction } from 'react-icons/md';
import classes from "./Chats.module.css"
import './grp.css'
import { RxCross2 } from 'react-icons/rx';
import firebase from 'firebase';
import Cookies from "js-cookie"
import FallDoc from '../../Components/FallbackImgae/FallDoc';

const GroupChat = () => {
    const [show, setShow] = useState(false)
    const [newMessage, setNewMessage] = useState("");
    const [messageCollection, setMessageCollection] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null); // State to manage selected chat

    const [isExpanded, setIsExpanded] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [chatId, setChatId] = useState(""); // Assuming chatId is dynamically determined
    const [senderId, setSenderId] = useState(""); // Assuming senderId is dynamically determined
    const [usersMap, setUsersMap] = useState({}); // State to store user details for quick lookup
    const [user_Id, setUser_Id] = useState(null); // State to hold logged-in user's ID
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState(null);
    const [childFunction, setChildFunction] = useState(null);

    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let userEmailLogged = profileToken?.user?.email
    console.log(userEmailLogged)
    const myDivRef = useRef()

    const scrollToBottom = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageCollection]);
    const toggleExpansion = () => {
        const scrollPosition = myDivRef.current.scrollTop;
        setIsExpanded(!isExpanded);
        myDivRef.current.scrollTop = scrollPosition;
    };

    const fetchLoggedInUser = async (userEmail) => {
        try {
            const usersRef = db.collection("users");
            const querySnapshot = await usersRef.where("email", "==", userEmail).get();

            if (!querySnapshot.empty) {
                const loggedInUser = querySnapshot.docs[0].data();
                setUser_Id(querySnapshot.docs[0].id); // Set user_Id to the logged-in user's ID
            } else {
                //console.log(`No user found with email ${userEmail}`);
            }
        } catch (error) {
            //console.error("Error fetching logged-in user:", error);
        }
    };
    const handleEmojiClick = (emoji) => {
        setNewMessage(newMessage + emoji.native);
    };
    const resetFunc = () => {
        setFileName(null)
        setFile(null)
    }
    // Fetch logged-in user details when component mounts
    useEffect(() => {
        const userEmail = userEmailLogged; // Replace with actual logged-in user's email or context
        fetchLoggedInUser(userEmail);
    }, []);

    // Function to fetch messages by chatId
    const getMessagesByChatId = async (chatId) => {
        try {
            const messagesRef = db.collection("chats").doc(chatId).collection("messages");
            const messagesQuerySnapshot = await messagesRef.orderBy("timestamp").get();

            const messages = [];
            messagesQuerySnapshot.forEach(doc => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return messages;
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    };

    // Update messages when selectedChat changes
    useEffect(() => {
        if (selectedChat) {
            getMessagesByChatId(selectedChat.id)
                .then(messages => {
                    setMessageCollection(messages);
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        }
    }, [selectedChat]);



    const fileInputRef = useRef()
    const handleFileChange = (e) => {
        const file2 = e.target.files[0];
        setFile(file2)
        if (file2) {
            const fileType = file2.type;
            const reader = new FileReader();

            reader.onload = (e) => {
                setFileName(e.target.result)
            };
            reader.readAsDataURL(file2);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleUpload = () => {
        return new Promise((resolve, reject) => {
            if (file) {
                const uploadTask = storage.ref(`uploads/${file.name}`).put(file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {

                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    },
                    (error) => {
                        console.error(error.message);
                        reject(error.message);
                    },
                    () => {
                        storage
                            .ref('uploads')
                            .child(file.name)
                            .getDownloadURL()
                            .then((url) => {
                                resolve(url);
                            })
                            .catch((error) => {
                                reject(error.message);
                            });
                    }
                );
            }
            else {
                resolve(null)
            }
        });
    };


    const getChatsByUserEmail = async (userEmail) => {
        try {
            // Step 1: Fetch user document to get userId
            const usersRef = db.collection("users");
            const userQuerySnapshot = await usersRef.where("email", "==", userEmail).get();

            let userId = null;
            userQuerySnapshot.forEach(doc => {
                userId = doc.id; // Assuming email is unique, get the userId
            });

            if (!userId) {
                //console.log(`No user found with email ${userEmail}`);
                return [];
            }

            // Step 2: Fetch chats where userId is in participants array
            const chatsRef = db.collection("chats");
            const chatsQuerySnapshot = await chatsRef.where("userIds", "array-contains", userId).get();

            // Extract and return chats data
            const chats = [];
            chatsQuerySnapshot.forEach(doc => {
                chats.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return chats;
        } catch (error) {
            //console.error("Error fetching chats:", error);
            return [];
        }
    };



    const sendMessage = async () => {
        let fileUrl = '';
        if (file) {
            fileUrl = await handleUpload();
            console.log(fileUrl);
        }

        try {
            // Check if chatId and senderId are valid before sending message
            if (!chatId || !senderId || (!newMessage.trim() && !file)) {
                //console.error("ChatId or senderId is not valid.");
                return;
            }

            const chatsRef = db.collection("chats");
            const chatDocRef = chatsRef.doc(chatId);
            const messagesCollectionRef = chatDocRef.collection("messages");
            const messageData = {
                senderId: senderId,
                text: newMessage.trim(),
                readBy: [senderId],
                timestamp: new Date(),
                // latestTime: new Date()
            };

            if (fileUrl) {
                messageData.fileUrl = fileUrl;
            }
            await messagesCollectionRef.add(messageData);
            // await messagesCollectionRef.add({
            //     senderId: senderId,
            //     text: newMessage.trim(),
            //     readBy: [senderId],
            //     timestamp: new Date(),
            //     //   latestMessage: new Date()
            // });
            // await chatsRef.add({

            //       latestMessage: new Date()
            // });


            //     await chatsRef.add({

            //         latestMessage: new Date()
            //   });
            // await messagesCollectionRef.add({
            //     senderId: senderId,
            //     text: newMessage.trim(),
            //     readBy: [senderId],
            //     timestamp: new Date(),
            //     //   latestMessage: new Date()
            // });
            // await chatsRef.add({

            //       latestMessage: new Date()
            // });

            await db.collection("chats").doc(chatId).update({ latestMessage: new Date() });
            // await db.collection('chats')

            setNewMessage("");
            setFile(null)
            setShowEmojiPicker(false)

        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };


    // Function to fetch chats and set chatId dynamically
    const fetchChatsAndSetChatId = async () => {
        try {
            const userEmail = userEmailLogged;
            const chats = await getChatsByUserEmail(userEmail);

            if (chats.length > 0) {
                setChatId(chats[0].id); // Set chatId dynamically
            } else {
                console.log("No chats found for the user.");
            }
        } catch (error) {
            console.error("Error fetching chats: ", error);
        }
    };

    // Function to fetch senderId (assuming it's based on logged-in user or context)
    const fetchSenderId = async () => {
        try {

            const userEmail = userEmailLogged;
            const usersRef = db.collection("users");
            const userQuerySnapshot = await usersRef.where("email", "==", userEmail).get();

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                setSenderId(userDoc.id);
            } else {
                console.log(`No user found with email ${userEmail}`);
            }
        } catch (error) {
            console.error("Error fetching senderId: ", error);
        }
    };

    // Fetch chats and senderId on component mount
    useEffect(() => {
        fetchChatsAndSetChatId();
        fetchSenderId();
    }, []);



    const fetchUserDetails = async (userId) => {
        try {
            const usersRef = db.collection("users");
            const userDoc = await usersRef.doc(userId).get();

            if (userDoc.exists) {
                return userDoc.data();
            } else {
                //console.log(`No user found with ID ${userId}`);
                return null;
            }
        } catch (error) {
            //console.error("Error fetching user details:", error);
            return null;
        }
    };

    const unreadMsg = (data) => {
        console.log(data)
        setChildFunction(() => data);
    }
    // 
    const markMessagesAsRead = async (chatId) => {
        console.log(chatId)
        const messagesRef = db.collection('chats').doc(chatId).collection('messages');
        const snapshot = await messagesRef.limit(15).get();

        let unreadMsgs = 0
        let chats = [];
        snapshot.forEach(doc => {
            let data = doc.data()
            console.log(data)
            if (!data.readBy.includes(user_Id)) {
                chats.push(doc.id)
                // unreadMsgs = unreadMsgs + 1
            }
            // chats.push({
            //   id: doc.id,
            //   ...doc.data()
            // });
        });

        const batch = db.batch();
        chats.forEach(doc => {
            batch.update(messagesRef.doc(doc), { readBy: firebase.firestore.FieldValue.arrayUnion(user_Id) });
        });
        await batch.commit();
        // 
        if (childFunction) {
            childFunction();
        } else {
            console.log('Child function is not registered yet.');
        }
    };


    useEffect(() => {
        let unsubscribe = null;

        if (chatId) {
            if (unsubscribe) {
                unsubscribe();
            }

            unsubscribe = receiveMessages(chatId, (messages) => {
                // Fetch user details for each message senderId and update messageCollection
                const updateMessagesWithUserDetails = async () => {
                    const updatedMessages = [];
                    for (const message of messages) {
                        let user = usersMap[message.senderId];
                        if (!user) {
                            // Fetch user details if not already fetched
                            const userDetails = await fetchUserDetails(message.senderId);
                            if (userDetails) {
                                user = userDetails;
                                setUsersMap(prevMap => ({
                                    ...prevMap,
                                    [message.senderId]: userDetails
                                }));
                            }
                        }

                        updatedMessages.push({
                            ...message,
                            senderName: user ? user.name : "Unknown User"
                        });
                    }
                    console.log(updatedMessages)
                    if (childFunction) {
                        console.log("cjilddd")
                        await childFunction();
                    } else {
                        console.log('Child function is not registered yet.');
                    }
                    setMessageCollection(updatedMessages);
                };

                updateMessagesWithUserDetails();
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [chatId, usersMap]);

    const receiveMessages = (chatId, callback) => {
        try {
            const messagesCollectionRef = db.collection("chats").doc(chatId).collection("messages");

            // Constructing the query
            messagesCollectionRef
                .orderBy("timestamp")
                .onSnapshot(snapshot => {
                    const messages = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    callback(messages);
                });
        } catch (error) {
            //console.error("Error receiving messages:", error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = timestamp.toDate();
        return <Moment format="hh:mm A">{date}</Moment>;
    };
    const formatDatestamp = (timestamp) => {
        const date = timestamp.toDate();
        return <Moment format="DD-MM-YYYY">{date}</Moment>;
    };


    // Function to handle chat selection from GroupSideBar

    const handleChatSelection = async (chat) => {
        console.log(chat)
        setSelectedChat(chat); // Set selected chat
        setChatId(chat.id); // Set chatId for sending/receiving messages
        await markMessagesAsRead(chat.id)
    };


    const isImage = (fileUrl) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
        // Split the URL by '.' and get the last part (which contains the file name and extension)
        const parts = fileUrl.split('.');
        const fileExtension = parts.pop().split('?')[0].toLowerCase(); // Extract extension, ignoring any query parameters
        return imageExtensions.includes(fileExtension);
    };

    const downloadFile = (
        filePath
    ) => {
        let fileName = filePath
        console.log(fileName)

        fetch(`${filePath}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
            });
    };


    return (
        <div>
            <div className="home_container" style={{ display: "flex" }}>
                <GroupSideBar onChatSelect={handleChatSelection} user_Id={user_Id} chatId={chatId} unreadMsg={unreadMsg} funcValue={show} setFunc={setShow} />
                <div className={`chat ${show === true ? "active_chat" : ""}`} onClick={() => showEmojiPicker && setShowEmojiPicker(false)}>
                    {selectedChat ? ( // Conditional rendering based on selectedChat
                        <>
                            <div className="chatInfo">
                                <div className="userChatImg_div">

                                    <div style={{ marginLeft: "10px" }}>
                                        <span className="span_chat">  {selectedChat?.name}</span>

                                    </div>
                                </div>
                            </div>
                            <div className="message-container" ref={myDivRef}>
                                {messageCollection.map((message) =>
                                    <div key={message.id} className={`message ${message.senderId === senderId ? 'user' : 'other'}`}>

                                        {message.senderId !== senderId && (
                                            <>
                                                <h3 className='headingg'>{message.senderName}</h3>
                                                <div className="msg_txt_div p-0">
                                                    {message.text && message.fileUrl ? (
                                                        <div>
                                                            {isImage(message.fileUrl) ? (
                                                                <img
                                                                    src={message.fileUrl}
                                                                    className="img_user"
                                                                    style={{ border: "1px solid #d9d9d9", overflow: "hidden", background: "white" }}
                                                                    alt="User uploaded content"
                                                                />
                                                            ) : (
                                                                <a href={message.fileUrl} className={`${classes.aa_link} msg_txt`} target="_blank" rel="noopener noreferrer">
                                                                <FallDoc imgData={message?.fileUrl} cls={classes.imgUrl} />
                                                             </a>
                                                            )}
                                                            {/* <img src={message.fileUrl} className="img_user" style={{
                                                            border: "1px solid #d9d9d9", overflow: "hidden",
                                                            background: "white"
                                                        }} />*/}
                                                            <p
                                                                style={{ display: "grid", padding: "10px", background: "white", border: "1px solid #d9d9d9", borderRadius: "0 0 5px 5px" }}
                                                                className={`msg_txt you-msg `}
                                                            >
                                                                {isExpanded ? message.text : message.text.slice(0, 300)}
                                                                {message.text.length > 300 && (
                                                                    <button className="msg_readmore" onClick={toggleExpansion}>
                                                                        {isExpanded ? "Read Less" : "Read More"}
                                                                    </button>
                                                                )}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        message.text ? (
                                                            <>

                                                                <p
                                                                    style={{ display: "grid" }}
                                                                    className={`msg_txt you-msg`}
                                                                >
                                                                    {isExpanded ? message.text : message.text.slice(0, 300)}
                                                                    {message.text.length > 300 && (
                                                                        <button className="msg_readmore" onClick={toggleExpansion}>
                                                                            {isExpanded ? "Read Less" : "Read More"}
                                                                        </button>
                                                                    )}
                                                                </p></>
                                                        ) : (
                                                            <>
                                                                {isImage(message.fileUrl) ? (
                                                                    <img
                                                                        src={message.fileUrl}
                                                                        className="img_user"
                                                                        style={{ border: "1px solid #d9d9d9", overflow: "hidden", background: "white" }}
                                                                        alt="User uploaded content"
                                                                    />
                                                                ) : (
                                                                    <a href={message.fileUrl} className={`${classes.aa_link} msg_txt`} target="_blank" rel="noopener noreferrer">
                                                                    <FallDoc imgData={message?.fileUrl} cls={classes.imgUrl} />
                                                                 </a>
                                                                )}
                                                            </>
                                                            // <img src={message.fileUrl} style={{
                                                            //     border: "1px solid #d9d9d9", overflow: "hidden",
                                                            //     background: "white"
                                                            // }} className="img_user" />
                                                        )
                                                    )}
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
                                                    <p style={{
                                                        fontSize: "10px", color: "black",
                                                        fontWeight: "500",
                                                        margin: "10px 0"
                                                    }}>
                                                        {formatTimestamp(message.timestamp)}                                        </p>
                                                    <p style={{
                                                        fontSize: "10px", color: "black",
                                                        fontWeight: "500",
                                                        margin: "10px 0"
                                                    }}> {formatDatestamp(message.timestamp)}</p>
                                                </div>
                                            </>
                                        )}
                                        {message.senderId === senderId && (
                                            <>
                                                <h3 className='headingg'>You</h3>
                                                <div className="msg_txt_div">
                                                    {message.text && message.fileUrl ? (
                                                        <div className="d-grid gap-3" style={{ display: "grid" }}>
                                                            {/* <img src={message.fileUrl} className="img_user" style={{
                                                        border: "1px solid #d9d9d9", overflow: "hidden",
                                                        background: "white"
                                                    }} /> */}
                                                            {isImage(message.fileUrl) ? (
                                                                <img
                                                                    src={message.fileUrl}
                                                                    className="img_user"
                                                                    style={{ border: "1px solid #d9d9d9", overflow: "hidden", background: "white" }}
                                                                    alt="User uploaded content"
                                                                />
                                                            ) : (
                                                                <a href={message.fileUrl} className={`${classes.aa_link} msg_txt`} target="_blank" rel="noopener noreferrer">
                                                                   <FallDoc imgData={message?.fileUrl} cls={classes.imgUrl} />
                                                                </a>
                                                            )}
                                                            <p
                                                                style={{ display: "grid", padding: "10px", background: "white", border: "1px solid #d9d9d9", borderRadius: "0 0 5px 5px" }}
                                                                className={`msg_txt you-msg `}
                                                            >
                                                                {isExpanded ? message.text : message.text.slice(0, 300)}
                                                                {message.text.length > 300 && (
                                                                    <button className="msg_readmore" onClick={toggleExpansion}>
                                                                        {isExpanded ? "Read Less" : "Read More"}
                                                                    </button>
                                                                )}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        message.text ? (
                                                            <p style={{ display: "grid" }}
                                                                className={`msg_txt you-msg`}
                                                            >
                                                                {isExpanded ? message.text : message.text.slice(0, 300)}
                                                                {message.text.length > 300 && (
                                                                    <button className="msg_readmore" onClick={toggleExpansion}>
                                                                        {isExpanded ? "Read Less" : "Read More"}
                                                                    </button>
                                                                )}
                                                            </p>
                                                        ) : (
                                                            // <img src={message.fileUrl} className="img_user" style={{
                                                            //     border: "1px solid #d9d9d9", overflow: "hidden",
                                                            //     background: "white"
                                                            // }} />
                                                            <>
                                                                {isImage(message.fileUrl) ? (
                                                                    <img
                                                                        src={message.fileUrl}
                                                                        className="img_user"
                                                                        style={{ border: "1px solid #d9d9d9", overflow: "hidden", background: "white" }}
                                                                        alt="User uploaded content"
                                                                    />
                                                                ) : (
                                                                    <a href={message.fileUrl} className={`${classes.aa_link} msg_txt`} target="_blank" rel="noopener noreferrer">
                                                                   <FallDoc imgData={message?.fileUrl} cls={classes.imgUrl} />
                                                                </a>
                                                                )}
                                                            </>
                                                        )
                                                    )}
                                                </div>
                                                <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
                                                    <p style={{
                                                        fontSize: "10px", color: "black",
                                                        fontWeight: "500",
                                                        margin: "10px 0"
                                                    }}>
                                                        {formatTimestamp(message.timestamp)}                                        </p>
                                                    <p style={{
                                                        fontSize: "10px", color: "black",
                                                        fontWeight: "500",
                                                        margin: "10px 0"
                                                    }}>{formatDatestamp(message.timestamp)}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                )}
                            </div>

                            {chatId && (
                                <div className="inputPanel">
                                    <div className="inputWrapper">

                                        <Container cls="d-flex flex-column row-gap-1 px-3 py-1">
                                            <input
                                                type="text"
                                                className="chat_input"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Message ..."
                                                style={{ border: "none", background: "none", outline: "none" }}
                                            />
                                            {file &&
                                                <div className={classes.render_img}>
                                                    <FallDoc imgData={filename} alt="" />
                                                    <button type='button' onClick={resetFunc} className={classes.del_btn}><RxCross2 style={{ color: "white" }} /></button>
                                                </div>
                                            }

                                            <div className="chat_send gap-2" style={{ cursor: "pointer" }}>

                                                <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file" />
                                                <label htmlFor="file">
                                                    <MdAdd style={{ cursor: "pointer" }} />
                                                </label>

                                                <MdOutlineAddReaction onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
                                                <div className="chat_send1">
                                                    {showEmojiPicker && (
                                                        <Picker data={data} onEmojiSelect={handleEmojiClick} />
                                                    )}
                                                </div>
                                            </div>
                                        </Container>


                                    </div>

                                    <button
                                        onClick={sendMessage}
                                        className="search_input sendmsg_img"
                                    >

                                        Send
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={classes.noChatSelected}>
                            <p>No user found</p>

                            <p>Select a chat to start conversation</p>
                        </div>
                    )}




                </div>
            </div>
        </div>
    )
}

export default GroupChat

