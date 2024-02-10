import React from 'react'
import classes from './UpcomingClassCard.module.css'
import Container from '../../UI/Container/Container'
import BlackButton from '../BlackButton/BlackButton'

const UpcomingClassCard = () => {
  return (
    <Container cls={classes.card}>
        <h4 className={classes.card_title}>Mathematics Chapter 01: Algebra</h4>
        <div className={classes.card_tags}>
            <span>Science</span>
            <span>By Sharad</span>
        </div>
        <div className={classes.row}>
            <p>Date : 24/07/2023</p>
            <p>8:00 Am to 10:00 Am</p>
        </div>
        <p className={classes.agenda}>Agenda : Algebra chapter 01.... more</p>
        <div className={classes.btns}>
            <button className={classes.cancel_btn}>Join Class</button>
            <BlackButton cls={classes.bb}>Details</BlackButton>
        </div>
    </Container>
  )
}

export default UpcomingClassCard
