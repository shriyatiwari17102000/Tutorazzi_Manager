import React from 'react'
import NewPagination from '../../../Components/NewPagination/NewPagination'
import PaymentCard from '../../../Components/PaymentCard/PaymentCard'
import classes from "./StudentDetails.module.css"

const StuPaymentMap = (props) => {
    const { data } = props
    console.log(data)
    return (
        <>
            {data?.length > 0 ?
                <div >
                    {data?.map((item, index) => (
                        <PaymentCard cls={classes.css1} data={item} key={index} />
                    ))
                    }
                    <NewPagination {...props.paginationProps} />
                </div> : "no data found!"}
        </>
    )
}

export default StuPaymentMap