import React from 'react'
import classes from "./Dash.module.css"
import Moment from 'react-moment'

const TrialBelow = (props) => {
    // console.log(props.data)
    const { data } = props
    return (
        <div className={`${classes.cont}`} style={{border:"1px solid #d9d9d9"}}>
            <div className={classes.inn_div}>
                <h4>{data?.subject?.name}</h4>
                <div className={classes.btn_div}>
                    <button className={classes.tab} >Trial</button>
                    {props.status == "liked" && <button className={classes.like_btn}>Liked</button>}
                    {props?.status == "disliked" && <button className={classes.dislike_btn}>Disliked</button>}
                </div>
            </div>

            {data?.start_time && data?.end_time && <div className={classes.btn_div}>
                <p style={{ fontSize: '14px' }}><Moment format="DD/MM/YYYY">{data?.start_time}</Moment></p>
                <p className={classes.p1} style={{ marginBottom: "10px" }}> <Moment format="hh:mm A">{data?.start_time}</Moment> to <Moment format="hh:mm A">{data?.end_time}</Moment></p></div>}
            <div style={{ display: "flex", gap: "15px" }}>
                <p className={classes.p1} style={{ fontSize: "13px", fontWeight: "500" }}>Student : <span>{data?.student_name}</span></p>
                <p className={classes.p1} style={{ fontSize: "13px", fontWeight: "500" }}>Teacher : <span>{data?.teacher_name}</span></p>
            </div>

            {props?.comment && <div>
                <h5 style={{ marginBlock: "15px 20px", fontSize: "15px" }}>Comments</h5>
                <p className={classes.p1} style={{ fontSize: "13px", fontWeight: "500" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloribus itaque debitis assumenda qui id odio dicta eligendi obcaecati asperiores?

                </p>

            </div>}



        </div>
    )
}

export default TrialBelow