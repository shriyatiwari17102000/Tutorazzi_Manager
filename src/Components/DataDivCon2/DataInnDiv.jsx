import React from 'react'
import classes from './Datadiv.module.css'
import { Link } from 'react-router-dom'

const DataInnDiv = (props) => {

    const data = props?.data
    console.log(data.link)

    return (
        <Link to={data.link} style={{background:data.bg}} className={classes.container}>
            {/* <div style={{background:data.color}} className={classes.colored_div}>{data.icon}</div> */}
            <p className={classes.p}>{data?.p}</p>
        <div style={{display:'flex', gap:"20px"}}>
        <div className={classes.divv}>
            <p>{data?.txt}</p>
          <h1 className={classes.h1}>{data?.h1}</h1>
          </div>
          <div  className={classes.divv}>
            <p>Pending</p>
          <h1 className={classes.h1}>{data?.h2}</h1>
          </div>
        </div>
         
        </Link>
    )
}

export default DataInnDiv