import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./message.css";
import axios from "axios";
import { BASE_URL } from "../../Apis/BaseUrl";
import Cookies from "js-cookie";
import { v4 as uuidV4 } from "uuid";
import FallbackImage from "../../Components/FallbackImgae/FallbackImage";
import { db } from "../../main";
import Moment from "react-moment";
import { FaUser } from "react-icons/fa";


const MessageSidebar = (props) => {

  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState("");


  useEffect(() => {
    const token = Cookies.get("tutorazzi_academic");

    if (token) {
      const parseToken = JSON.parse(token).access_token;
      // const register = `${BASE_URL}/student/all?limit=20&page=1`;
      const register = `${BASE_URL}/all?limit=10&page=1`;

      let x = axios
        .get(register, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseToken}`,
          },
        })
        .then((res) => {
       
          setUser(res.data.data?.docs);
          console.log(res.data.data.docs);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    let userId = Cookies.get("tutorazzi_academic");
    let uid = JSON.parse(userId);
    setUserId(uid.user.id);
  }, []);

  const handleSearchUser = async (chatInfo) => {
    console.log(chatInfo)
    console.log(chatInfo._id)
    chatInfo.id = chatInfo._id
    let userId = Cookies.get("tutorazzi_academic");
    let uid = JSON.parse(userId);
    console.log(chatInfo, "chatinfoooo");
    let user = await db
      .collection("users")
      .where("uid", "==", chatInfo.id)
      .get();
    console.log(user.empty);

    if (user.empty) {
         db.collection("users").add({
        uid: chatInfo.id,
        profile: chatInfo.profile,
        name: chatInfo.name,
      });
    }

    let user1 = await db
      .collection("users")
      .where("uid", "==", uid.user.id)
      .get();

    if (user1.empty) {
      
      db.collection("users").add({
        uid: uid.user.id,
        profile: uid.profileUrl || null,
        name: uid.user.name || "",
      });
    }
    let userChats;
    let checkUser = await db
      .collection("userChats")
      .where("user1", "==", uid.user.id)
      .where("user2", "==", chatInfo.id)
      .get();
    console.log(checkUser.empty, "check");
   
    if (checkUser.empty) {
      let checkUser2 = await db
        .collection("userChats")
        .where("user2", "==", uid.user.id)
        .where("user1", "==", chatInfo.id)
        .get();
      if (checkUser2.empty) {
        let id = uuidV4();
        let chatData = await db.collection("chats").add({
          msg: [],
          uid: id,
        });

        let userChatData = await db.collection("userChats").add({
          user1: uid.user.id,
          user2: chatInfo.id,
          chatId: id,
        });
        console.log(userChatData.id, "iddd");

        userChats = {
          user1: uid.user.id,
          user2: chatInfo.id,
          chatId: id,
          id: userChatData.id,
        };
      } else {
        let resData = [];
        checkUser2.forEach((doc) => {
          if (doc.exists) {
            console.log(doc.data(), "000");

            resData.push({ ...doc.data(), id: doc.id });
          }
        });

        userChats = resData[0];
      }
    } else {
      let resData = [];
      checkUser.forEach((doc) => {
        if (doc.exists) {
                 resData.push({ ...doc.data(), id: doc.id });
        }
      });
      userChats = resData[0];
    }
    console.log(chatInfo)
    userChats.name = chatInfo.name || null
    // userChats.email = chatInfo.email
    userChats.profile = chatInfo.profile

    console.log(userChats, "user");
    props.selectChat(userChats);
    let a = userList.find((item) => item.id == userChats.id)
    if (!a) {
      userList.push(userChats)
    }

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

  const msgData = async () => {
    let userId = Cookies.get("tutorazzi_academic");
    let uid = JSON.parse(userId);

    let checkUser1 = await db
      .collection("userChats")
      .where("user1", "==", uid.user.id)
      .get();
    let checkUser1Data = await localData(checkUser1);
    let checkUser2 = await db
      .collection("userChats")
      .where("user2", "==", uid.user.id)
      .get();
    let checkUser2Data = await localData(checkUser2);
    let finalArr = [...checkUser2Data, ...checkUser1Data];
    finalArr.sort((a, b) => b.timeStamp - a.timeStamp);
    let arrResult = finalArr.map(async (item) => {
      let userData = await db
        .collection("users")
        .where("uid", "==", uid.user.id == item.user1 ? item.user2 : item.user1)
        .get();

      let data = localData(userData);
      return {
        ...data[0],
        ...item,
      };
    });
    Promise.all(arrResult).then((res) => {
      setUserList(res);
    });
  }
  useEffect(() => {
    msgData()
  }, []);
  
  if (props.func) {
    msgData()
    props.func2()
  }

  const selectData = (item) => {
    props.selectChat(item) 
    props.setFunc(!props.value)
  }

  // //console.log(props.func)
  // //console.log(userId, "userDaata");
  console.log(userList, "userList");
  return (
    <div className="msg_sidebar">
      {/* Search section */}
      <div className="searchmsg">
        <div>
          <div className="searchForm">
            <input
              className="searchinput msg_searchbox "
              placeholder="Search People"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <span className="msg_span_bar">
              <FiSearch className="srch_chat_icon" />
            </span>
          </div>
          {search && (
            <div className="msgside_div">
              <div className="msgside_div1">
                {user
                  ?.filter((o) => o.student.name.includes(search))
                  .map((item, index) => (
                    <div
                      // value=""
                      className="inn_msg_icon"
                      // style={{ textTransform: "capitalize", cursor:"pointer" }}
                      key={index}
                      onClick={() => handleSearchUser(item.student)}
                    >
                      <FaUser className="inn_msg_icon_svg" />
                      {item.student.name}
                    </div>
                  ))}
                {user?.filter((o) => o.student.name.includes(search)).length === 0 && (
                  <div>no result found</div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* <h6 className="active_user_msg">Active</h6> */}
        {/* <div className="userChat">
          <Swiper
            loop={true}
            autoplay={true}
            spaceBetween={60}
            slidesPerView={"auto"}
            breakpoints={{
              1400: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 4,
              },
              600: {
                slidesPerView: 4,
              },
            }}
            onSwiper={(self) => {
              swiper.current = self;
            }}
          >
            {data.map((item, index) => {
              return (
                <SwiperSlide virtualIndex={index} key={index}>
                  <ActivePersons img={item.img} name={item.name} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div> */}
        <hr className="msg_hr" />
      </div>


      {/* userprofile --------Chats */}
      <div className="chatss">
        {userList.map((item) => {
          return (
            <div
              // onClick={() => props.selectChat(item)}
              onClick={() =>selectData(item)}
              className="userChat1 "
              style={{ cursor: "pointer" }}
            >
              <FallbackImage imgData={item.profile} cls={"userChatImg"} />

              <div
                className="userChatInfo"
              >
                <div className="name-time-wrapper">
                  <span className="chats_msg_span name" style={{ textTransform: "capitalize" }}>{item.name}</span>
                  <span
                    className="chats_msg_span chat_time time"
                    style={{ marginLeft: "42px" }}
                  >
                    <Moment format="hh:mm A">{item.timeStamp}</Moment>
                  </span>
                </div>

                <p className="chats_msg_p">
                  {userId == item.user1
                    ? item.user1newMessage > 0
                      ? `${item.user1newMessage} new messages`
                      : " "
                    : item.user2newMessage > 0
                      ? `${item.user2newMessage} new messages`
                      : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageSidebar;
