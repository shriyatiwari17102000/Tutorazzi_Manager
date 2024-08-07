import React from 'react'
import Modal from '../../Modal/Modal'
import classes from '../RescheduleModal/RescheduleModal.module.css'
import BlackButton from '../../BlackButton/BlackButton'
import Heading from '../../Heading/Heading'
import LabelledInput from '../../LabelledInput/LabelledInput'


const AddClassModal = (props) => {
    return (
        <Modal cls={`${classes.popup}`} value={props.isPopup} Func={props.popupFunc}>
            <div className={classesa.top}>
                <Heading heading={'Add Class'} p={'You can Add a schedule meeting'} />
            </div>

            <div className={classes.body}>
                <LabelledInput id={'booking_with'} label={'Booking With'} />
                <LabelledInput id={'classname'} label={'Class Name'} />
                <LabelledInput id={'date'} label={'Date'} />
                <LabelledInput id={'new_start'} label={'New Start Time'} />
                <LabelledInput id={'new_end'} label={'New End Time'} />
                <LabelledInput id={'attendees'} label={'Add Attendees'} />
                <LabelledInput id={'agenda'} label={'Agenda'} />
                <LabelledInput id={'instructions'} label={'Instructions'} />
            </div>

            <div className={classes.bottom}>
                <button onClick={()=>{props.popupFunc(!props.isPopup)}}>Cancel</button>
                <BlackButton>Add Class</BlackButton>
            </div>
        </Modal>
    )
}

export default AddClassModal