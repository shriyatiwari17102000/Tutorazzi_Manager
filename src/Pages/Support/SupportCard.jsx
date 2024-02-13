import React from 'react'
import classes from "./Support.module.css"
import { useNavigate } from 'react-router-dom'

const SupportCard = (props) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('details')
    }
  return (
    <div className={classes.card} onClick={handleNavigate}>
        <div>
            <h5 className={classes.h6}>Topic <span className={classes.span}>3</span></h5> 
            <p className={classes.p}>20/08/2024</p>
        </div>
        {props.open && <button className={classes.open}>Open</button>}
        {props.closed && <button className={classes.closed}>Closed</button>}
    </div>
  )
}

export default SupportCard