import React from 'react'
import classes from "./Support.module.css"
import { useNavigate } from 'react-router-dom'
import Moment from 'react-moment'

const SupportCard = (props) => {
  const { data } = props
  console.log(data)
  const navigate = useNavigate()
  const handleNavigate = (id) => {
    console.log(`/support/details/${id}`)
    navigate(`/support/details/${id}`)
  }
  return (
    <div className={classes.card} onClick={() => handleNavigate(data._id)}>
      <div>
        <h5 className={classes.h6}>{data?.subject} {data?.responseLength > 0 && (
          <span className={classes.span}>
          {data?.responseLength}
      </span>
        )}</h5>
        <p className={classes.p}><Moment format="DD/MM/YYYY">{data.createdAt}</Moment></p>
      </div>
      {data?.status == "Pending" && <button className={classes.open}>Open</button>}
      {data?.status == "Resolved" && <button className={classes.closed}>Closed</button>}
    </div>
  )
}

export default SupportCard