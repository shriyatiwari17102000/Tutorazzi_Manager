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

const AddExtraClass = ({id, popupFunc, isPopup, setShow, show,  data1 }) => {
    // console.log(data1)
    console.log("fhjfgfgfggfh")
    const [query, setQuery] = useState('')
    const[price, setPrice] = useState('')
    const[classCount, setClassCount] = useState('')
    const[classNames, setClassNames] = useState('')
    const [isLoading, setLoading] = useState(false)
    const[teacherData, setTeacherData] = useState([])
    const[teacher, setTeacher] = useState("")

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };
      console.log(data1)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    // const getTeacher = async () => {
    //     const register = `${BASE_URL}/all-teachers`
    //     let response = await axios.get(register, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token} `,
    //         },
    //     })

    //     console.log(response.data.data?.docs)
    //     setTeacherData(response.data.data?.docs)
    //     setTeacher(response.data.data.docs[0]?.user_id)
    // }

    // useEffect(() => {
    //     getTeacher()
    // }, [])

    // console.log(sub)

    const handleDataUpload = async () => {

        const register = `${BASE_URL}/extra-class-quote`
        // console.log(register)
        // console.log({ start_time: timeDate })
        let bdy = {
            teacher_id: data1.teacher_id || data1.teacher_id._id,
            student_id: id,
            amount: price,
            class_count: classCount,
            description: query,
            subject : data1?.subject || data1.subject_name,
            class_name: classNames,
            curriculum: data1?.curriculum || data1.curriculum_name,
            // grade: data1?.grade_name
            
        }
        console.log(bdy)
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
            let response = await axios.post(register, bdy, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token} `,
                },
            })

            console.log(response)
            ToasterUpdate(myToast, response.data.message, "success")
            setShow(!show)
        } catch (error) {
            ToasterUpdate(myToast, error.message, "error")
        }
        finally {
            popupFunc(!isPopup)
            setLoading(false)

        }
    }


    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Add Extra Class'} p={''} />
            </div>

            <div className={classes.body}>
                <LabelledInput cls={classes.wd} id={'class name'} label={'Class Name'} value={classNames} func={setClassNames}/>
                <LabelledInput cls={classes.wd} id={'class count'} type="number" label={'Class Count'} value={classCount} func={setClassCount}/>
                {/* <LabelledInput cls={classes.wd} id={'price'} label={'Price Per Class'} value="gggg" /> */}
                <div className={classes.input_con}>
                    <label htmlFor="price">Price Per Class</label>
                <div className={classes.boxed_input}>
                    <div className={classes.sign}>₹</div>
                    <input type="number" min={0}  value={price} onChange={(e)=> setPrice(e.target.value)} />
                </div>
                </div>
                <div className={classes.wd}>
                    <label className={classes.label1}>Select Teacher</label>
                    <input className={classes.input_div1} type='text' value={data1?.teacher_name ? data1?.teacher_name : data1?.teacher_id?.name} readOnly/>
                    {/* <select className={classes.input_div1} value={teacher} onChange={(e) => setTeacher(e.target.value)}>
                    {teacherData && teacherData?.map((element, index) => (<option key={index} selected value={element.user_id}>{element.preferred_name}</option>))}
                    </select> */}
                </div>
                {/* <LabelledInput cls={classes.cls_W} id={'class name'} label={"Teacher's Name"} value={teacher} func={setTeacher}/> */}

                <div className={classes.txtarea}>
                    <label htmlFor="txt">Description</label>
                    <textarea id="txt" onChange={handleQueryChange} value={query}></textarea>
                </div>
            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <button style={{ background: "black", color: "white" }} disabled={isLoading} onClick={handleDataUpload}>Add Extra Class</button>
            </div>
        </Modal>
    )
}

export default AddExtraClass