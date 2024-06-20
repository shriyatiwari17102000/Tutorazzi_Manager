import React, { useEffect, useState } from 'react'
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

const TransferModal = ({id, popupFunc, isPopup, func, setShow, show,  data1 }) => {
    // console.log(data1)
    console.log("fhjfgfgfggfh")
    const [query, setQuery] = useState('')
    const[price, setPrice] = useState('')
    const[classCount, setClassCount] = useState('')
    const[classNames, setClassNames] = useState('')
    const[teacher, setTeacher] = useState('')
    const[teacherData, setTeacherData] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };
      console.log(data1)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getTeacher = async () => {
        const register = `${BASE_URL}/all-teachers`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data.data?.docs)
        setTeacherData(response.data.data?.docs)
        setTeacher(response.data.data.docs[0]?.user_id)
    }

    useEffect(() => {
        getTeacher()
    }, [])

    // console.log(sub)

    // const handleDataUpload = async () => {

    //     const register = `${BASE_URL}/extra-class-quote`
    //     // console.log(register)
    //     // console.log({ start_time: timeDate })
    //     let bdy = {
    //         teacher_id: data1.teacher_id || data1.teacher_id._id,
    //         student_id: id,
    //         amount: price,
    //         class_count: classCount,
    //         description: query,
    //         subject : data1?.subject || data1.subject_name,
    //         class_name: classNames,
    //         curriculum: data1?.curriculum || data1.curriculum_name,
    //         // grade: data1?.grade_name
            
    //     }
    //     console.log(bdy)
    //     const myToast = toast.loading('Please Wait...')
    //     setLoading(true)
    //     try {
    //         let response = await axios.post(register, bdy, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token} `,
    //             },
    //         })

    //         console.log(response)
    //         ToasterUpdate(myToast, response.data.message, "success")
    //         func && func()
    //        setShow && setShow(!show)
    //     } catch (error) {
    //         ToasterUpdate(myToast, error.message, "error")
    //     }
    //     finally {
    //         popupFunc(!isPopup)
    //         setLoading(false)

    //     }
    // }


    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Transfer Classes'} p={''} />
            </div>

            <div className={classes.body}>
               
                <div style={{width:"100%"}}>
                    <label className={classes.label1} value={teacher} onChange={(e)=> setTeacher(e.target.value)}>Select Teacher</label>
                    <select name="" id="" className={classes.selecttag}>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                    </select>
           
                   
                </div>

               
            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <button style={{ background: "black", color: "white" }} disabled={isLoading} 
                // onClick={handleDataUpload}
                >Transfer Classes</button>
            </div>
        </Modal>
    )
}

export default TransferModal