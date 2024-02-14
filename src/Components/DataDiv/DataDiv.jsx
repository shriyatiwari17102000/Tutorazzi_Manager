import React from 'react'
import classes from './DataDiv.module.css'
import Container from '../../UI/Container/Container'
import { Link } from 'react-router-dom'

const DataDiv = (props) => {

    const data = props.data

    return (
        <Link to={data.link} style={{background:data.bg}} className={classes.container}>
            {data.icon && <div style={{background:data.color}} className={classes.colored_div}>{data.icon}</div>}
            <h1 className={classes.h1}>{data.h1}</h1>
            <p className={classes.p}>{data.p}</p>
        </Link>
    )
}

export default DataDiv