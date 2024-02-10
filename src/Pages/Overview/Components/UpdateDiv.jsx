import React from 'react'
import Container from '../../../UI/Container/Container'
import LabelledInput from '../../../Components/LabelledInput/LabelledInput'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import classes from './OComp.module.css'
import img from '../../../assets/updatex.png'

const inputData = {
    type:'text',
    id:'enter-email',
    ph:'Enter the email of your friend'
}

const UpdateDiv = props => {
  return (
    <Container cls={`${props.cls} ${classes.update_div_container}`}>
        <h3 className={classes.heading}>You need to updated your contact info Nishant choudhary !</h3>
        <form className={classes.form}>
            <BlackButton cls={classes.btn} >Update</BlackButton>
        </form>
        <img src={img} className={classes.pos_ab_img} alt="" />
    </Container>
  )
}

export default UpdateDiv
