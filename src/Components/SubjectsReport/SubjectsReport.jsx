import React from 'react'
import classes from './SubjectsReport.module.css'
import tick from '../../assets/check.png'
import Container from '../../UI/Container/Container'
const SubjectsReport = () => {
    return (
        <Container cls={classes.container}>
            <h3 className={classes.heading}>Attend classes subject wise</h3>
            <div className={classes.main_con}>
                <div className={classes.row}>
                    <div></div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                </div>
                <div className={classes.row}>
                    <div className={`${classes.row_title}`}>English</div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span></span></div>
                </div>
                <div className={classes.row}>
                    <div className={`${classes.row_title}`}>Hindi</div>
                    <div><span><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span className={classes.bs}><img src={tick} alt="" /></span></div>
                    <div><span></span></div>
                </div>
               
            </div>
        </Container>
    )
}

export default SubjectsReport