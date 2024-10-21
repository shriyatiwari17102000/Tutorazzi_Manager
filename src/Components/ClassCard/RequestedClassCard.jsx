import React, { useState } from 'react'
import classes from './ClassCard.module.css'
import Container from '../../UI/Container/Container'
import Cookies from 'js-cookie'
import axios from 'axios'
import { BASE_URL } from '../../Apis/BaseUrl'
import ToasterUpdate from '../Toaster/ToasterUpdate'
import { toast } from 'react-toastify'
import Moment from 'react-moment'
import SlotModal from '../SlotModal/SlotModal'
import RescheduleClasses from '../AllModals/RescheduleModal copy/RescheduleClasses'



const RequestedClassCard = (props) => {
    const [loading, setLoading] = useState(false)
    const [isAccepted, setIsAccepted] = useState("")
    const [popup, setPop] = useState(false)
    const [slot, setSlot] = useState(false)

    const handleShow = () => setPop(true)

    const handleSlot = () => setSlot(true)
    // console.log(popup);

    // console.log(props.data1.rescheduled_by)
    let tagData = props?.data1?._id
    console.log(tagData)
    const data = props?.data1
    // console.log(data)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const handleAccept = async (e) => {
        e.preventDefault()
        let register = `${BASE_URL}/accept-class/${tagData}`
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        console.log(register)
        try {

            let res = await axios.patch(register, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token} `,
                },
            })
            console.log(res.data)

            if (!res.data.success) {
                throw new Error(res.data.message)
            }
            setIsAccepted(res.data.message);
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
    let func = props?.func
    // console.log(func)
    return (
        <>
            <Container cls={`${classes.card} ${props.cls}`}>
                <div className={classes.card_data}>
                    <div className={classes.flex} style={{ alignItems: "center" }}>

                        {data?.subject?.name ? <p style={{ marginBottom: "0px" }}>{data?.subject?.name}</p> : <p style={{ marginBottom: "0px" }}>{data?.name} </p>}


                        <p style={{ background: "#F7F7F7", color: "black", padding: "8px", marginBottom: "0px" }}>
                            1 hr
                        </p>
                        {data?.class_type == "Trial" && <p style={{ background: "#F7F7F7", color: "black", padding: "8px", marginBottom: "0px" }}>
                            Trial
                        </p>}

                    </div>

                    {data?.start_time &&
                        <div className={classes.flex}>
                            <p><Moment format='hh:mm A' utc>{data?.start_time}</Moment> & <Moment format='hh:mm A' utc>{data?.end_time}</Moment></p>
                            <p><Moment format='DD/MM/YYYY' utc>{data?.start_time}</Moment></p>
                        </div>}
                    <div className={classes.flex}>
                        <p>Teacher : <span>{data?.teacher_id?.name}</span></p>
                        <p>Student : <span>{data?.student_id?.name}</span></p>
                    </div>
                </div>

                {/* <div className={classes.flex}>
           
            {data.start_time && (
              <div style={{ display: "flex", gap: "5px" }}>
                <p><Moment format="hh:mm A">{data.start_time}</Moment>  &</p><p><Moment format="hh:mm A">{data.end_time}</Moment></p></div>
            )}
             {data.start_time && ( <p><Moment format='DD/MM/YYYY'>{data.start_time}</Moment></p>)}
          </div> */}
                {/* <div className={classes.flex}>
            <p>Teacher : <span>{data.teacher_name}</span></p>
            <p>Student : <span>{data.student_name}</span></p>
          </div> */}
                <div>      
                     {/* {data?.class_reschedule_status == "Rescheduled" && data?.rescheduled_by && <p style={{ color: "#989898", fontSize: "13px", marginBottom: "20px", textTransform: "capitalize" }}> Last update : {data?.rescheduled_by}</p>} */}

                    {data?.rescheduled_by && <p style={{ color: "#989898", fontSize: "13px", marginBottom: "20px", textTransform: "capitalize" }}> Last update : {data?.rescheduled_by}</p>}



                    <div style={{ display: "flex", gap: "10px", justifyContent: "end" }}>
                        {data?.class_reschedule_status === "Pending" && data.open_reschedule_am ? (
                            <button onClick={handleSlot} className={`${classes.btn} ${classes.reschedule}`}>
                                Select Slot
                            </button>
                        ) : data?.class_reschedule_status === "Rescheduled" && data.open_reschedule_am ? (
                            <button onClick={handleSlot} className={`${classes.btn} ${classes.reschedule}`}>
                                Select Slot
                            </button>
                        ) : null}
                    </div>
                </div>
            </Container>
            {popup && <RescheduleClasses isPopup={popup} popupFunc={setPop} func={func} data1={data} />}
            {slot && <SlotModal isPopup={slot} popupFunc={setSlot} func={func} data1={data} />}
        </>
    )
}

export default RequestedClassCard