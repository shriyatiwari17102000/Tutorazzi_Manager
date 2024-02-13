import React, { useEffect, useState } from 'react'
import Modal from '../../Modal/Modal'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import ToasterUpdate from '../../Toaster/ToasterUpdate'
import { BASE_URL } from '../../../Apis/BaseUrl'
import classes from "./StuProfile.module.css"
import LabelledInput from '../../LabelledInput/LabelledInput'

const ViewProfileModal = ({ popupFunc, isPopup, func, data1 }) => {
    // console.log(data1)
    const [query, setQuery] = useState('')
    const[sub, setSub] = useState([])
    const[subject, setSubject] = useState('')
    const[price, setPrice] = useState('')
    const[classCount, setClassCount] = useState('')
    const[classNames, setClassNames] = useState('')
    const [isLoading, setLoading] = useState(false)
    const[teacherData, setTeacherData] = useState([])
    const[teacher, setTeacher] = useState("")
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };
// console.log(data1?.classDetails?.curriculum_name)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getCurriculum = async () => {
        const register = `${BASE_URL}/subject-by-curriculum?curriculum=${data1?.
            classDetails?.curriculum_name}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data.data)
        setSub(response.data.data)
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
            teacher_id: data1?.classDetails?.teacher_id?.id,
            student_id: data1?.classDetails?.student_id?.id,
            amount: price,
            class_count: classCount,
            description: query,
            class_name: classNames,
            subject: subject,
            curriculum: data1?.classDetails?.curriculum_name ,
            grade: data1?.classDetails?.grade_name

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
                <Heading heading={'Student Details'} p={''} />
            </div>

            <div className={classes.body}>
            <h6 className={classes.heading}>Personal Information</h6>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <ul>
            <li>
              Full Name   <span>hello</span>
            </li>
            <li>
                Email ID <span>hello</span>
            </li>
            <li>
                Phone Number <span>hello</span>
            </li>
            <li>
                Student ID <span>hello</span>
            </li>
            <li>
                Parent ID <span>hello</span>
            </li>
            <li>
                School <span>hello</span>
            </li>
            <li>
                Standard <span>hello</span>
            </li>
           </ul>
           <ul>
            <li>
                Address <span>hello</span>
            </li>
            <li>
                City <span>hello</span>
            </li>
            <li>
                State <span>hello</span>
            </li>
         
           </ul>
          </div>
            <h6 className={classes.heading}>Curriculum information</h6>
            <div>
              <ul>
              <li style={{gap:"50px"}}>Curriculum <span>gggggg</span></li>
              </ul>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <ul>
            <li>
                Subject 1 <span>hello</span>
            </li>
            <li>
            Subject 2<span>hello</span>
            </li>
            
           </ul>
           <ul>
            <li>
            Subject 3 <span>hello</span>
            </li>
            <li>
            Subject 4 <span>hello</span>
            </li>
           </ul>
          </div>
          </div>
            </div>

         
        </Modal>
    )
}

export default ViewProfileModal