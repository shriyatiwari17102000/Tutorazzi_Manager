import React from 'react'
import classes from './Heading.module.css'
import BlackButton from '../BlackButton/BlackButton'

const Heading = (props) => {
    return (
        <div className={`${classes.container} ${props.cls}`}>
            <div>
                <h3>{props.heading}</h3>
                <p>{props.p}</p>
            </div>
            {
                props.children
            }
            {props.btn && <BlackButton func={props.btnFunction?props.btnFunction : '' } funcVal={props.btnValue} cls={classes.button}>{props.btn}</BlackButton>}
        </div>
    )
}

export default Heading