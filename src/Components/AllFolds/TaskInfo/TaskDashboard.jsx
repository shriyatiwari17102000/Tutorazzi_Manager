import React from 'react'
import Foldable from '../../Foldable/Foldable'
import classes from './TaskInfoFold.module.css'
import greenTick from '../../../assets/check-contained.png'
import alert from '../../../assets/alert-triangle.png'
import { useNavigate, useParams } from 'react-router-dom'
import Moment from 'react-moment'
// import BlackButton from '../../BlackButton/BlackButton'

const TaskDashboard = (props) => {
    console.log(props)
    let data = props?.homeworkData
let id = props?.homeworkData?.class_id
// console.log(id)
    const imgSource = props.alert ? alert : greenTick

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/classes/past-details/${id}`)
    }
  
    return (
        <div className={classes.top_div}>
            <div className={classes.fold_header}>
                {data.message ? (
                    <h5>{data.message}</h5>
                ) : (
                    <h5>{data.title}</h5>
                )}
                <img src={imgSource} alt="" />
            </div>
            <div className={classes.fold_body}>
                {props.date && <p>Due Date : <Moment format="DD/MM/YYYY">{data.due_date}</Moment></p>}
                <a className={classes.link} onClick={handleNavigate}>view</a>
              
            </div>
        </div>
       
    )
}

export default TaskDashboard
