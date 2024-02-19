import React, { useEffect, useState } from "react";
import classes from "./Notifications.module.css";
import Container from "../../UI/Container/Container";
import NotificationDiv from "./NotificationDiv/NotificationDiv";
import NotificationModal from '../AllModals/NotificationModal/NotificationModal';
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../Apis/BaseUrl";


const Notifications = (props) => {
  // //console.log(classes);
  const [notificationData, setNotificationData] = useState([])
  const [open, setOpen] = useState(false);
  const [myData, setMyData] = useState({})
  const toggleOpen = () => setOpen(!open);

  
  const handleModal = data => {
    setMyData(data)
    setOpen(!open)
    console.log('modal opened',data)
  }

  let profileTokenJson = Cookies.get("tutorazzi_academic");
  let profileToken = JSON.parse(profileTokenJson);
  let token = profileToken.access_token;
  console.log(token)

  const getNotification = async () => {
    const register = `${BASE_URL}/all-notifications`; //get id by props

    let res = await axios
      .get(register, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
      })
    console.log(res.data, "ttt");
    setNotificationData(res.data.data);


  }
  useEffect(() => {
    getNotification()
  }, [])

  return (
    <>
      {open && <NotificationModal myData={myData}  isPopup={open} handleModal={handleModal} handleClose={toggleOpen} popupFunc={setOpen} />}
      <div
        onClick={() => props.setterFunc(false)}
        className={classes.overlay}
      ></div>
      <Container cls={classes.box}>
        <div className={classes.header}>Notifications</div>
        {/* <div className={classes.body}> */}
       {notificationData?.length !== 0 ? <div className={classes.body}>
        {notificationData?.map((element) => (
            <NotificationDiv
              setterFunc={props.setterFunc}
              key={element.id}
              popupFunc={setOpen}
              data={element}
            handleModal={handleModal}
            func={getNotification}
            />
          ))} 
       </div> : <div style={{padding:"10px"}}>
       0 notifications or announcements
        </div>}
        {/* </div> */}
      </Container>
    </>
  );
};

export default Notifications;

