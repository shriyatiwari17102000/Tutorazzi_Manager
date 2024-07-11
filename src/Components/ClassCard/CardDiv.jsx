import React, { useState } from 'react'
import classes from './ClassCard.module.css'
import Container from '../../UI/Container/Container'
import Moment from 'react-moment'

const CardDiv = (props) => {

    const data = props.data
    return (
        <>
            <Container cls={`${classes.card} ${props.cls}`}>
                <div className={classes.card_data}>
                    <h3>{data?.subject_name || data?.class_id?.subject_name} {data?.alert && <span className={classes.red_span}>{data?.alert}</span>}</h3>
                    <>
                        <div className={classes.flex}>
                            {data?.start_time && (
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <p><Moment format="hh:mm A">{data.start_time}</Moment>  &</p><p><Moment format="hh:mm A">{data.end_time}</Moment></p></div>
                            )}
                         {data?.start_time &&    <p><Moment format='DD/MM/YYYY'>{data.start_time}</Moment></p>}
                        </div>
                        <div className={classes.flex}>
                            <p>Teacher : <span>{data.teacher_name}</span></p>
                            <p>Student : <span>{data.student_name}</span></p>
                        </div>
                    </>
                </div>

                <div className={classes.btn_container}>
                    <button className={`${classes.btn} ${classes.reschedule}`}>Missed</button>
                </div>
            </Container>


        </>
    )
}

export default CardDiv