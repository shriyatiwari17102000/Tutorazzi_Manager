import React from 'react'
import classes from './PaymentDetails.module.css'
import { Fragment } from 'react'
import Heading from '../../../Components/Heading/Heading'
import PaymentCard from '../../../Components/PaymentCard/PaymentCard'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link } from 'react-router-dom'
import ClassCard from '../../../Components/ClassCard/ClassCard'
const data = [
    {
        id: 1,
        heading: 'Teacher\' Profile',
        name: 'Puneet Shrivastav',
        city: 'Delhi'
    },
    {
        id: 2,
        heading: 'Student\' Profile',
        name: 'Khushi Shrivastav',
        city: 'UK'
    },
]

const data2 = {
    title: 'Maths Class',
    timing: '10:30pam to 11:30am',
    date: '16/07/2023',
    teacher: 'Amanjeet Singh',
    student: 'Puneet Shrivastav',
    tags: ['done']
}

const PaymentDetails = () => {
    return (
        <Fragment>
            <Heading heading={'Payments'} p={'You can see your Payments here and manage them'} />
            <div className={classes.grid}>
                <PaymentCard cls={classes.my_card} details={true}>
                    <div className={classes.flex}>
                        <h6>Reference No.</h6>
                        <span className={classes.gray_span}>Y2672356292905</span>
                    </div>
                </PaymentCard>
                {
                    data.map(element => (
                        <Container key={element.id} cls={classes.inner_box} >
                            <h4 className={classes.heading}>{element.heading}</h4>
                            <UserDiv data={element}>
                                <Link className={classes.link} to="/">View Profile</Link>
                            </UserDiv>
                        </Container>
                    ))
                }
            <Container cls={classes.inner_box_2} >
                <h4 className={classes.heading}>Class Details</h4>
                {/* <ClassCard data={data2} cls={classes.my_class_details} />  */}
            </Container>
            </div>
        </Fragment>
    )
}

export default PaymentDetails
