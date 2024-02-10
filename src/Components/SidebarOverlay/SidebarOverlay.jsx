import React from 'react'
import classes from './SidebarOverlay.module.css'
import x from '../../assets/x2.png'
import BlackButton from '../BlackButton/BlackButton'


const SidebarOverlay = (props) => {

    const closeFunction = () => {
        props.sb_func(!props.sb_value)
     }

    return (
        <React.Fragment>
            <div onClick={closeFunction} className={`${classes.backdrop} ${props.sb_value===true?'':classes.dn}`}></div>
            <div className={`${classes.sidebar} ${props.sb_value===true?classes.view:''}`}>
                <div className={classes.header}>
                    <h3>{props.heading}</h3>
                    <img onClick={closeFunction} src={x} alt="cross" />
                </div>
                <div className={classes.body}>
                    {props.children}
                </div>
                <div className={classes.footer}>
                    <button className={classes.btn1}>Cancel</button>
                    <BlackButton className={classes.btn2}>{props.b2}</BlackButton>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SidebarOverlay