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
import CurriculumSubject from './cards/CurriculumSubject'
import EducationCard from './cards/EducationCard'
import Experience from './cards/Experience'
import BarChart from './cards/BarChart'
import PieChart from './cards/PieChart'
import { IoPlayOutline } from "react-icons/io5";
import VideoModal from '../../../Components/AllModals/VideoModal/VideoModal'
import SwiperCard from './cards/SwiperCard'

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
    const [showVideo, setShowVideo] = useState(false); // State to track video visibility

    // Function to toggle the video visibility
    const handleShowVideo = () => {
        setShowVideo(!showVideo); // Set to true when the button is clicked
    };

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
            value: teacherData?.address
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
                    <div className={classes.det_box}>
                        <p>Trial class requests</p>
                        <h1>{data?.trialClassesRequests}</h1>
                    </div>

                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <p>Student</p>
                        <h1>{data?.totalStudents}</h1>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <p>Missed Classes</p>
                        <h1>{data?.missedClasses}</h1>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <p>Last week withdraw</p>
                        <h1>{data?.lastWithdawl}</h1>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <p>Wallet amount</p>
                        <h1>{data?.walletBalance?.toFixed(0)}</h1>
                    </div>
                </Container>
                <Container cls={classes.inner_box_12} >
                    <BarChart newArray={data?.newArray} />
                </Container>
                <Container cls={classes.inner_box_13} >
                    <PieChart data={data} />
                </Container>
                <Container cls={classes.inner_box_2} >
                    {/* <div style={{ gridColumn: "span 10", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        {console.log(teacherData?.intro_video, "jj")}
                        <UserDiv data={teacherData?.user_id} cit={true} citData={teacherData} />
                        <iframe
                            height="300"
                            src={teacherData?.video_url}
                            frameBorder="0"
                            style={{
                                borderRadius: "5px",
                                // width: "100%",
                                paddingRight: "20px",
                                paddingLeft: "5px",
                                paddingTop: "10px"
                            }}
                            className="mx-2"
                            allowFullScreen
                        ></iframe>
                    </div> */}
                    <div
                        style={{
                            gridColumn: 'span 10',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* {console.log(teacherData?.intro_video, 'jj')} */}
                        <UserDiv data={teacherData?.user_id} cit={true} citData={teacherData} />

                        {/* Check if the video should be shown, else show button */}
                  
                            <button
                                onClick={handleShowVideo}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    backgroundColor: '#F2F2F2', // Button color
                                    // color: 'white',
                                    fontWeight: "500",
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >
                                Intro Video <IoPlayOutline />

                            </button>
                      
                    </div>
                    <h4 className={classes.heading} style={{ marginTop: "20px" }}>Basic Information</h4>
                    <div

                        className={classes.info_div}
                    // style={{
                    //     display: 'grid',
                    //     gridTemplateColumns: 'repeat(6, 1fr)', // 6-column grid
                    //     gap: '10px 20px',
                    //     lineHeight: '1.8',
                    //     fontSize: '14px',
                    // }}
                    >
                        {/* Name and Email */}
                        <div className={classes.inner_div}>
                            <div><p>Name</p><br /><span>{teacherData?.preferred_name}</span></div>
                            <div><p>Email ID</p><br /><span>{teacherData?.user_id?.email}</span></div>
                            <div><p>Phone Number</p><br /><span>{teacherData?.user_id?.mobile_number}</span></div>
                        </div>

                        <div className={classes.inner_div}>
                            <div><p>Gender</p><br /><span>{teacherData?.gender}</span></div>
                            <div><p>DOB</p><br /><span>{teacherData?.dob}</span></div>
                            <div><p>City</p><br /><span>{teacherData?.city}</span></div>
                        </div>
                        <div className={classes.inner_div}>
                            <div><p>State</p><br /><span>{teacherData?.state}</span></div>
                            <div><p>Country</p><br /><span>{teacherData?.country}</span></div>
                            <div><p>Pincode</p><br /><span>{teacherData?.pincode}</span></div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div style={{ marginTop: '20px', gridColumn: "span 10" }} className={classes.inner_div}>
                        <p style={{ fontSize: "14px" }}>Bio</p>
                        <span style={{ marginTop: '10px', color: '#666', lineHeight: '1.8', fontSize: "14px" }}>
                            {teacherData?.bio}
                        </span>

                    </div>
                    {/* {
                        perosnal_info.map((element, index) => (
                            <LabelledInput key={index} data={element} in_d={true} label={element.label} />
                        ))
                    } */}
                </Container>

                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Bachelors and masters details</h4>
                    <div className={classes.scroll_box}>
                        {degreeDetail?.map((element, index) => (
                            <EducationCard key={index} data={element} />
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Curriculum & subjects</h4>
                    <div className={classes.scroll_box}>
                        {console.log(curriculum, "curr")}
                        {curriculum?.map((element, index) => (
                            <CurriculumSubject data={element} />
                            // <MiniDetail key={index} data={element} />
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_4} >
                    <h4 className={classes.heading}>Experience</h4>
                
                        <SwiperCard data={expdetail}/>
                        {/* {expdetail?.map((element, index) => (
                            <div key={index} className={classes.experience}>
                                <Experience key={index} data={element} />

                            </div>
                        ))} */}
                   
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
                <Container cls={`${classes.inner_box_5} ${classes.inn}`} >
                    <h4 className={classes.heading}>Bank Details</h4>

                    <div className={classes.bank_div}>
                        <div>
                            {console.log(data)}
                            <p>Bank Name : <span>{data?.teacherResponse?.bank_name}</span></p>
                            <p>IFSC Code : <span>{data?.teacherResponse?.ifsc_code}</span></p>
                            <p>Account No. : <span>{data?.teacherResponse?.account_number}</span></p>
                        </div>
                        <div>
                            <p>Holder's Name : <span>{data?.teacherResponse?.account_holder_name}</span></p>
                            <p>IBAN Code : <span>{data?.teacherResponse?.routing_code}</span></p>
                            <p>Paypal Email : <span>{data?.teacherResponse?.paypal_email}</span></p>
                        </div>
                    </div>
                    {/* {ticketData?.length > 0 ? ticketData?.map((item) => (
                        <TicketComp data={item} />
                    )) :  <p style={{fontSize:"14px", color:"#989898"}}>no data found!</p>} */}

                </Container>
            </div>

            {showVideo && <VideoModal isPopup={showVideo} popupFunc={setShowVideo} video_url={teacherData?.video_url}/>}
        </Fragment>
    )
}

export default TeacherDetails
