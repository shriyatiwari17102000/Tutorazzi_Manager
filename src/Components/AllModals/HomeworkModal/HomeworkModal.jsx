import React from 'react'
import classes from './HomeworkModal.module.css'
import Modal from '../../Modal/Modal'
import BlackButton from '../../BlackButton/BlackButton'
import Heading from '../../Heading/Heading'
import LabelledInput from '../../LabelledInput/LabelledInput'

const HomeworkModal = (props) => {
    return (
        <Modal cls={classes.popup} value={props.isPopup} Func={props.popupFunc}>
            <Heading heading={'Add Homework'} p={'You can add homework for student'} />

            <div className={classes.body}>
                <LabelledInput id={'subject'} label={'Subject'} />
                <LabelledInput id={'details'} label={'Details'} />
                <LabelledInput id={'start_date'} label={'Start Date'} type={'date'} />
                <LabelledInput id={'end_date'} label={'End Date'} type={'date'} />
            </div>

            <div className={classes.bottom}>
                <button>Cancel</button>
                <BlackButton>Add Homework</BlackButton>
            </div>
        </Modal>
    )
}

export default HomeworkModal