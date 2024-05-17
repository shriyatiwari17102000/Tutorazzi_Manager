import React from 'react'
import classes from './UserDiv.module.css'
import dp from '../../assets/dp1.png'

import { FaStar } from "react-icons/fa";
import FallbackImage from '../FallbackImgae/FallbackImage';

const UserDiv = (props) => {
// console.log(props.data)
    const { data } = props
    console.log(data)
    let img1 = data?.user_id?.profile_image_url || data?.profile_image_url
    // console.log(img1)
    return (
        <div className={`${classes.box} ${props.cls}`}>
            <div className={classes.box_right}>
                {data?.rating && <div className={classes.rating}>{data?.rating && data.rating} <FaStar className={classes.star} /></div>}
                <FallbackImage imgData={img1} cls={classes.box_right_profile} />
                <div className={classes.box_right_inner}>
                    {/* <h4 className={classes.secondary_heading}>{data.preferred_name || data.studentResponse.preferred_name }</h4> */}
                    {data?.preferred_name && <h4 className={classes.secondary_heading}>{data?.preferred_name}</h4>}
                    {data?.name && <h4 className={classes.secondary_heading}>{data?.name}</h4>}
                    {data?.studentResponse?.preferred_name && <h4 className={classes.secondary_heading}>{data?.studentResponse?.preferred_name}</h4>}
                    {data?.curriculum && <h5>{data?.curriculum?.name} Curriculum</h5>}
                    {data?.studentResponse && <h5>{data?.studentResponse?.curriculum?.name} Curriculum</h5>}
                    {props?.curr && <h5>{props?.curr?.name} Curriculum</h5>}
                {props?.cit === true && (<div style={{display:"flex"}}>
                    <h5>{props?.citData?.city},  &nbsp;</h5> 
                    <h5> {props?.citData?.state} </h5>
                    </div>)}
                    {data?.total_exp && <h5>{props?.data?.total_exp} year of experience </h5>}
                    {data?.grade && <h5>{data?.grade?.name}</h5>}
                    {data?.rank && <div className={classes.rank}>{data?.rank}</div>}
                </div>
            </div>
            {
                props.children
            }
        </div>
    )
}

export default UserDiv
