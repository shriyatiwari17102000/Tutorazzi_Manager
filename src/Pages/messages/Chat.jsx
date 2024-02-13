import React, { useRef, useState } from "react";
import "./message.css";
import MessageSidebar from "./MessageSidebar";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Container from "../../UI/Container/Container";
import classes from "./Chats.module.css"
import { RxCross2 } from 'react-icons/rx'
import { db, storage } from "../../main";
import { MdAdd, MdOutlineAddReaction } from "react-icons/md";
import Moment from "react-moment";
import FallbackImage from "../../Components/FallbackImgae/FallbackImage";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Chat = () => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [user_Id, setUser_Id] = useState("");
  const [userChatId, setUserChatId] = useState("");
  const [show, setShow] = useState(false);
  const [userChatData, setUserChatData] = useState({});
  const [chatId, setChatId] = useState("");
  const [messageCollection, setMessageCollection] = useState([]);
  const [search, setSearch] = useState("")
  const [refreshChats, setRefreshChats] = useState(false)
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

const fileInputRef = useRef(null)
  const myDivRef = useRef(null);

  const scrollToBottom = () => {
    if (myDivRef.current) {
      myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  },[messageCollection]);

  const toggleExpansion = () => {
    const scrollPosition = myDivRef.current.scrollTop;
    setIsExpanded(!isExpanded);
    myDivRef.current.scrollTop = scrollPosition;
  };



  const handleEmojiClick = (emoji) => {

    console.log(emoji.native, "emogi")

    setNewMessage(newMessage + emoji.native);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const localData = (firebaseData) => {
    let resData = [];
    firebaseData.forEach((doc) => {
      if (doc.exists) {
        //console.log(doc.data(), "000");

        resData.push({ ...doc.data(), id: doc.id });
      }
    });
    return resData;
  };

  useEffect(() => {
    let myId = Cookies.get("tutorazzi_academic");
    let parseMyId = JSON.parse(myId);
    //console.log(parseMyId.user.id, "uuuu");
    setUser_Id(parseMyId.user.id);
  }, []);

  let refreshFunc = null

  const refreshChat = () => {
    setRefreshChats(false)
  }

  const resetFunc = () => {
    setFileName(null)
    setFile(null)
  }
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
            // You can monitor the progress here
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error(error.message);
            reject(error.message);
          },
          () => {
            // Upload completed successfully, you can get the download URL
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


  const handleSendMessage = async () => {

    let file1 = await handleUpload()
    console.log(file1)

    if (newMessage.trim() === "" && !file) return;

    let date = new Date();
    let timeStamp = date.getTime();

    let newMessageObj = {
      text: newMessage,
      sender: user_Id,
      timeStamp: timeStamp,
    };
    console.log(newMessageObj)
    if (file) {
      newMessageObj.file = file1
    }
    let oldChatsData = await db.collection("userChats").doc(userChatId).get();
    console.log(userChatId)
    let oldData = oldChatsData.data();
    console.log(oldData)
    if (oldData.user1 == user_Id) {
      let user2TimeStamp = oldData.user2TimeStamp || 0;
      if (timeStamp > user2TimeStamp) {
        oldData.user2newMessage = (oldData.user2newMessage || 0) + 1;
      }
      oldData.user1TimeStamp = timeStamp;
      oldData.user1newMessage = 0;
    } else if (oldData.user2 == user_Id) {
      let user1TimeStamp = oldData.user1TimeStamp || 0;
      if (timeStamp > user1TimeStamp) {
        oldData.user1newMessage = (oldData.user1newMessage || 0) + 1;
      }
      oldData.user2TimeStamp = timeStamp;
      oldData.user2newMessage = 0;
    }
    oldData.timeStamp = timeStamp;

    let chat = messageCollection;
    chat.push(newMessageObj);
    setMessageCollection(chat);
    console.log(chat, "chat")
    let query = await db.collection("chats").where("uid", "==", chatId);
    query
      .get()
      .then(async (querySnapshot) => {
        // console.log(querySnapshot)
        let updatePromise = await querySnapshot.forEach(async (doc) => {

          await db.collection("chats").doc(doc.id).update({ msg: chat });
          console.log("DATATATATa")
        });
        // await  Promise.all(updatePromise).then(async()=> {
        console.log("checkinggggg")
        await db.collection("userChats").doc(userChatId).update(oldData);
        setRefreshChats(true)
        setNewMessage("");
        setFile(null)
        setShowEmojiPicker(false)
      })
      // })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });


  };

  const selectChat = async (chatInfo) => {
    console.log(chatInfo, "select chat called")
    let chat_Id = await db
      .collection("chats")
      .where("uid", "==", chatInfo.chatId)
      .get();
    setUserChatData(chatInfo);
    setChatId(chatInfo.chatId);
    setUserChatId(chatInfo.id);
    let resData = [];
    chat_Id.forEach((doc) => {
      if (doc.exists) {
        resData.push({ ...doc.data(), id: doc.id });
      }
    });
    console.log(resData[0].msg)
    setMessageCollection(resData[0].msg);
    setSelectedUserId(chatInfo.id);
  };


  const filteredUserList = messageCollection.filter(user =>
    user.text.toLowerCase().includes(search.toLowerCase())
  );


  // msg search
  const userMessageRef = useRef(null);

  useEffect(() => {
    console.log("useeffect call 1")
    const unSub = db.collection('userChats').onSnapshot((snapshot) => {
      const newData = snapshot.docs.map(async (doc) => {
        let a =
        {
          id: doc.id,
          ...doc.data
        }
        console.log(a)
        let document = await db.collection("userChats").doc(doc.id).get();
        let docData = document.data()
        let userId = Cookies.get("tutorazzi_academic");
        let uid = JSON.parse(userId);
        let user_id = uid.user.id
        console.log(docData)
        console.log(user_id)
        console.log(docData.user1)
        if (docData.user1 === user_id || docData.user2 === user_id) {
          console.log("refresh")

          setRefreshChats(true)
          console.log(chatId)
          if (docData.chatId == chatId) {
            console.log("same chat")
            let chatData = { ...docData, id: document.id }
            let resData = []

            if (docData.user1 === user_id) {
              let chat_Id = await db
                .collection("users")
                .where("uid", "==", docData.user2)
                .get();

              chat_Id.forEach((doc) => {
                if (doc.exists) {
                  resData.push({ ...doc.data(), id: doc.id });
                }
              });
              // console.log(resData, "this is user1")
            } else {
              let chat_Id = await db
                .collection("users")
                .where("uid", "==", docData.user1)
                .get();

              chat_Id.forEach((doc) => {
                if (doc.exists) {
                  resData.push({ ...doc.data(), id: doc.id });
                }
              });
              // console.log(resData, "this is user2")
            }


            console.log(resData, "resdata")
            chatData.name = resData[0].name
            chatData.profile = resData[0].profile
            console.log(chatData, "chatdata")
            selectChat(chatData)

          }
        }
      })
    })
    return () => {
      unSub();
    };
  }, [chatId]);
  // console.log(userChatData)
  console.log(messageCollection, "new messages")
  return (
    <React.Fragment>
      {/* <EmojiPicker onEmojiClick={handleEmojiClick} /> */}
      <div className="home_container" style={{ display: "flex" }}>
        <MessageSidebar selectChat={selectChat} func={refreshChats} func2={refreshChat} value={show} setFunc={setShow} />
        <div className={`chat ${show === true ? "active_chat" : ""}`} onClick={() => showEmojiPicker && setShowEmojiPicker(false)}>
          <div className="chatInfo">
            <div className="userChatImg_div">
              {userChatData?.profile && <FallbackImage cls={"userChatImg"} imgData={userChatData.profile} />}

              <div style={{ marginLeft: "10px" }}>
                <span className="span_chat">{userChatData.name}</span>

              </div>
            </div>

          </div>
          {/*  */}
          {messageCollection.length === 0 ? (
            <div className="no_chat message-container">  <p>No chats found</p><br /><p>Start a new Conversation.</p></div>
          ) : (
            <div className="message-container" ref={myDivRef}>
              {/* Display "Today" after two messages */}

              {messageCollection.map((message, index) => (
                <div
                  key={message.id}
                  className={`message ${message.sender == user_Id ? " user" : "other"
                    }`}
                >

                  {message.sender !== user_Id && (
                    <>

                      <div className="msg_txt_div p-0" >
                        {message.text && message.file ? (
                          <div>
                            <img src={message.file} className="img_user"  style={{border: "1px solid #d9d9d9", overflow: "hidden",
    background: "white"}} />
                            {/* <p style={{ display: "grid", padding: "10px", background: "white", border: "1px solid #d9d9d9", borderRadius: "0 0 5px 5px" }}
                              className={`msg_txt you-msg gap-3`}
                            >
                              {message.text}
                            </p> */}
 <p
                              style={{ display: "grid", padding: "10px", background: "white", border: "1px solid #d9d9d9", borderRadius: "0 0 5px 5px" }}
                              className={`msg_txt you-msg `}
                            >
                              {isExpanded ? message.text : message.text.slice(0, 300)}
                              {/* {message.text} */}
                            
                            {message.text.length > 300 && (
                              <button className="msg_readmore" onClick={toggleExpansion}>
                                {isExpanded ? "Read Less" : "Read More"}
                              </button>
                            )}
                              </p>

                          </div>
                        ) : (
                          message.text ? (
                            // <p
                            //   className={`msg_txt you-msg`}
                            // >
                            //   {message.text}
                            // </p>
                            <p
                            style={{display:"grid"}}
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

                            <img src={message.file}  style={{border: "1px solid #d9d9d9", overflow: "hidden",
                            background: "white"}}className="img_user" />
                          )
                        )}

                      </div>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "end" }} >  <p style={{
                        fontSize: "10px", color: "black",
                        fontWeight: "500",
                        margin: "10px 0"
                      }}>
                        <Moment format="hh:mm A">{message.timeStamp}</Moment>
                      </p>
                        <p style={{
                          fontSize: "10px", color: "black",
                          fontWeight: "500",
                          margin: "10px 0"
                        }}><Moment format="DD/MM/YYYY" >{message.timeStamp}</Moment></p></div>
                    </>
                  )}
                  {message.sender === user_Id && (
                    <>

                      <div className="msg_txt_div">
                        {message.text && message.file ? (
                          <div className="d-grid gap-3" style={{ display: "grid" }}>
                            <img src={message.file} className="img_user" style={{border: "1px solid #d9d9d9", overflow: "hidden",
    background: "white"}} />
                            {/* <p
                              style={{ display: "grid", padding: "10px", background: "white", border: "1px solid #d9d9d9", borderRadius: "0 0 5px 5px" }}
                              className={`msg_txt you-msg gap-3`}
                            >
                              {message.text}
                            </p> */}
   <p
                              style={{ display: "grid", padding: "10px", background: "white", border: "1px solid #d9d9d9", borderRadius: "0 0 5px 5px" }}
                              className={`msg_txt you-msg `}
                            >

                              {isExpanded ? message.text : message.text.slice(0, 300)}
                            
                            {message.text.length > 300 && (
                              <button className="msg_readmore"  onClick={toggleExpansion}>
                                {isExpanded ? "Read Less" : "Read More"}
                              </button>
                            )}
                            </p>

                          </div>
                        ) : (
                          message.text ? (
                            // <p
                            //   className={`msg_txt you-msg`}
                            // >
                            //   {message.text}
                            // </p>
                            <p style={{display:"grid"}}
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

                            <img src={message.file} className="img_user"  style={{border: "1px solid #d9d9d9", overflow: "hidden",
                            background: "white"}} />
                          )
                        )}

                      </div>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "end" }} >  <p style={{
                        fontSize: "10px", color: "black",
                        fontWeight: "500",
                        margin: "10px 0"
                      }}>
                        <Moment format="hh:mm A">{message.timeStamp}</Moment>
                      </p>
                        <p style={{
                          fontSize: "10px", color: "black",
                          fontWeight: "500",
                          margin: "10px 0"
                        }}><Moment format="DD/MM/YYYY" >{message.timeStamp}</Moment></p></div>
                    </>
                  )}
                </div>
              ))}

            </div>
          )}
          {/* <MessagePage /> */}

          {selectedUserId && (
            <div className="inputPanel">
              <div className="inputWrapper">

                <Container cls="d-flex flex-column row-gap-1 px-3 py-1">
                  <input
                    type="text"
                    className="chat_input"
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Message ..."
                    style={{ border: "none", background: "none", outline: "none" }}
                  />
                  {file &&
                    <div className={classes.render_img}>
                      <img src={filename} alt="" />
                      <button type='button' onClick={resetFunc} className={classes.del_btn}><RxCross2 style={{color:"white"}}/></button>
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
                onClick={handleSendMessage}
                className="search_input sendmsg_img"
              >
                {/* <MySVG className="sendmsg_img" /> */}
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Chat;


