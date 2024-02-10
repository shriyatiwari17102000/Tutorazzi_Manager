import React from 'react'
import Container from '../../UI/Container/Container'
import classes from './PaymentCard.module.css'
import { Link } from 'react-router-dom'

const PaymentCard = (props) => {
    return (
        <Container cls={`${classes.card} ${props.cls} `}>
            <div className={`${classes.row} ${props.details && classes.details}`}>
                <div className={classes.h2_con}>
                    <h2>5100</h2>
                    <span className={`${classes.span} ${classes.green}`}>Paid</span>
                </div>
                <div className={classes.h2_con}>
                    <h6>Transaction No</h6>
                    <span className={classes.span}>TC82672356292905</span>
                </div>
            </div>
            <h6>20/8/2023</h6>
            {!props.details && <h6>Student : <Link>Nishant Choudhary</Link> </h6>}
            <div className={classes.row}>
                <h6>5 x class of Mathematics</h6>
                {!props.details && <Link className={classes.link} to={'details'}>View Details</Link>}
            </div>
            {props.children}
        </Container>
    )
}

export default PaymentCard
