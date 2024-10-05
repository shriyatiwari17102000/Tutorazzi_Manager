import React, { Fragment, useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './TeacherDetails.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import LabelledInput from '../../../Components/LabelledInput/LabelledInput'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import MiniDetail from '../../../Components/MiniDetail/MiniDetail'
import TicketComp from '../../../Components/TicketComp/TicketComp'
import axios from 'axios'
import { BASE_URL } from '../../../Apis/BaseUrl'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import Iframe1 from './Iframe1'
import NewPagination from '../../../Components/NewPagination/NewPagination'

// const curruiculam_info = [
//     {
//         label: 'Curriculum',
//         id: 'Curriculum',
//         value: 'Curriculum'
//     },
//     {
//         label: 'Grade',
//         id: 'Grade',
//         value: 'Grade'
//     },
//     {
//         label: 'Subject 1',
//         id: 'Subject 1',
//         value: 'Subject 1'
//     },
//     {
//         label: 'Subject 2',
//         id: 'Subject 2',
//         value: 'Subject 2'
//     },
//     {
//         label: 'Subject 3',
//         id: 'Subject 3',
//         value: 'Subject 3'
//     },
//     {
//         label: 'Subject 4',
//         id: 'Subject 4',
//         value: 'Subject 4'
//     },
// ]

// const class_info = [
//     {
//         label: 'Class Name',
//         id: 'classname',
//         value: 'Science'
//     },
//     {
//         label: 'Class Per Hour',
//         id: 'cph',
//         value: '2'
//     },
//     {
//         label: 'Teacher Name',
//         id: 'tn',
//         value: 'Puneet Shrivastav'
//     },
//     {
//         label: 'No of Hours',
//         id: 'noh',
//         value: '1'
//     },
//     {
//         label: 'Start Date',
//         id: 'sd',
//         value: '20/8/2023'
//     },
// ]

// const degree_data = [
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
//     {
//         title: 'Bsc (Bachelors Of Science)',
//         d1: '2008 - 2011',
//         d2: 'Bits Pilani, Delhi'
//     },
// ]

const TeacherDetails = () => {
    const [data, setData] = useState({})
    const [ticketData, setTicketData] = useState([])
    const [testimonial, setTestimonial] = useState([])
    const [teacherData, setTeacherData] = useState({})
    const [degreeDetail, setDegreeDetail] = useState([])
    const [curriculum, setCurriculum] = useState([])
    const [expdetail, setExpDetail] = useState([])
    const [limit, setLimit] = useState(4)
    const [page, setPage] = useState(1)
    const [pageInfo, setPageInfo] = useState({})

    const { id } = useParams()

    const perosnal_info = [
        {
            label: "Name",
            id: 'fn',
            value: teacherData?.user_id?.name
        },
        
        {
            label: "Email",
            id: 'em',
            value: teacherData?.user_id?.email
        },
        {
            label: "Mobile",
            id: 'mob',
            value: teacherData?.user_id?.mobile_number
        },
        // {
        //     label: "Grade",
        //     id: 'gr',
        //     value: teacherData?.grade?.name
        // },
        {
            label: "gender",
            id: 'gd',
            value: teacherData?.gender
        },
        {
            label: "City",
            id: 'city',
            value: teacherData?.city
        },
        {
            label: "State",
            id: 'state',
            value: teacherData?.state
        },
        {
            label: "Country",
            id: 'country',
            value: teacherData?.country
        },
        {
            label: "Address",
            id: 's1',
            value: teacherData.address
        }
    ]
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getData = async () => {

        let register = `${BASE_URL}/teacher-by-id?id=${id}`
        console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setData(res.data.data)
        setTicketData(res.data.data?.latest_support)
        setTeacherData(res.data.data?.teacherResponse)
        setDegreeDetail(res.data.data?.teacherResponse?.degree)
        setCurriculum(res.data.data?.teacherResponse?.subject_curriculum)
        // console.log(res.data.data.teacherResponse.curriculam)
        setExpDetail(res.data.data?.teacherResponse?.exp_details)
        // setTestimonial(res.data.data?.testimonialResponse)
    }
    useEffect(() => {
        getData()
    }, [])

    const getTestimonialData = async () => {

        let register = `${BASE_URL}/teacher-testimonials?teacher_id=${id}&limit=10&page=1`
        console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setTestimonial(res.data.data.docs)
        setPageInfo({ ...res.data.data, docs: null })

    }
    useEffect(() => {
        getTestimonialData()
    }, [])
    const paginationProps = {
        setPage,
        pageInfo
    }
    console.log(expdetail)
    // console.warn('re-redning')

    // console.log(testimonial.map((item) => console.log(item)))
    return (
        <Fragment>
            <Heading heading={'Teachers Profile'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
                {/* <BlackButton cls={classes.btn}>See His Classes</BlackButton> */}
            </Heading>
            <div className={classes.grid}>
                <Container cls={classes.inner_box_1}>
                    <UserDiv data={teacherData?.user_id} cit={true} citData={teacherData} />
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>{data?.upcomingClasses}</h1>
                        <p>Upcoming Classes</p>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>{data?.pastClass}</h1>
                        <p>Past Classes</p>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>{data?.trialClassesDone}</h1>
                        <p>Trial Classes Done</p>
                    </div>
                </Container>

                <Container cls={classes.inner_box_2} >
                    <h4 className={classes.heading}>Personal Info</h4>
                    {
                        perosnal_info.map((element, index) => (
                            <LabelledInput key={index} data={element} in_d={true} label={element.label} />
                        ))
                    }
                </Container>

                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Bachelors and masters details</h4>
                    <div className={classes.scroll_box}>
                        {degreeDetail.map((element, index) => (
                            <MiniDetail key={index} data={element} />
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Curriculum & subjects</h4>
                    <div className={classes.scroll_box}>
                        {curriculum.map((element, index) => (
                            <MiniDetail key={index} data={element} />
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_4} >
                    <h4 className={classes.heading}>Experience</h4>
                    <div className={classes.scroll_box}>
                        {expdetail.map((element, index) => (
                            <div key={index} className={classes.experience}>
                                <MiniDetail key={index} data={element} />
                                <p>
                                    {element?.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_6} >
                    <h4 className={classes.heading}>Testimonials</h4>
                    {testimonial?.length > 0 && <div>
                        <div className={classes.inn_div}>
                            {testimonial?.map((item, index) => (<div className={classes.test_div} key={index}>
                                <iframe
                                    width="100%"
                                    height="300"
                                    src={item.video}
                                    frameBorder="0"
                                    style={{ borderRadius: "5px" }}
                                    className="mx-2"
                                    allowFullScreen
                                ></iframe>
                            </div>))} </div> <NewPagination {...paginationProps} /></div>}
                </Container>
                {/*
                    {testimonial.map((item) => (
                                // <div  >
                                    <Iframe1 src={item.video}/>
                                // </div>
                            ) )
                            
                        // ) 
                        // : (
                        //     <p style={{ fontSize: "13px", color: "#989898" }}>No testimonials found</p>
                        // )
                    }
                </Container> */}
                <Container cls={classes.inner_box_5} >
                    <h4 className={classes.heading}>Latest Ticket</h4>
                    {ticketData?.length > 0 ? ticketData?.map((item) => (
                        <TicketComp data={item} />
                    )) :  <p style={{fontSize:"14px", color:"#989898"}}>no data found!</p>}

                </Container>
            </div>
        </Fragment>
    )
}

export default TeacherDetails
