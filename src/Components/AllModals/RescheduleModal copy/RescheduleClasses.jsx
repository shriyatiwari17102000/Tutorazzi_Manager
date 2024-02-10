import React, { useState } from 'react'
import Modal from '../../Modal/Modal'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import ToasterUpdate from '../../Toaster/ToasterUpdate'
import { BASE_URL } from '../../../Apis/BaseUrl'
import styles from "./RescheduleModal.module.css"

const RescheduleClasses = ({ popupFunc, isPopup, func, data1 }) => {
    // console.log("yyyyyyyyy")
    const [isLoading, setLoading] = useState(false)
    const [timeDate, setTimeDate] = useState(moment().format('YYYY-MM-DDTHH:mm'))

    let data = data1
    // console.log(data)
    let id = data?.classDetails?._id 
    console.log(id)
     const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    // console.log(timeDate)

    const handleDataUpload = async () => {
      
        const register = `${BASE_URL}/reschedule-class/${id}`
        // console.log(register)
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        // console.log({ start_time: timeDate })

        try {
            let response = await axios.patch(register, { start_time: timeDate }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token} `,
                },
            })

            console.log(response)
            ToasterUpdate(myToast, response.data.message, "success")
            func()
        } catch (error) {
            ToasterUpdate(myToast, error.message, "error")
        }
        finally {
            popupFunc(!isPopup)
            setLoading(false)

        }
    }

   
    let new_d = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    return (
        <Modal cls={`${styles.popup}`} value={isPopup} Func={popupFunc}>
            <div className={styles.top}>
                <Heading heading={'Reschedule'} p={''} />
            </div>

            <div className={styles.body}>

                <form style={{ width: "100%" }}>
                    <div className='px-3'>

                        <label className={styles.modal_label}>
                            Reschedule Date and Time
                        </label>
                        <input min={new_d} type="datetime-local" value={timeDate} onChange={(e) => setTimeDate(e.target.value)} className={`${styles.input_box2}`} required />
                    </div>
                </form>
            </div>

            <div className={styles.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <button style={{ background: "black", color: "white" }} disabled={isLoading} onClick={handleDataUpload}>Reschedule</button>
            </div>
        </Modal>
    )
}

export default RescheduleClasses