import React, { Fragment } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './TeacherDetails.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import LabelledInput from '../../../Components/LabelledInput/LabelledInput'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import MiniDetail from '../../../Components/MiniDetail/MiniDetail'
import TicketComp from '../../../Components/TicketComp/TicketComp'


const perosnal_info = [
    {
        label: "First Name",
        id: 'fn',
        value: 'Puneet'
    },
    {
        label: "Last Name",
        id: 'ln',
        value: 'Shrivastav'
    },
    {
        label: "Email",
        id: 'em',
        value: 'psri@gmail.com'
    },
    {
        label: "Mobile",
        id: 'mob',
        value: '9311676139'
    },
    {
        label: "Parent Email id",
        id: 'em2',
        value: 'Shrivastav@gmail.com'
    },
    {
        label: "Parent Phone Number",
        id: 'mob2',
        value: '12329293993'
    },
    {
        label: "Grade",
        id: 'gr',
        value: 'A'
    },
    {
        label: "City",
        id: 'city',
        value: 'New Delhi'
    },
    {
        label: "Standard",
        id: 'standard',
        value: '12th'
    },
    {
        label: "Address",
        id: 's1',
        value: 'CA 76 D Hari Nagar New Delhi'
    }
]

const curruiculam_info = [
    {
        label: 'Curriculum',
        id: 'Curriculum',
        value: 'Curriculum'
    },
    {
        label: 'Grade',
        id: 'Grade',
        value: 'Grade'
    },
    {
        label: 'Subject 1',
        id: 'Subject 1',
        value: 'Subject 1'
    },
    {
        label: 'Subject 2',
        id: 'Subject 2',
        value: 'Subject 2'
    },
    {
        label: 'Subject 3',
        id: 'Subject 3',
        value: 'Subject 3'
    },
    {
        label: 'Subject 4',
        id: 'Subject 4',
        value: 'Subject 4'
    },
]

const class_info = [
    {
        label: 'Class Name',
        id: 'classname',
        value: 'Science'
    },
    {
        label: 'Class Per Hour',
        id: 'cph',
        value: '2'
    },
    {
        label: 'Teacher Name',
        id: 'tn',
        value: 'Puneet Shrivastav'
    },
    {
        label: 'No of Hours',
        id: 'noh',
        value: '1'
    },
    {
        label: 'Start Date',
        id: 'sd',
        value: '20/8/2023'
    },
]

const degree_data = [
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
    {
        title:'Bsc (Bachelors Of Science)',
        d1:'2008 - 2011',
        d2:'Bits Pilani, Delhi'
    },
]

const TeacherDetails = () => {
    return (
        <Fragment>
            <Heading heading={'Teachers Profile'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
                <BlackButton cls={classes.btn}>See His Classes</BlackButton>
            </Heading>
            <div className={classes.grid}>
                <Container cls={classes.inner_box_1}>
                    <UserDiv data={{ name: 'Puneet', rank: 'Rookie', rating: '4.5' }} />
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>36</h1>
                        <p>Upcoming Classes</p>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>36</h1>
                        <p>Past Classes</p>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>₹60k</h1>
                        <p>Total Revenue</p>
                    </div>
                </Container>

                <Container cls={classes.inner_box_2} >
                    <h4 className={classes.heading}>Personal Info</h4>
                    {
                        perosnal_info.map((element, index) => (
                            <LabelledInput key={index} data={element} />
                        ))
                    }
                </Container>

                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Bachelors and masters details</h4>
                    <div className={classes.scroll_box}>
                        {degree_data.map((element,index)=>(
                            <MiniDetail key={index} data={element} />
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Curriculum & subjects</h4>
                    <div className={classes.scroll_box}>
                        {degree_data.map((element,index)=>(
                            <MiniDetail key={index} data={element} />
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_4} >
                    <h4 className={classes.heading}>Experience</h4>
                    <div className={classes.scroll_box}>
                        {degree_data.map((element,index)=>(
                            <div key={index} className={classes.experience}>
                                <MiniDetail key={index} data={element} />
                                <p>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam rem expedita alias cupiditate tempore veniam sequi eos dolorum quaerat a veritatis quidem eum eligendi corrupti dicta error quos provident eaque excepturi, soluta repudiandae repellendus fugit ut! Magni numquam velit impedit! Porro tempore ad quaerat nostrum iste ducimus eum repellat, nemo nisi est exercitationem delectus quidem!
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
                <Container cls={classes.inner_box_5} >
                    <h4 className={classes.heading}>Latest Ticket</h4>
                    <TicketComp />
                    <TicketComp />
                    <TicketComp />
                    <TicketComp />
                </Container>
            </div>
        </Fragment>
    )
}

export default TeacherDetails
