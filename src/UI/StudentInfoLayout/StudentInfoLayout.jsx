import React, { useLayoutEffect } from 'react'
import Container from '../Container/Container'
import classes from './SIL.module.css'
import Student_Sidebar from '../../Components/Student_Sidebar/Student_Sidebar'
import { useLocation } from 'react-router-dom'

const StudentInfoLayout = (props) => {

  return (
    <Container cls={classes.student_layout}>
      <div className={classes.sl_left}>
        <Student_Sidebar drillFunc={props.func} />
      </div>
      <div className={classes.sl_right}>
        {props.children}
      </div>
    </Container>
  )
}

export default StudentInfoLayout