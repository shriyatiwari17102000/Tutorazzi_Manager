import React, { useState } from 'react'
import classes from './ClassCard.module.css'
import Container from '../../UI/Container/Container'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../Apis/BaseUrl'
import axios from 'axios'
import ToasterUpdate from '../Toaster/ToasterUpdate'
import RescheduleClasses from '../AllModals/RescheduleModal copy/RescheduleClasses'





const ClassCard = (props) => {
  const [popup, setPopup] = useState(false)
  const handleShow = (e) => {
    e.preventDefault()
    setPopup(!popup)
  }
  // console.log(props.data)
  let tagData = props?.data?._id
  // console.log(tagData)

  const tagstoBtn = (tag) => {
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const notifyStudent = async (e) => {
      e.preventDefault()
      let register = `${BASE_URL}/notify-student`
      const myToast = toast.loading('Please Wait...')
      // console.log(register)
      try {

        let res = await axios.post(register, { homework_id: tagData }, {
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
    }
    const notifyTeacher = async (e) => {
      e.preventDefault()
      let register = `${BASE_URL}/notify-teacher`
      const myToast = toast.loading('Please Wait...')
      // console.log(register)
      try {

        let res = await axios.post(register, { resource_request_id: tagData }, {
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
    }

    const handleResolve = async (e) => {
      e.stopPropagation()
      let register = `${BASE_URL}/mark-homework-done/${tagData}`
      const myToast = toast.loading('Please Wait...')
      // console.log(register)
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
      } catch (error) {
        console.log(error)
        ToasterUpdate(myToast, error.message, "error")
      }

    };
    const handleAccept = async (e) => {
      e.preventDefault()
      let register = `${BASE_URL}/accept-class/${tagData}`
      const myToast = toast.loading('Please Wait...')
      // console.log(register)
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
      } catch (error) {
        console.log(error)
        ToasterUpdate(myToast, error.message, "error")
      }

    };
    // console.log(tag)
    switch (tag) {
      case 'Cancelled':
        return <button className={`${classes.btn} ${classes.cancel}`}>Cancelled</button>
      case 'Scheduled':
        return <button className={`${classes.btn} ${classes.accept}`}>Accepted</button>
      case 'reschedule':
        return <button className={`${classes.btn} ${classes.reschedule}`}>Reschedule</button>
      case 'Resolved':
        return <button className={`${classes.btn} ${classes.done}`}>Resolved</button>
      case 'notify-teacher':
        return <button className={`${classes.btn} ${classes.reschedule}`}>Notify Teacher</button>
      case 'notify-student':
        return <button className={`${classes.btn} ${classes.reschedule}`}>Notify Student</button>
      case 'Done':
        return <button className={`${classes.btn} ${classes.done}`}>Done</button>
      case 'Pending':
        return (
          <>
            {/* {!props.home ? (<>
        <button type='button' className={`${classes.btn} ${classes.accept}`}  onClick={handleAccept}>Accept</button>
        <button type='button' onClick={handleShow}  className={`${classes.btn} ${classes.reschedule}`}>Reschedule</button></>): (
          <>
            <button type='button' onClick={notifyStudent}  className={`${classes.btn} ${classes.reschedule}`}>Notify Student</button>
            <button type='button' className={`${classes.btn} ${classes.accept}`}  onClick={handleResolve}>Resolve</button>
        </>
        )} */}

            {props.home && (
              <>
                <button type='button' onClick={notifyStudent} className={`${classes.btn} ${classes.reschedule}`}>Notify Student</button>
                <button type='button' className={`${classes.btn} ${classes.accept}`} onClick={handleResolve}>Resolve</button>
              </>
            )}
            {props.resource && (
              <button type='button' onClick={notifyTeacher} className={`${classes.btn} ${classes.reschedule}`}>Notify Teacher</button>
            )}
            {!props.home && !props.resource && (
              <>
                {/* <button type='button' id="button" className={`${classes.btn} ${classes.accept}`} onClick={handleAccept}>Accept</button> */}
                {props?.data?.rescheduled_by !== "academic_manager" && <button type='button' onClick={handleAccept} id="button"  className={`${classes.btn} ${classes.accept}`}>Accept</button>}
                <button type='button' id="button"  onClick={handleShow} className={`${classes.btn} ${classes.reschedule}`}>Reschedule</button>
              </>
            )}

          </>
        )
    }
  }
  const dataLayout = (layout) => {
    switch (layout) {
      case 1:
        return <>
          <div className={classes.flex}>
            <p>Student : <span>{data.class_id.student_name}</span></p>
            <p>Request Date : <Moment format="DD/MM/YYYY">{data.createdAt}</Moment></p>

          </div>
          {props.resource && <div className={classes.flex}>
            <p>Resource : <>{data.message}</></p>
          </div>}
          {props.home && <div className={classes.flex}>
            <p>Homework : <>{data.title}</></p>
          </div>}
        </>

      case 2:
        return <>
          <div className={classes.flex}>
            <p>Student : <span>{data.student}</span></p>
            <p>Due Date : <>{data.due_date}</></p>
          </div>
          <div className={classes.flex}>
            <p>Homework : <>{data.homework}</></p>
          </div>
        </>

      default:
        return <>
          <div className={classes.flex}>
            <p><Moment format="hh:mm A">{data.start_time}</Moment></p>
            <p><Moment format='DD/MM/YYYY'>{data.start_time}</Moment></p>
          </div>
          <div className={classes.flex}>
            <p>Teacher : <span>{data.teacher_name}</span></p>
            <p>Student : <span>{data.student_name}</span></p>
          </div>
        </>
    }
  }

  const data = props.data
  // console.log(data)
  return (
    <>
      <Container cls={`${classes.card} ${props.cls}`}>
        <div className={classes.card_data}>
          <h3>{data.subject_name || data.class_id.subject_name} {data.alert && <span className={classes.red_span}>{data.alert}</span>}</h3>
          {dataLayout(props.layout)}
        </div>

        <div className={classes.btn_container}>
          {/* {
          data.status.map((element, index) => ( */}
          {tagstoBtn(data?.status)}
          {/* ))
        } */}
        </div>
      </Container>
      {popup && <RescheduleClasses isPopup={popup} popupFunc={setPopup} func={props?.func} data1={data} />}

    </>
  )
}

export default ClassCard