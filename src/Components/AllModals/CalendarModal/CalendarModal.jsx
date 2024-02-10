import React from 'react'
import classes from './CalendarModal.module.css'
import Modal from '../../Modal/Modal'
import BlackButton from '../../BlackButton/BlackButton'
import img from '../../../assets/dp1.png'
const CalendarModal = (props) => {
    return (
        <Modal cls={classes.popup} value={props.isPopup} Func={props.popupFunc}>
            <div className={classes.top}>
                <h3>{props.data.title}</h3>
                <div>
                    <span>wed, June 12</span>
                    <span>9:30 Am to 10:30 Am</span>
                </div>
            </div>
            <div className={classes.middle}>
                <h4>Agenda</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores molestias odit necessitatibus distinctio neque assumenda quod minus numquam harum incidunt blanditiis enim, nemo impedit iste.
                </p>
                <h4>Attendees</h4>
                <div>
                    <img src={img} alt="attendees 1" />
                    <img src={img} alt="attendees 1" />
                    <img src={img} alt="attendees 1" />
                    <span>+4 More</span>
                </div>
            </div>
            <div className={classes.bottom}>
                <button>Reschedule</button>
                <BlackButton>Start Meeting Now</BlackButton>
            </div>
        </Modal>
    )
}

export default CalendarModal