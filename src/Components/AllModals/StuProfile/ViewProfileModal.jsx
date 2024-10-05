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

const ViewProfileModal = ({ popupFunc, id, isPopup, func, data1 }) => {
    // console.log(data1)
    const [sub, setSub] = useState([])
    const [stuId, setStuId] = useState({})

    // console.log(data1?.classDetails?.curriculum_name)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getCurriculum = async () => {
        const register = `${BASE_URL}/student-details?student_id=${id}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        // console.log(response.data.data)
        setSub(response.data.data?.studentDetails)
        setStuId(response.data.data)
    }

    useEffect(() => {
        getCurriculum()
    }, [])

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
    // }

    // useEffect(() => {
    //     getTeacher()
    // }, [])

    // console.log(sub)

    // const handleDataUpload = async () => {

    //     const register = `${BASE_URL}/Quote`
    //     // console.log(register)
    //     const myToast = toast.loading('Please Wait...')
    //     // console.log({ start_time: timeDate })
    //     let bdy = {
    //         teacher_id: data1?.classDetails?.teacher_id?.id,
    //         student_id: data1?.classDetails?.student_id?.id,
    //         amount: price,
    //         class_count: classCount,
    //         description: query,
    //         class_name: classNames,
    //         subject: subject,
    //         curriculum: data1?.classDetails?.curriculum_name,
    //         grade: data1?.classDetails?.grade_name

    //     }

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
    //         func()
    //     } catch (error) {
    //         ToasterUpdate(myToast, error.message, "error")
    //     }
    //     finally {
    //         popupFunc(!isPopup)
    //         setLoading(false)

    //     }
    // }


    // let new_d = moment(new Date()).format('YYYY-MM-DDTHH:mm');

    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Student Details'} p={''} />
            </div>

            <div className={classes.body}>
                <h6 className={classes.heading}>Personal Information</h6>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <ul>
                        <li>
                            Full Name   <span>{sub?.preferred_name}</span>
                        </li>
                        <li>
                            Email ID <span>{sub?.user_id?.email}</span>
                        </li>
                        <li>
                            Phone Number <span>{sub?.user_id?.mobile_number}</span>
                        </li>
                        <li>
                            Student ID <span>{stuId?.studentId}</span>
                        </li>
                        <li>
                            Parent ID <span>{stuId?.parentID}</span>
                        </li>
                        <li>
                            School <span>{sub?.school}</span>
                        </li>
                        <li>
                            Standard <span>{sub?.grade_name}</span>
                        </li>
                    </ul>
                    <ul>
                        {/* <li>
                            Address <span>{sub?.address}</span>
                        </li> */}
                        <li>
                            City <span>{sub?.city}</span>
                        </li>
                        <li>
                            State <span>{sub?.state}</span>
                        </li>
                        <li>
                            Langauge <span> {sub?.language?.map((item, index) => (

                                <span >{item}</span>

                            ))}</span>
                        </li>

                    </ul>
                </div>
                <h6 className={classes.heading}>Curriculum information</h6>
                <div>
                    <ul>
                        <li style={{ gap: "85px", justifyContent: "flex-start" }} className={classes.btm_curr}>Curriculum <span>{sub?.default_curriculum}</span></li>
                    </ul>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <ul className={classes.btm_ul}>
                            {sub?.subject_curriculum?.map((item, index) => (
                                <li style={{ gap: "98px" }}>
                                    Subject {index + 1}<span >{item.subject}</span>
                                </li>
                            ))}
                        </ul>
                        {/* <ul>
                            <li>
                                Subject <span>hello</span>
                            </li>
                            <li>
                                Subject  <span>hello</span>
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>


        </Modal>
    )
}

export default ViewProfileModal