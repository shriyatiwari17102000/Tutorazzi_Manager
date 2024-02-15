import React from 'react'
import Container from '../../UI/Container/Container'
import classes from './PaymentCard.module.css'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const PaymentCard = (props) => {
    const { data } = props
    console.log(!props.det)
    return (
        <Container cls={`${classes.card} ${props.cls} `}>
            <div className={`${classes.row} ${props.details && classes.details}`}>
                <div className={classes.h2_con}>
                    <h2>₹{data?.net_amount}</h2>
                 {data?.status === "Pending" &&    <span className={`${classes.span} ${classes.red}`}>{data?.status}</span>}
                 {data?.status === "Paid" &&    <span className={`${classes.span} ${classes.green}`}>{data?.status}</span>}
                </div>
                {data?.trx_ref_no && <div className={classes.h2_con}>
                    <h6>Transaction No</h6>
                    <span className={classes.span}>#{data?.trx_ref_no}</span>
                </div>}
            </div>
            <h6><Moment format="DD/MM/YYYY">{data?.payment_date ? data?.payment_date : data?.createdAt }</Moment></h6>
            {/* {!props.details && <h6>Student : <Link>Nishant Choudhary</Link> </h6>} */}
            {data?.quote_id && <div className={classes.row}>
                {data?.quote_id?.class_count && <h6>{data?.quote_id?.class_count} x class of {data?.quote_id?.subject_name}</h6>}
                {props.det != false && data?.status == "Paid" && <Link className={classes.link} to={`/payment/details/${data?._id}`}  // id
                >View Details</Link>}

            </div>}
            {!data?.quote_id && props.det != false && <div className={classes.row1}><Link className={classes.link} to={`/payment/details/${data?._id}`}  // id
            >View Details</Link></div>}
            {/* // } */}
            {props.children}
        </Container>
    )
}

export default PaymentCard
