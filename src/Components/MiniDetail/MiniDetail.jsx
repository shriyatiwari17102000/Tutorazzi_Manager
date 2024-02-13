import React from 'react'
import classes from './MiniDetail.module.css'

const MiniDetail = ({data}) => { 
  // console.log(data, "ffgfg")

  return (
    <div className={classes.div}>
      {data?.exp && <h5>{data.exp} year of experience</h5> }
      {data?.name && <h5>{data.name}</h5>}
      {data?.subject && <h5>{data.subject}</h5>}
        
        {data.start_year && <p>{data.start_year} - {data.end_year}</p>}
    {data.curriculum &&     <p>{data.curriculum} Curriculum</p>}
    {data.subject_curriculum &&     <p>{data.subject_curriculum} Curriculum</p>}
        {data.college && <p>{data.college}</p>}
    </div>
  )
}

export default MiniDetail
