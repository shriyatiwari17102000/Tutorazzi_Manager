import React, { useState } from 'react'
import classes from './Student_Sidebar.module.css'

const Student_Sidebar = (props) => {

    const [num, setNum] = useState(0)

    const previewContent = (value) => {
        setNum(value)
        props.drillFunc(value)
    }

    return (
        <React.Fragment>
            <ul className={classes.middle}>
                <li onClick={()=>previewContent(0)} className={`${classes.link} ${num === 0 ? classes.active : ''}`}>
                    Profile
                </li>
                <li onClick={()=>previewContent(1)} className={`${classes.link} ${num === 1 ? classes.active : ''}`}>
                    Schedule
                </li>
                <li onClick={()=>previewContent(2)} className={`${classes.link} ${num === 2 ? classes.active : ''}`}>
                    Classes
                </li>
                <li onClick={()=>previewContent(3)} className={`${classes.link} ${num === 3 ? classes.active : ''}`}>
                    Report
                </li>
                <li onClick={()=>previewContent(4)} className={`${classes.link} ${num === 4 ? classes.active : ''}`}>
                    Homework
                </li>
                <li onClick={()=>previewContent(5)} className={`${classes.link} ${num === 5 ? classes.active : ''}`}>
                    Resources
                </li>
            </ul>
        </React.Fragment>
    )
}

export default Student_Sidebar