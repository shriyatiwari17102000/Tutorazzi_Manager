import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import classes from './ClassesDetail.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'
import { BiDislike } from 'react-icons/bi'
import { FcLike } from "react-icons/fc";

const TrialClassDetail = () => {
    const[data, setData] = useState([])
    const {id} = useParams()
    console.log(id)
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token
  
    const getData = async () => {
    
      let register = `${BASE_URL}/trial-class-details?class_id=${id}`
      console.log(register)
      let res = await axios.get(register, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.data)
      setData(res.data.data)
    }
    useEffect(() => {
      getData()
    }, [])
    console.log(data?.studentDetails?.curriculum)
    return (
        <React.Fragment>
            <Heading heading={'Trial Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
            </Heading>
            <div className={classes.box}>
                <Container cls={classes.header}>
                    <div className={classes.header_right}>
                        <div className={classes.header_right_profile}>P</div>
                        <div className={classes.header_right_inner}>
                            <h4 className={classes.secondary_heading}>Mathematics Class</h4>
                            <h5> <Moment format="hh:mm A">{data?.classDetails?.start_time}</Moment> to <Moment format="hh:mm A">{data?.classDetails?.end_time}</Moment> </h5>
                            <h5><Moment format="DD/MM/YYYY">{data?.classDetails?.start_time}</Moment></h5>
                        </div>
                    </div>
                    <button className={classes.header_btn}>View Recording</button>
                </Container>
                <Container cls={classes.inner_box}>
                    <h4 className={classes.secondary_heading}>Description</h4>
                    <p className={classes.page_para}>
                       {data?.classDetails?.details ? data?.classDetails?.details : "no data found!"}
                    </p>
                    {/* <p className={classes.page_para}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia tempore veritatis totam optio! Ad sit qui porro aspernatur impedit quam architecto quas enim ratione, beatae eum ea magni fugit voluptatem reiciendis ducimus voluptatibus! Laboriosam eveniet sit quisquam excepturi accusantium sequi incidunt natus quam, ratione, quod velit pariatur a laudantium.
                    </p> */}
                </Container>
                <Container cls={`${classes.inner_box} ${classes.small_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher's Details</h4>
                    <UserDiv data={data?.teacherDetails}>
                        <Link className={classes.link} to="/">View Profile</Link>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.inner_box} ${classes.small_box}`}>
                    <h4 className={classes.secondary_heading}>Student's Details</h4>
                    <UserDiv data={data?.classDetails?.student_id} curr={data?.studentDetails?.curriculum}>
                        <Link className={classes.link} to="/">View Profile</Link>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher’s Instructions</h4>
                    <p className={`${classes.instruction}`}>
                       {data?.classDetails?.notes}
                    </p>
                </Container>
                <Container cls={`${classes.inner_box}`}>
                <div> <div className={classes.trial_css}>
                        <h4 className={classes.secondary_heading}>Class Status</h4><span  >{data?.classDetails?.response === "Disliked" ? <span className={classes.class_status}>Didn't Like <BiDislike /> </span> : <span className={classes.class_status1}> Liked <FcLike /> </span>}</span></div>
                        {data?.classDetails?.reason_disliking &&  <>         <p className={classes.trial_css_p}>Reason why student didn’t like Trial Class</p> <span className={classes.trial_css_span}>{data?.classDetails?.reason_disliking}</span> </>}
               
                    </div>
                    {/* <h4 className={classes.secondary_heading}>Class Status <span className={classes.trial_class_status}>Didn't Like Class</span></h4>
                    <h6 className={classes.trial_class_h6}>Reason why student didn’t like Trial Class</h6>
                    <p className={`${classes.instruction}`}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus odit praesentium quos excepturi eveniet iusto, unde a recusandae saepe delectus nisi quibusdam in tempora iure porro sunt fugit tempore libero nam? Vel veritatis aliquid iusto et ea voluptates nobis ullam voluptatum voluptas? Officiis, quibusdam qui.
                    </p> */}
{/* 
                    <BlackButton cls={classes.trial_class_btn}>Contact Student</BlackButton> */}
                </Container>
            </div>
        </React.Fragment>
    )
}

export default TrialClassDetail
