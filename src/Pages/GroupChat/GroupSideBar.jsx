import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { db } from '../../main';
import Cookies from "js-cookie"

const GroupSideBar = ({ onChatSelect, user_Id, chatId, unreadMsg , funcValue, setFunc}) => {
  const [group, setGroup] = useState([])
  const [unreadCounts, setUnreadCounts] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('')
  const [searchUserId, setSearchUserId] = useState('')

  let profileTokenJson = Cookies.get("tutorazzi_academic");
  let profileToken = JSON.parse(profileTokenJson);
  let emailLoggedUser = profileToken.user.email

  let userId = user_Id

  // console.log(userId)
  const getChatsByUserEmail = async (userEmail) => {
    // console.log(userEmail)
    try {

      const usersRef = db.collection("users");
      const userQuerySnapshot = await usersRef.where("email", "==", userEmail).get();
      // console.log(userQuerySnapshot.empty)

      let userId = null;
      userQuerySnapshot.forEach(doc => {
        userId = doc.id;
      });

      if (!userId) {
        // console.log(`No user found with email ${userEmail}`);
        return [];
      }
      setSearchUserId(userId)

      const chatsRef = db.collection("chats");
      const chatsQuerySnapshot = await chatsRef.where("userIds", "array-contains", userId).get();

      const chats = [];
      chatsQuerySnapshot.forEach(doc => {
        chats.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return chats;
    } catch (error) {
      // console.error("Error fetching chats:", error);
      return [];
    }
  };




  useEffect(() => {
    const userEmail = emailLoggedUser;
    getChatsByUserEmail(userEmail)
      .then(chats => {
        // console.log("Fetched chats:", chats);
        setGroup(chats)

      })
      .catch(error => {
        console.error("Error fetching chats:", error);
      });
  }, [])
  // console.log(group, 'sidebar')

  const handleChatClick = (chat) => {
    onChatSelect(chat); // Call the function to handle chat selection
    setFunc(!funcValue)
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000);
    // console.log(date)
    return (
      <Moment format="hh:mm A">{date}</Moment>
    );
  };

  const searchGroup = async (groupName, userId) => {
    // console.log(groupName, userId, "hjhjhnjhjhkj")
    const usersRef = db.collection("chats");
    const userQuerySnapshot = await usersRef.where("userIds", "array-contains", userId).get();
    let chats = [];
    userQuerySnapshot.forEach(doc => {
      chats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    // console.log(chats)
    chats = chats.filter((o) => o.name.includes(groupName))
    setGroup(chats || [])
  }

  // console.log(group, "setgroup")

  const fetchUnreadCounts = async () => {
    const counts = {};
    // console.log(group)
    for (const groups of group) {
      const messagesRef = db.collection('chats').doc(groups.id).collection('messages');
      const snapshot = await messagesRef.limit(15).get();
      // console.log(snapshot.docs)
      let unreadMsgs = 0
      // let chats = [];
      snapshot.forEach(doc => {
        let data = doc.data()
        // console.log(data)
        if (!data.readBy.includes(userId)) {
          unreadMsgs = unreadMsgs + 1
        }
        // chats.push({
        //   id: doc.id,
        //   ...doc.data()
        // });
      });

      // console.log(chats)
      counts[groups.id] = unreadMsgs <= 10 ? unreadMsgs : "10+ messages";

    }
    // console.log(counts, userId, "counts")
    setUnreadCounts(counts);
    const userEmail = emailLoggedUser;
    getChatsByUserEmail(userEmail)
      .then(chats => {
        // console.log("Fetched chats:", chats);
        setGroup(chats)

      })
      .catch(error => {
        console.error("Error fetching chats:", error);
      });
  };

  

  const fetchUnreadGroup = async () => {
    let group = []
    const userEmail = emailLoggedUser;
    await getChatsByUserEmail(userEmail)
      .then(chats => {
        // console.log("Fetched chats:", chats);
        group = chats

      })
      .catch(error => {
        console.error("Error fetching chats:", error);
      });

      let userId = ""
            const usersRef = db.collection("users");
            const querySnapshot = await usersRef.where("email", "==", userEmail).get();
    
            if (!querySnapshot.empty) {
                const loggedInUser = querySnapshot.docs[0].data();
                userId = querySnapshot.docs[0].id; // Set user_Id to the logged-in user's ID
            } 

    const counts = {};
    // let userId = "40EuEnEuL5juzbH2n1AK"
    // console.log(group, userId)

    for (const groups of group) {
      const messagesRef = db.collection('chats').doc(groups.id).collection('messages');
      const snapshot = await messagesRef.limit(15).get();
      // console.log(snapshot.docs)
      let unreadMsgs = 0
      // let chats = [];
      snapshot.forEach(doc => {
        let data = doc.data()
        // console.log(data)
        if (!data.readBy.includes(userId)) {
          unreadMsgs = unreadMsgs + 1
        }
        // chats.push({
        //   id: doc.id,
        //   ...doc.data()
        // });
      });

      // console.log(chats)
      counts[groups.id] = unreadMsgs <= 10 ? unreadMsgs : "10+ messages";

    }
    // console.log(counts, userId, "counts")
    setUnreadCounts(counts);
  };

  useEffect(() => {
    // console.log(group, "innnnnnn")
    if (userId && group.length > 0) {
      fetchUnreadCounts(group);
    }

  }, [userId, group, chatId]);

  useEffect(() => {
    unreadMsg(fetchUnreadGroup);
  }, []);

  return (
    <div className="msg_sidebar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search groups..."

          onChange={(e) => searchGroup(e.target.value, searchUserId)}
        />
      </div>
      <div className="chatss">
        {group?.sort((a,b) => b.latestMessage - a.latestMessage).map((item) => {
          return (
            <div
              key={item.id} // Ensure each chat has a unique key
              onClick={() => handleChatClick(item)}
              className="userChat1 "
              style={{ cursor: "pointer" }}
            >

              {/*<FallbackImage imgData={""} cls={"userChatImg"} />*/}

              <div
                className="userChatInfo"
              >
                <div className="name-time-wrapper">

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="grp_name" style={{ textTransform: "capitalize" }}>{item.name.slice(0, 1)}</div>
                    <span className="chats_msg_span name" style={{ textTransform: "capitalize" }}>{item.name}</span>
                  </div>
                  <span
                    className="chats_msg_span chat_time time"
                    style={{ marginLeft: "42px" }}
                  >
                    {formatTimestamp(item?.latestMessage)}
                  </span>
                </div>
                {unreadCounts[item.id] > 0 && (
                  <span style={{ marginInline: "50px", fontSize: "13px", color: "#989898" }}>{`${unreadCounts[item.id]} new message`}</span>
                )}


              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default GroupSideBar

