import React, { useState } from 'react'
import Modal from '../../Modal/Modal'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import ToasterUpdate from '../../Toaster/ToasterUpdate'
import { BASE_URL } from '../../../Apis/BaseUrl'
import classes from "./Quote.module.css"
import LabelledInput from '../../LabelledInput/LabelledInput'

const QuoteModal = ({ popupFunc, isPopup, func, data1 }) => {
    const[query, setQuery] = useState('')
    const[isLoading, setLoading] = useState(false)
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

 
     const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token


    const handleDataUpload = async () => {
      
        // const register = `${BASE_URL}/reschedule-class/${id}`
        // // console.log(register)
        // const myToast = toast.loading('Please Wait...')
        // setLoading(true)
        // // console.log({ start_time: timeDate })

        // try {
        //     let response = await axios.patch(register, { start_time: timeDate }, {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${token} `,
        //         },
        //     })

        //     console.log(response)
        //     ToasterUpdate(myToast, response.data.message, "success")
        //     func()
        // } catch (error) {
        //     ToasterUpdate(myToast, error.message, "error")
        // }
        // finally {
        //     popupFunc(!isPopup)
        //     setLoading(false)

        // }
    }

   
    // let new_d = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Reschedule'} p={''} />
            </div>

            <div className={classes.body}>
              <LabelledInput  id={'subject'} label={'Subject'} value="gggg" />
            
              <div >
                <label className={classes.label1}>Category</label>
                <select className={classes.input_div1}>
                    <option selected value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
              </div>
              
                <div className={classes.txtarea}>
                    <label htmlFor="txt">Description</label>
                    <textarea id="txt" onChange={handleQueryChange} value={query}></textarea>
                </div>
                </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <button style={{ background: "black", color: "white" }} disabled={isLoading} onClick={handleDataUpload}>Reschedule</button>
            </div>
        </Modal>
    )
}

export default QuoteModal