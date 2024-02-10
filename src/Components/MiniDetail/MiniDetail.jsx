import React from 'react'
import classes from './MiniDetail.module.css'

const MiniDetail = ({data}) => { 

  return (
    <div className={classes.div}>
        <h5>{data.title}</h5>
        <p>2{data.d1}</p>
        <p>{data.d2}</p>
    </div>
  )
}

export default MiniDetail
