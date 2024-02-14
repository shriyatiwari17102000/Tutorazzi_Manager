import React from 'react'
import classes from './BundleCard.module.css'
import Moment from 'react-moment'

const BundleCard = (props) => {
    const {data} = props
    console.log(data)
    return (
        <div className={classes.card}>
            <div>
                <h1>{data?.subject_name} <span className={classes.cls_span}>1 hr</span></h1>
                <div className={classes.flex}>
                <p>Due Date : <><Moment format="DD/MM/YYYY">{data?.start_time}</Moment> </></p>
                    <p><Moment format="hh:mm A">{data?.start_time}</Moment> </p>
                    
                </div>
            </div>
            <div>
                {data.status == "Pending" && (<div className={classes.pen_div}>
                    <button className={classes.don}>Accept</button>
                    <button className={classes.pend}>Reschedule</button></div>)}
                {data.status == "Done" && <button className={classes.don}>Done</button>}
                {data.status == "Scheduled" && <button className={classes.pend}>Schedule</button>}
            </div>
        </div>
    )
}

export default BundleCard