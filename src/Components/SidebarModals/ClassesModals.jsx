import React from 'react'
import classes from './SidebarModals.module.css'
import Container from '../../UI/Container/Container'

const ClassesModals = () => {
    return (
        <React.Fragment>
            <h4 className={classes.heading}>Class Name</h4>
            <Container cls={classes.copiable_div}>
                <span>Mathmatices Class</span>
            </Container>

            <h4 className={classes.heading}>Agenda</h4>
            <Container cls={classes.copiable_div}>
                <span>Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</span>
            </Container>

            <h4 className={classes.heading}>Time and Date</h4>
            <Container cls={classes.copiable_div}>
                <span>12/08/2023 and 10:00 AM to 10:30 AM</span>
            </Container>

            <h4 className={classes.heading}>Attendees</h4>
            <div className={classes.attendees_container}>
                <Container cls={classes.copiable_div}><span>Puneet Shrivastav</span></Container>
                <Container cls={classes.copiable_div}><span>Vipin Jha</span></Container>
                <Container cls={classes.copiable_div}><span>Abhishek Singh</span></Container>
            </div>
            
            <h4 className={classes.heading}>Instructions</h4>
            <Container cls={classes.copiable_div}>
                <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, eum dicta rerum repellendus dolorum id ut, optio porro quaerat, expedita rem officia accusantium.</span>
            </Container>

        </React.Fragment>
    )
}

export default ClassesModals