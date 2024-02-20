import React, { useEffect, useState } from "react";
import classes from "./Notifications.module.css";
import Container from "../../UI/Container/Container";
import NotificationDiv from "./NotificationDiv/NotificationDiv";
import NotificationModal from '../AllModals/NotificationModal/NotificationModal';
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../Apis/BaseUrl";
import ToasterUpdate from "../Toaster/ToasterUpdate";
import { toast } from "react-toastify";


const Notifications = (props) => {
  // //console.log(classes);
  const [notificationData, setNotificationData] = useState([])
  const [open, setOpen] = useState(false);
  const [myData, setMyData] = useState({})
  const[loading, setLoading] = useState(false)
  const toggleOpen = () => setOpen(!open);


  const handleModal = data => {
    setMyData(data)
    setOpen(!open)
    console.log('modal opened', data)
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
  const markAsRead = async () => {
    const register = `${BASE_URL}/mark-all-read`; //get id by props
    const myToast = toast.loading('Please Wait...')
setLoading(true)
try {
  let res = await axios
  .patch(register, {}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  })
console.log(res.data, "ttt");
ToasterUpdate(myToast, res.data.message, "success")

} catch (error) {
  ToasterUpdate(myToast, error.message, "error")

}
    // setNotificationData(res.data.data);
    finally {
      setLoading(false)

  }

  }
  useEffect(() => {
    getNotification()
  }, [])

  return (
    <>
      {open && <NotificationModal myData={myData} isPopup={open} handleModal={handleModal} handleClose={toggleOpen} popupFunc={setOpen} />}
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
          <button className={classes.markasread} onClick={markAsRead} disabled={loading}>Mark as Read</button>
        </div> : <div style={{ padding: "10px" }}>
          0 notifications or announcements
        </div>}
        {/* </div> */}
      </Container>
    </>
  );
};

export default Notifications;

