import React from 'react'
import classes from "./Dash.module.css"
import Moment from 'react-moment'

const TrialUpcoming = (props) => {
    // console.log(props.data)
    const {data} = props
  return (
    <div className={classes.cont}>
        <div className={classes.inn_div}>
        <h4>{data?.subject?.name}</h4>
        <p style={{fontSize:'14px'}}><Moment format="DD/MM/YYYY">{data?.start_time}</Moment></p>
        </div>
        <div className={classes.inn_div2}>
            <p className={classes.tab}>1hr</p>
           {data.class_type === "Trial" &&  <p className={classes.tab}>Trial</p>}
        </div>
       <p className={classes.p1} style={{marginBottom:"10px"}}> <Moment format="hh:mm A">{data?.start_time}</Moment> to <Moment format="hh:mm A">{data?.end_time}</Moment></p>
       <div style={{display:"flex", gap:"15px"}}>
       <p className={classes.p1} style={{fontSize:"13px", fontWeight:"500"}}>Student : <span>{data?.student_name}</span></p>
       <p className={classes.p1} style={{fontSize:"13px", fontWeight:"500"}}>Teacher : <span>{data?.teacher_name}</span></p>
       </div>
        {props.upcoming && 
        <button className={classes.button}>Accepted</button>}
    </div>
  ) 
}

export default TrialUpcoming