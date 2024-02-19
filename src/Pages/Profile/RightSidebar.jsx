import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import Container from '../../UI/Container/Container'
import FallbackImage from '../../Components/FallbackImgae/FallbackImage'
import { useNavigate } from 'react-router-dom'

const RightSidebar = ({ stuData, teacData }) => {

    const navigate = useNavigate()
    const navigateStudent = () => {
        navigate('/student')
    }
    const navigateTeacher = () => {
        navigate('/teacher')
    }

    return (
        <React.Fragment>

            <Container cls={classes.cont_main}>
                <div className={classes.teach_div}>
                    <h5>All Teachers</h5>
                    {teacData?.map((item) => (
                        <div className={classes.inn_teach}>
                            <FallbackImage cls={classes.img2} imgData={item.user_id.profile_img_url} />
                            <div className={classes.teach_div2}>
                                <h5>{item.preferred_name}</h5>
                                <p>{item.curriculum.name}</p>
                            </div>
                        </div>
                    ))}


                    <button className={classes.view_btn} onClick={navigateTeacher}>View All</button>

                </div>
                <div className={classes.teach_div} style={{ marginTop: "40px" }}>
                    <h5>All Students</h5>

                    {stuData?.map((item) => (
                        <div className={classes.inn_teach}>
                            <FallbackImage cls={classes.img2} imgData={item.user_id.profile_img_url} />
                            <div className={classes.teach_div2}>
                                <h5>{item.preferred_name}</h5>
                                <p>{item.curriculum.name}</p>
                            </div>
                        </div>
                    ))}
                    <button className={classes.view_btn} onClick={navigateStudent}>View All</button>

                </div>

            </Container>

        </React.Fragment>
    )
}

export default RightSidebar