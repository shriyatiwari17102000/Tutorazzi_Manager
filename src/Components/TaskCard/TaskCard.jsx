import React from 'react'
import classes from './TaskCard.module.css'
import Container from '../../UI/Container/Container'
import Moment from 'react-moment'
const TaskCard = props => {
    console.log(props.data)
    return (
        <Container cls={classes.card}>
            <div className={classes.header}>
                <h5>{props?.data?.title}</h5>
                <img src={props?.data?.status === "Done" ? '/done.png' : '/alert.png'} alt="" />
            </div>
            <p className={classes.p}>
              <Moment format="DD/MM/YYYY" utc>{props?.data?.due_date}</Moment>
            </p>

            {props?.data?.status === "Pending" &&
                <button className={classes.btn}>Mark Done</button>}
        </Container>
    )
}

export default TaskCard
