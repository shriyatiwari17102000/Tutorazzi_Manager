import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import classes from './ClassesDetail.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link, useParams } from 'react-router-dom'
import img from '../../../assets/ins.png'
import DownloadPdf from '../../../Components/DownloadPdf/DownloadPdf'
import UpcomingClassCard from '../../../Components/UpcomingClassCard/UpcomingClassCard'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'
import moment from 'moment'
import RescheduleClasses from '../../../Components/AllModals/RescheduleModal copy/RescheduleClasses'


const UpcomingClassDetail = () => {
    const [popup, setPop] = useState(false)
    const [data, setData] = useState([])
    const {id} = useParams()
    console.log(id)
    const popupHandler = () => {
        setPop(!popup) 
    }
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getUpcomingData = async() => {

        let register = `${BASE_URL}/upcoming-class-details?class_id=${id}`
        let res = await axios.get(register, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          console.log(res.data.data)
          setData(res.data.data)
    }
// moment(data.classDetails.start_date)
    useEffect(()=>{
        getUpcomingData()
    },[])
    return (
        <React.Fragment>
            <Heading heading={'Upcoming Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
                <BlackButton func={popupHandler} funcVal={popup} cls={classes.btn}>Reschedule</BlackButton>
            </Heading>
            <div className={classes.box}>
                <Container cls={classes.header}>
                    <div className={classes.header_right}>
                        <div className={classes.header_right_profile}>P</div>
                        <div className={classes.header_right_inner}>
                            {/* <h4 className={classes.secondary_heading}>Mathematics Class</h4>
                            <h5>10:30 Am to 12:30 Pm</h5>
                            <h5>Tuesday 20 Jun 2023</h5> */}
                            <h4 className={classes.secondary_heading}>{data?.classDetails?.subject_name} Class</h4>
                            <h5> <Moment format="hh:mm A">{data?.classDetails?.start_time}</Moment> to <Moment format="hh:mm A">{data?.classDetails?.end_time}</Moment> </h5>
                            <h5><Moment format="DD/MM/YYYY">{data?.classDetails?.start_time}</Moment></h5>
                        </div>
                    </div>
                    <button className={classes.header_btn}>Set Reminder</button>
                </Container>
                <Container cls={classes.inner_box}>
                    <h4 className={classes.secondary_heading}>Description</h4>
                    <p className={classes.page_para}>
                        {data?.classDetails?.details ? data?.classDetails?.details : "no data found"}
                    </p>
                   
                </Container>
                <Container cls={`${classes.small_box} ${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher's Details</h4>
                    <UserDiv data={data?.teacherDetails}>
                        <Link className={classes.link} to="/">View Profile</Link>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.small_box} ${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Student's Details</h4>
                    <UserDiv data={data?.classDetails?.student_id} curr={data?.studentDetails?.curriculum}>
                        <Link className={classes.link} to="/">View Profile</Link>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher’s Instructions</h4>
                  {data?.classDetails?.notes ?  data?.classDetails?.notes : <div><img className={classes.my_img} src={img} alt="" />
                    <p className={`${classes.page_para} ${classes.text_center}`}>No Information available from Teacher</p></div>}
                </Container>
                {/* <div className={`${classes.inner_box} ${classes.my_upcoming_classes}`}>
                    <h4 className={classes.secondary_heading}>My Upcoming Classes</h4>
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                </div> */}
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Class Resources</h4>
                    {data?.classDetails?.materials_url.map((item, index) => (
                        <DownloadPdf item={item} />
                    ))}
                    {/* <DownloadPdf />
                    <DownloadPdf />
                    <DownloadPdf />
                    <DownloadPdf /> */}
                </Container>
            </div>
            {popup && <RescheduleClasses isPopup={popup} popupFunc={setPop} func={getUpcomingData} data1={data} />}
        </React.Fragment>
    )
}

export default UpcomingClassDetail
