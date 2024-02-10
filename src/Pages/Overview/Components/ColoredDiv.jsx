import React from 'react'
import { Link } from 'react-router-dom'
import classes from './OComp.module.css'
const ColoredDiv = ({bg,cls,link,p,h1}) => {
  return (
    <Link style={{background:bg}} className={`${cls} ${classes.my_colored_div}`} to={link}>
        <p>{p}</p>
        <h1>{h1}</h1>
    </Link>
  )
}

export default ColoredDiv
