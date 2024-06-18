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
        <p style={{fontSize:'14px'}}>20 July</p>
        </div>
        <div className={classes.inn_div2}>
            <p className={classes.tab}>1hr</p>
           {data.class_type === "Trial" &&  <p className={classes.tab}>Trial</p>}
        </div>
       <p className={classes.p1} style={{marginBottom:"10px"}}> <Moment format="hh:mm A">{data?.start_time}</Moment> to <Moment format="hh:mm A">{data?.end_time}</Moment></p>
       <div>
       <p className={classes.p1}>Student : <span>{data?.student_name}</span></p>
       <p className={classes.p1}>Teacher : <span>{data?.student_name}</span></p>
       </div>
        {props.upcoming && 
        <button className={classes.button}>Accepted</button>}
    </div>
  ) 
}

export default TrialUpcoming