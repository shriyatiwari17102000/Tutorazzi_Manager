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

const QuoteModal = ({ popupFunc, isPopup, func, data1, teacher_name }) => {
    console.log(teacher_name)
    const [query, setQuery] = useState('')
    const [sub, setSub] = useState([])
    const [subject, setSubject] = useState('')
    const [price, setPrice] = useState('')
    const [classCount, setClassCount] = useState('1')
    const [classNames, setClassNames] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [teacherData, setTeacherData] = useState([])
    const [teacher_amount, setTeacher_amount] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
const[description, setDescription] = useState('')
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Allow only values between 1 and 100
        if (value === '' || (value >= 1 && value <= 100)) {
            setTeacher_amount(value);
            setErrorMessage(''); // Clear error message if input is valid
        } else {
            setErrorMessage('You can add a number between 1 to 100 only');
        }
    };
    // console.log(data1?.classDetails?.curriculum_name)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getCurriculum = async () => {
        const register = `${BASE_URL}/subject-by-curriculum?curriculum=${data1?.
            classDetails?.curriculum_name}&teacher_id=${teacher_name?.user_id?._id}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data?.data)
        setSub(response.data.data)
        setSubject(response.data?.data[0])
    }

    useEffect(() => {
        getCurriculum()
    }, [])

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
    }

    useEffect(() => {
        getTeacher()
    }, [])

    console.log(sub)

    const handleDataUpload = async () => {

        const register = `${BASE_URL}/Quote`
        // console.log(register)
        const myToast = toast.loading('Please Wait...')
        // console.log({ start_time: timeDate })
        let bdy = {
            class_id :data1?.classDetails?.id, 
            teacher_id: data1?.classDetails?.teacher_id?.id,
            student_id: data1?.classDetails?.student_id?.id,
            amount: price,
            class_count: classCount,
            description: description,
            class_name: classNames,
            // subject: subject,
            // curriculum: data1?.classDetails?.curriculum_name,
            // grade: data1?.classDetails?.grade_name,
            teacher_share : teacher_amount,
           
        }

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
            func()
        } catch (error) {
            ToasterUpdate(myToast, error.message, "error")
        }
        finally {
            popupFunc(!isPopup)
            setLoading(false)

        }
    }


    // let new_d = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Add Quote'} p={''} />
            </div>

            <div className={classes.body}>
                <LabelledInput cls={classes.cls_W} id={'class name'} label={'Class package Name'} value={classNames} func={setClassNames} />

                {/* <div className={classes.wd}>
                    <label className={classes.label1}>Select Subject</label>
                    <select className={classes.input_div1} value={subject} onChange={(e) => setSubject(e.target.value)}>
                        {sub.length > 0 ? sub?.map((element, index) => (<option key={index} selected value={element}>{element}</option>)) : <option value={""}>No subject found!</option>}
                    </select>
                </div> */}
                  <div className={classes.wd}>
                    <label  className={classes.label1} htmlFor="price">Enter Teacher's Cut (in %)</label>
                    {/* <div className={classes.boxed_input} > */}
                        <input type="number" className={classes.input_div1} min={1} max={100} value={teacher_amount} onChange={handleInputChange}
                        />
                    {/* </div> */}
                    {errorMessage && (
                        <p style={{ color: 'red' , fontSize:"13px"}}>{errorMessage}</p> // Display error message
                    )}
                </div>
                <div className={classes.wd}>
                    <label className={classes.label1}>Select Teacher</label>
                    <input type="text" value={teacher_name?.preferred_name} className={classes.input_div1} readOnly />
                    {/* <select className={classes.input_div1} value={teacher} onChange={(e) => setTeacher(e.target.value)}>
                    {teacherData && teacherData?.map((element, index) => (<option key={index} selected value={element.user_id}>{element.preferred_name}</option>))}
                    </select> */}
                </div>
                <div className={classes.wd}>
                    <label className={classes.label1}>Select No. of Classes</label>
                    <select className={classes.input_div1} onChange={(e) => setClassCount(e.target.value)}>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                {/* <LabelledInput cls={classes.wd} id={'price'} label={'Price Per Class'} value="gggg" /> */}
                <div className={classes.input_con}>
                    <label htmlFor="price">Price Per Class</label>
                    <div className={classes.boxed_input}>
                        <div className={classes.sign}>₹</div>
                        <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>

                <div className={classes.textarea} style={{width : "100%"}}>
                    <label  className={classes.label1} htmlFor="Description">Description</label>
                    <textarea style={{width:"100%", border:"1px solid #d9d9d9", borderRadius:"5px", padding:"10px", outline:"none"}} rows={5} name="" id="" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                        {/* <input type="number" className={classes.input_div1} min={1} max={100} value={teacher_amount} onChange={handleInputChange}
                        /> */}
                   
                </div>
              
            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <button style={{ background: "black", color: "white" }} disabled={isLoading} onClick={handleDataUpload}>Add Quote</button>
            </div>
        </Modal>
    )
}

export default QuoteModal