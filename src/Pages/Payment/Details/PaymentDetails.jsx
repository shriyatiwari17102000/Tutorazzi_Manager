import React, { useEffect, useState } from 'react'
import classes from './PaymentDetails.module.css'
import { Fragment } from 'react'
import Heading from '../../../Components/Heading/Heading'
import PaymentCard from '../../../Components/PaymentCard/PaymentCard'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ClassCard from '../../../Components/ClassCard/ClassCard'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import StuDetailCard from '../../Students/StudentDetails/StuDetailCard'
const data = [
    {
        id: 1,
        heading: 'Teacher\' Profile',
        name: 'Puneet Shrivastav',
        city: 'Delhi'
    },
    {
        id: 2,
        heading: 'Student\' Profile',
        name: 'Khushi Shrivastav',
        city: 'UK'
    },
]

const data2 = {
    title: 'Maths Class',
    timing: '10:30pam to 11:30am',
    date: '16/07/2023',
    teacher: 'Amanjeet Singh',
    student: 'Puneet Shrivastav',
    tags: ['done']
}

const PaymentDetails = () => {
    const [data, setData] = useState({})
    const [classData, setClassData] = useState([])

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const { id } = useParams()
    console.log(id)

    const getDetail = async () => {
        const register = `${BASE_URL}/student-payment-details?payment_id=${id}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data.data)
        setData(response.data.data)
        setClassData(response.data.data?.payment?.class_id)
    }

    useEffect(() => {
        getDetail()
    }, [])
    let stu_id = data?.studentDetails?.user_id?.id
    console.log(stu_id)
    let teac_id = data?.teacherDetails?._id
    const navigate = useNavigate()
    const handleNavigate = () => {
        // console.log(`teacher-detail/${teacherId}`)
        navigate(`/teacher/details/${teac_id}`)
    }
    const handleNavigateStudent = (teacherId) => {
        // console.log(`teacher-detail/${stu_id}`)
        navigate(`/student/details/${stu_id}`)
    }
    console.log(data?.payment?.trx_ref_no)
    return (
        <Fragment>
            <Heading heading={'Payments'} p={'You can see your Payments here and manage them'} />
            <div className={classes.grid}>
                <PaymentCard det={false} cls={classes.my_card} data={data?.payment} details={true}>
                    <div className={classes.flex}>
                        <h6>Reference No.</h6>
                        <span className={classes.gray_span}>#{data?.payment_id}</span>
                    </div>
                </PaymentCard>
                {/* {
                    data.map(element => (
                     
                    ))
                } */}
                <Container cls={classes.inner_box} >
                    <h4 className={classes.heading}>Teacher's Detail</h4>
                    <UserDiv data={data?.teacherDetails}>
                        <div className={classes.link} onClick={handleNavigate} style={{cursor:"pointer"}}>View Profile</div>
                    </UserDiv>
                </Container>
                <Container cls={classes.inner_box} >
                    <h4 className={classes.heading}>Student's Detail</h4>
                    <UserDiv data={data?.studentDetails?.user_id} curr={data?.studentDetails?.curriculum}>
                        <div className={classes.link} onClick={handleNavigateStudent} style={{cursor:"pointer"}}>View Profile</div>
                    </UserDiv>
                </Container>
                <Container cls={classes.inner_box_2} >
                    <h4 className={classes.heading}>Class Details</h4>
                    {/* { */}
                        {/* // classData.map((item) => ( */}
                            <div className={classes.inn_clss}>
                                <StuDetailCard data={data?.payment?.quote_id} cls={classes.my_class_details} />
                            </div>
                        {/* ))
                    } */}
                    {/* {
                        classData.map((item) => (
                            <div className={classes.inn_clss}>
                                <ClassCard data={item} cls={classes.my_class_details} />
                            </div>
                        ))
                    } */}
                </Container>
            </div>
        </Fragment>
    )
}

export default PaymentDetails
