import React, { useEffect, useState } from 'react'
import Modal from '../../Modal/Modal'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import ToasterUpdate from '../../Toaster/ToasterUpdate'
import { BASE_URL } from '../../../Apis/BaseUrl'
import classes from "../Quote/Quote.module.css"
import LabelledInput from '../../LabelledInput/LabelledInput'

const AddClassBundle = ({ popupFunc, isPopup, func, data1, id }) => {
    // console.log(data1)
    const[sub, setSub] = useState([])
    const [currData, setCurrData] = useState([])
    const [curriculum, setCurriculum] = useState("")
    const[subject, setSubject] = useState([])
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
    //   console.log(data1)

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

        console.log(response.data.data)
        setTeacherData(response.data.data?.docs)
        setTeacher(response.data.data.docs[0].user_id)
    }

    useEffect(() => {
        getTeacher()
    }, [])
    const getAllCurriculum = async () => {
        const register = `${BASE_URL}/curriculums?teacher_id=${teacher}`;

        const response = await axios.get(register, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.data)
        setCurriculum(response.data.data[0]?.curriculum_name)
        setCurrData(response.data.data)

        // getAllSubject()
    }
    useEffect(() => {
        getAllCurriculum()
    }, [teacher])

    const getSubject = async () => {
        const register = `${BASE_URL}/subject-by-curriculum?curriculum=${curriculum}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data.data)
        setSub(response.data.data)
        setSubject(response.data.data[0])
    }

    useEffect(() => {
        getSubject()
    }, [curriculum])
    // console.log(sub)

    const handleDataUpload = async () => {

        const register = `${BASE_URL}/Class-Bundle`
        // console.log(register)
        // console.log({ start_time: timeDate })
        let bdy = {
            teacher_id: teacher,
            student_id: id,
            amount: price,
            class_count: classCount,
            description: query,
            subject : subject,
            class_name: classNames,
            curriculum: curriculum,
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
            func()
        } catch (error) {
            ToasterUpdate(myToast, error.message, "error")
        }
        finally {
            popupFunc(!isPopup)
            setLoading(false)

        }
    }

// console.log(teacherData[0].user_id)
    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Add Class bundle'} p={'You can Add class bundle for student'} />
            </div>

            <div className={classes.body}>
                <LabelledInput cls={classes.wd} id={'class name'} label={'Class Name'} value={classNames} func={setClassNames}/>
                <LabelledInput cls={classes.wd} id={'class count'} label={'Class Count'} value={classCount} func={setClassCount}/>
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
                    <select className={classes.input_div1} value={teacher} onChange={(e) => setTeacher(e.target.value)}>

                    {teacherData && teacherData?.map((element, index) => (<option key={index} selected value={element.user_id}>{element.preferred_name}</option>))}
                    </select>
                </div>
                <div className={classes.wd}>
                    <label className={classes.label1}>Select Curriculum</label>
                    <select className={classes.input_div1} value={curriculum} onChange={(e) => setCurriculum(e.target.value)}>
                    {currData && currData?.map((element, index) => (<option key={index} selected value={element.curriculum_name}>{element.curriculum_name}</option>))}
                    </select>
                </div>
                <div className={classes.wd}>
                    <label className={classes.label1}>Select Subject</label>
                    <select className={classes.input_div1} value={subject} onChange={(e) => setSubject(e.target.value)}>
                    {sub && sub?.map((element, index) => (<option key={index} selected value={element}>{element}</option>))}
                    </select>
                </div>
                {/* <LabelledInput cls={classes.cls_W} id={'class name'} label={"Teacher's Name"} value={teacher} func={setTeacher}/> */}

                <div className={classes.txtarea}>
                    <label htmlFor="txt">Description</label>
                    <textarea id="txt" onChange={handleQueryChange} value={query}></textarea>
                </div>
            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <button style={{ background: "black", color: "white" }} disabled={isLoading} onClick={handleDataUpload}>Add Class Bundle</button>
            </div>
        </Modal>
    )
}

export default AddClassBundle