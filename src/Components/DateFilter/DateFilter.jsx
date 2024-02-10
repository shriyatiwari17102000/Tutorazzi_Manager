import React from 'react'
import Container from '../../UI/Container/Container'
import classes from './DateFilter.module.css'
import cal from '../../assets/cal.png'

const DateFilter = (props) => {
  return (
    <Container cls={`${classes.container} ${props.cls}`}>
        <label htmlFor="date">Date</label>
        <input type="date" hidden id='date' />
        <img src={cal} alt="" />
    </Container>
  )
}

export default DateFilter