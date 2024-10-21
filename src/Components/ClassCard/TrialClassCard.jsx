import React, { useState } from 'react'
import classes from './ClassCard.module.css'
import Container from '../../UI/Container/Container'
import Cookies from 'js-cookie'
import axios from 'axios'
import { BASE_URL } from '../../Apis/BaseUrl'
import ToasterUpdate from '../Toaster/ToasterUpdate'
import { toast } from 'react-toastify'
import SlotModal2 from '../AllModals/SlotModal/SlotModal2'
import RescheduleClasses from '../AllModals/RescheduleModal copy/RescheduleClasses'



const TrialClassCard = (props) => {
    const[isAccepted, setIsAccepted] = useState("")
    const [popup, setPop] = useState(false)
    const [slot, setSlot] = useState(false)
    const handleSlot = () => setSlot(true)

    const handleShow = () => setPop(true)

    // console.log(popup);

    // console.log(props.data1.rescheduled_by)
    let tagData = props?.data1?._id
    // console.log(tagData)
    const data = props?.data1
    console.log(data)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const handleAccept = async (e) => {
        e.preventDefault()
        let register = `${BASE_URL}/accept-class/${tagData}`
        const myToast = toast.loading('Please Wait...')
        console.log(register)
        try {

            let res = await axios.patch(register, {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token} `,
                },
            })
            // console.log(res.data.success)

            if (res.data.success === false) {
                ToasterUpdate(myToast, res.data.message, "error")
                return
            }
            setIsAccepted(res.data.message);
            ToasterUpdate(myToast, res.data.message, "success")
            props?.func()
        } catch (error) {
            console.log(error)
            ToasterUpdate(myToast, error.messagec, "error")
        }

    };
    let func = props?.func
// console.log(func)
    return (
        <>
            <Container cls={`${classes.card} ${props.cls} main_link`}>
                <div className={classes.card_data}>
                    <div className={classes.flex} style={{ alignItems: "center" }}>

                        {data?.subject?.name ? <p style={{ marginBottom: "0px" }}>{data?.subject?.name}</p> : <p style={{ marginBottom: "0px" }}>{data?.name} </p>}


                        <p style={{ background: "#F7F7F7", color: "black", padding: "8px", marginBottom: "0px" }}>
                            1 hr
                        </p>
                        {props.trial && <p style={{ background: "#F7F7F7", color: "black", padding: "8px", marginBottom: "0px" }}>
                            Trial
                        </p>}

                    </div>
                    {/* <div className={classes.flex}>
                        <p><Moment format='hh:mm A' utc>{data?.start_time}</Moment> & <Moment format='hh:mm A' utc>{data?.end_time}</Moment></p>
                        <p><Moment format='DD/MM/YYYY' utc>{data?.start_time}</Moment></p>
                    </div> */}
                    <div className={classes.flex}>
                        <p>Teacher : <span>{data?.teacher_id?.name}</span></p>
                        <p>Student : <span>{data?.student_id?.name}</span></p>
                    </div>
                </div>
                <div>
                {data?.rescheduled_by && data?.class_reschedule_status !== "Done" &&  <p style={{color : "#989898", fontSize:"13px", marginBottom:"20px", textTransform:"capitalize"}}> Last update : {data?.rescheduled_by}</p>}

                
                <div style={{ display: "flex", gap: "10px" , justifyContent:"end"  }}>
                    {data?.class_reschedule_status === "Pending" && data.open_reschedule_am && (
                        <button onClick={handleSlot}  id='button' className={`${classes.btn} ${classes.reschedule}`}>
                            Select Slot
                        </button>)}

                   { data?.class_reschedule_status === "Rescheduled" && data.open_reschedule_am && (
                        <button onClick={handleSlot}  id='button' className={`${classes.btn} ${classes.reschedule}`}>
                            Select Slot
                        </button>
                    )}
                   { data?.class_reschedule_status === "Done" && (
                        <button onClick={handleShow} className={`${classes.btn} ${classes.don}`}>
                            Done
                        </button>
                    )}
                   { data?.class_reschedule_status === "Scheduled" && (
                        <button onClick={handleShow} className={`${classes.btn} ${classes.accept}`}>
                            Accepted
                        </button>
                    )}
                   { data?.class_reschedule_status === "Cancelled" && (
                        <button onClick={handleShow} className={`${classes.btn} ${classes.cancel}`}>
                            Cancelled
                        </button>
                    )}
                </div>
                </div>
               {/* <div style={{display:"flex", gap:"10px"}}>
               {data?.rescheduled_by !== "teacher" ? (<><button  id="button"  onClick={handleAccept} className={`${classes.btn} ${classes.accept}`}>Accept</button> <button  id="button"  onClick={handleShow} className={`${classes.btn} ${classes.reschedule}`}>Reschedule</button></>) : <button  id="button"  onClick={handleShow} className={`${classes.btn} ${classes.reschedule}`}>Rescheduled</button> }  */}
               {/* {data?.rescheduled_by !== "teacher" &&
               <button onClick={handleAccept} className={`${classes.btn} ${classes.accept}`}>Accept</button> }
                <button type='button' onClick={handleShow} className={`${classes.btn} ${classes.reschedule}`}>Reschedule</button> */}

               {/* </div> */}
            </Container>
            {popup && <RescheduleClasses isPopup={popup} popupFunc={setPop} func={func} data1={data} />}
            {slot && <SlotModal2 isPopup={slot} popupFunc={setSlot} func={func} data1={data} />}
        </>
    )
}

export default TrialClassCard