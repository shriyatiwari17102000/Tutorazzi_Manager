import React from 'react'
import { Link } from 'react-router-dom'
import classes from './TicketComp.module.css'
const TicketComp = () => {
  return (
    <Link className={classes.card} to={''}>
      <h3 className={classes.card_title}>#721B</h3>
      <p className={classes.card_detail}>Give me some help in admissions</p>
      <p className={`${classes.status} ${classes.green}`}>Mark Resolved</p>
      <p className={classes.date}>Date : 20/8/2023</p>
    </Link>
  )
}

export default TicketComp
