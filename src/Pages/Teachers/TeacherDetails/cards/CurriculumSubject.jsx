import React from 'react'
import classes from "./Profiles.module.css"

const CurriculumSubject = (props) => {
    let data = props?.data
    console.log(props)
  return (
    <div className={classes.main_div}>
        <h3>{data?.subject}</h3>
    
        <p>{data?.curriculum + " " + "Curriculum"}</p>
    </div>
  )
}

export default CurriculumSubject