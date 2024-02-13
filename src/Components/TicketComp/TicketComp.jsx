import React from 'react'
import { Link } from 'react-router-dom'
import classes from './TicketComp.module.css'
import Moment from 'react-moment'
const TicketComp = (props) => {
  console.log(props, "dbfhdghfdgh")
  const {data} = props
  return (
    <Link className={classes.card} to={''}>
      <h3 className={classes.card_title}># {data?.ticket_id}</h3>
      <p className={classes.card_detail}>{data?.subject}</p>
     
   {data.status === "Pending" &&    <p className={`${classes.status} ${classes.red}`}>Mark : {data?.status}</p>}
   {data.status === "Resolved" &&    <p className={`${classes.status} ${classes.green}`}>Mark : {data?.status}</p>}
      <p className={classes.date}>Date : <Moment format="DD/MM/YYYY" utc>{data?.createdAt}</Moment></p>
    </Link>
  )
}

export default TicketComp
