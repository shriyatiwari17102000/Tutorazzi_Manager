import React from 'react'
import { BsBell } from 'react-icons/bs'
import classes from './NotificationDiv.module.css'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'

const NotificationDiv = (props) => {

    const data = props?.data

    const functionHandler = () => {
        props.popupFunc(true)
        // props.setterFunc(false)
    }
    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;
    console.log(token)
  
    const handleClick = async () => {
      try {
        props?.handleModal(data)
  
        // Api request fo
  
        const register = `${BASE_URL}/clear-notifications`; //get id by props
  
        let res = await axios
          .patch(register,{}, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            }
          })
        console.log(res.data.data, "ttt");
        props?.func()
      } catch (error) {
        console.log(error)
      }
      // setNotificationData(res.data.data?.docs);
  
    }

    const differTime = <Moment fromNow date={data?.createdAt} />

  
    return (
        <div className={classes.row} onClick={handleClick}>
            <div className={classes.bell}><BsBell /></div>
            <p className={classes.p}>{data?.title?.slice(0, 20)}...</p>
            <span className={classes.span}>{data?.time_diff}</span>
        </div>
    )
}

export default NotificationDiv