import React, { useState } from 'react'
import classes from './BundleCard.module.css'
import Moment from 'react-moment'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../../Apis/BaseUrl'
import { toast } from 'react-toastify'
import axios from 'axios'
import ToasterUpdate from '../../../Toaster/ToasterUpdate'
import RescheduleClasses from '../../RescheduleModal copy/RescheduleClasses'

const BundleCard = (props) => {
    const[loading, setLoading] = useState(false)
    const[show, setShow] = useState(false)
    const handleShow = () => setShow(!show)
    const {data} = props
    // console.log(data)
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token
  let tagData = data?._id
    const handleAccept = async (e) => {
      e.preventDefault()
      let register = `${BASE_URL}/accept-class/${tagData}`
      const myToast = toast.loading('Please Wait...')
      // console.log(register)
      setLoading(true)
      try {
  
        let res = await axios.patch(register, {}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },
        })
        if (!res.data.success) {
          ToasterUpdate(myToast, res.data.message, "error")
        }
        ToasterUpdate(myToast, res.data.message, "success")
        props?.func()
      } catch (error) {
        console.log(error)
        ToasterUpdate(myToast, error.message, "error")
      }
  finally {
    setLoading(false)
  }
    };
    return (
        <>
        <div className={classes.card}>
            <div>
                <h1>{data?.subject_name} <span className={classes.cls_span}>1 hr</span></h1>
             {data?.due_date && <div className={classes.flex}>
                <p>Due Date : <><Moment format="DD/MM/YYYY">{data?.due_date}</Moment> </></p>
                    <p><Moment format="hh:mm A">{data?.due_date}</Moment> </p>
                    
                </div>}
            </div>
            <div>
                {data.status == "Pending" && (<div className={classes.pen_div}>
                   {data.rescheduled_by != "academic_manager" &&  <button className={classes.don} onClick={handleAccept} disabled={loading}>Accept</button>}
                    <button className={classes.pend} onClick={handleShow}>Reschedule</button></div>)}
                {data.status == "Done" && <button className={classes.don}>Done</button>}
                {data.status == "Scheduled" && <button className={classes.pend}>Schedule</button>}
            </div>
        </div>
        {show && <RescheduleClasses isPopup={show} popupFunc={setShow} func={props?.func} data1={data} />}
        </>
    )
}

export default BundleCard