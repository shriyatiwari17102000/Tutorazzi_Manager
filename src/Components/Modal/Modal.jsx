import React from 'react'
import classes from './Modal.module.css'
import Container from '../../UI/Container/Container'
import { createPortal } from 'react-dom'
import BlackButton from '../BlackButton/BlackButton'
import Heading from '../Heading/Heading'

const MyModal = props => {
  return <Container cls={`${props.cls} ${classes.modal} ${props.value === true ? classes.visible : ''}`}>
    <div className={classes.body}>
      {props.children}
    </div>
  
  </Container>
}

const MyBackDrop = props => {
  return <div onClick={() => props.Func(false)} className={`${classes.backdrop} ${props.value === true ? classes.visible : ''}`}></div>
}

const Modal = (props) => {
  return (
    <>
      {createPortal(<MyModal Func={props.Func} heading={props.heading} cls={props.cls} p={props.p} children={props.children} />, document.getElementById('modal'))}
      {createPortal(<MyBackDrop Func={props.Func} />, document.getElementById('overlay'))}
    </>
  )
}

export default Modal