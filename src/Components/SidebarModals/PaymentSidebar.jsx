import React from 'react'
import classes from './SidebarModals.module.css'
import Container from '../../UI/Container/Container'

const classDetails = [
    {
        title: 'Class Name',
        value: 'Maths'
    },
    {
        title: 'Agenda',
        value: 'Complete chapter 1'
    },
    {
        title: 'Time',
        value: '10:00 AM To 10:30AM'
    },
    {
        title: 'Date',
        value: '24/04/2023'
    },
]


const payouts = [
    {
        title: 'Class Pay',
        value: '₹ 5,000'
    },
    {
        title: 'Tax',
        value: '₹ 5,000'
    },
    {
        title: 'Other Deduction',
        value: '₹ 5,000'
    },
    {
        title: 'Addition',
        value: '₹ 5,000'
    },
    {
        title: 'Total',
        value: '₹ 5,000'
    },
]


const PaymentSidebar = () => {

    const CopiableDiv = (props) => {
        return (
            <>
                <h4 className={classes.heading}>{props.heading}</h4>
                <Container cls={classes.copiable_div}>
                    <span>{props.id}</span>
                    <button>Copy</button>
                </Container>
            </>
        )
    }

    const FlexDiv = (props) => {
        return (
            <div className={`${classes.flex_div} ${props.cls}`}>
                <span>{props.title}</span>
                <span>{props.value}</span>
            </div>
        )
    }


    return (
        <React.Fragment>
            <CopiableDiv heading={'Transaction ID'} id={'TXCSID804982839'} />
            <CopiableDiv heading={'Reference Number'} id={'REF948349JHSJK8'} />
            <div className={classes.box}>
                <h4 className={classes.heading}>Class Details</h4>
                {classDetails.map((element, index) => (
                    <FlexDiv key={index} title={element.title} value={element.value} />
                ))}
            </div>
            <div className={classes.box}>
                <h4 className={classes.heading}>Payout Details</h4>
                {payouts.map((element, index) => (
                    <FlexDiv key={index} title={element.title} value={element.value} />
                ))}
            </div>
        </React.Fragment>
    )
}

export default PaymentSidebar