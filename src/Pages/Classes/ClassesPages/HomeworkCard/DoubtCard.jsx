import React from 'react'
import classes from "./Doubtcard.module.css"
import Moment from 'react-moment'

const DoubtCard = (props) => {
const {data} = props
  return (
    <div className={classes.card}>
    <div className={classes.div1}>
    <p>{data?.title}</p>
    {/* <img src="" alt="" /> */}
    <img style={{height:"20px", width:"20px"}} src={data?.status === "Resolved" ? '/done.png' : '/alert.png'} alt="" />
    </div>
      <p className={classes.p}>Due Date <Moment format='DD/MM/YYYY'>{data?.createdAt}</Moment></p>
     <div className={classes.div2}>
     <p>Student : <span>{data?.class_id?.student_name}</span></p>
     <p>Teacher : <span>{data?.class_id?.teacher_name}</span></p>
     </div>
    </div>
  )
}

export default DoubtCard