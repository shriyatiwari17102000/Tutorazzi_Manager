import React from 'react'
import classes from "./Profiles.module.css"
import Moment from 'react-moment'

const EducationCard = (props) => {
    console.log(props.data)
    let data = props?.data
  return (
    <div className={classes.main_div} style={{width:"48%"}}>
        <h3>{data?.name}</h3>
        <p><Moment format="YYYY">{data?.start_year}</Moment>-<Moment format="YYYY">{data?.end_year}</Moment></p>
        <p>{data?.college}</p>
    </div>
  )
}

export default EducationCard