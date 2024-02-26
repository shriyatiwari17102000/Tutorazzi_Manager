import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import classes from './ClassesDetail.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DownloadPdf from '../../../Components/DownloadPdf/DownloadPdf'
import UpcomingClassCard from '../../../Components/UpcomingClassCard/UpcomingClassCard'
import HomeworkDiv from '../../Overview/Components/HomeworkDiv'
// import TaskFoldMap from '../../../MappableDivs/TaskFoldMap/TaskFoldMap'
import TasksMap from '../../../MappableDivs/TasksMap'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'
import RatingCard from './RatingCard'
import QuoteModal from '../../../Components/AllModals/Quote/QuoteModal'
import { LuPlus } from "react-icons/lu";
import { FaPlus } from 'react-icons/fa'


const PastClassDetail = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState({})

    const popupHandler = () => {
        setShow(!show)
    }
    const { id } = useParams()
    // console.log(id)
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getUpcomingData = async () => {
        // console.log("hhhhhhhhhhh")
        let register = `${BASE_URL}/class-details?class_id=${id}`
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setData(res.data.data)
    }
    let teacherId = data?.teacherDetails?.user_id?._id
    // console.log(teacherId)
    const navigate = useNavigate()
    const handleNavigate = () => {
        console.log(`teacher-detail/${teacherId}`)
        navigate(`/teacher/details/${teacherId}`)
    }

    useEffect(() => {
        getUpcomingData()
    }, [])
    return (
        <React.Fragment>
            <Heading heading={'Past Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
                {/* <BlackButton func={popupHandler} funcVal={show} cls={classes.btn}>Add Quote</BlackButton> */}
            </Heading>
            <div className={classes.box}>
                <Container cls={classes.header}>
                    <div className={classes.header_right}>
                        <div className={classes.header_right_profile}>  {data && data?.classDetails?.subject?.name?.slice(0, 1).toUpperCase()}</div>
                        <div className={classes.header_right_inner}>
                            <h4 className={classes.secondary_heading}>{data?.classDetails?.subject?.name} Class</h4>
                            <h5><Moment format="hh:mm A" utc>{data?.classDetails?.start_time}</Moment> & <Moment format="hh:mm A" utc>{data?.classDetails?.end_time}</Moment></h5>
                            <h5><Moment format="DD/MM/YYYY" utc >{data?.classDetails?.start_time}</Moment></h5>
                        </div>
                    </div>
                    <button className={classes.header_btn}>View Recording</button>
                </Container>
                <Container cls={classes.inner_box}>
                    <h4 className={classes.secondary_heading}>Description</h4>
                    <p className={classes.page_para}>
                        {data?.classDetails?.details ? data?.classDetails?.details : "No description found..."}
                    </p>
                </Container>
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher's Details</h4>
                    <UserDiv data={data?.teacherDetails}>
                        <div className={classes.link} style={{cursor:"pointer"}}  onClick={handleNavigate} >View Profile</div>
                    </UserDiv>
                </Container>
                {data.length > 0 &&
                <Container cls={`${classes.inner_box1}`}>
                    <h4 className={classes.secondary_heading}>Class Resources</h4>
                   {data?.classDetails?.materials_url.map((item, index) => (
                        <DownloadPdf item={item} />
                    )) }
                    {/* <DownloadPdf />
                    <DownloadPdf />        
                    <DownloadPdf />
                    <DownloadPdf /> */}
                </Container> }
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher’s Instructions</h4>
                    <p className={`${classes.instruction}`}>
                        {data?.classDetails?.notes ? data?.classDetails?.notes : "no instruction found" }
                    </p>
                </Container>


                {/* Homework and IDk */}
                <HomeworkDiv cls={classes.small_box} data={data?.homeworkResponse}  />
                <Container cls={`${classes.inner_box} ${classes.small_box} ${data?.taskResponse?.length > 0 ? classes.my_tamy_task_containersks : classes.my_tasks2}`}>
                    <h4 className={classes.secondary_heading}>Task Information</h4>
                    <TasksMap cls={classes.my_tasks} data={data?.taskResponse} func={getUpcomingData} />
                </Container>
                <Container cls={`${classes.inner_box}  ${classes.widthh}`} >
                    <div>
                    <h4 className={classes.secondary_heading}>Rate Your Teacher</h4>
                    <RatingCard data={data?.teacherRatings} readonly={true} p={'Rate Teacher By Selecting From 1 to 5 Stars To Express your Views'} />
                    </div>
                  <div>
                  <h4 className={classes.secondary_heading}>Rate this Class</h4>
                    <RatingCard data={data?.ratingsResponse} readonly={true} p={'Rate This Class By Selecting From 1 to 5 Stars To Express your Views'}/>
                  </div>
                </Container>
                {/* <Container cls={`${classes.inner_box}  ${classes.widthh}`} >
                    <h4 className={classes.secondary_heading}>Rate this Class</h4>
                    <RatingCard data={data?.ratingsResponse} readonly={true} p={"Rate This Class By Selecting From 1 to 5 Stars To Express your Views"}/>
                </Container> */}


{/* 
                <div className={`${classes.inner_box} ${classes.my_upcoming_classes}`}>
                    <h4 className={classes.secondary_heading}>Pricing Section</h4>
                    <UpcomingClassCard />
                      
                </div> */}
             
            </div>
            {show && <QuoteModal isPopup={show} popupFunc={setShow} func={getUpcomingData}  data1={data} />}
        </React.Fragment>
    )
}

export default PastClassDetail
