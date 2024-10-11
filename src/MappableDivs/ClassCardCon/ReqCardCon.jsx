import React from 'react'
import { Link } from 'react-router-dom'
import ClassCard from '../../Components/ClassCard/ClassCard'
import classes from './ClassCardCon.module.css'
import NewPagination from '../../Components/NewPagination/NewPagination'
import CardDiv from '../../Components/ClassCard/CardDiv'
import RequestedClassCard from '../../Components/ClassCard/RequestedClassCard'
const ReqCardCon = props => {
    console.log(props)
    const { data } = props
    console.log(data)

    return (
        <div className={`${classes.container} ${props.cls}`} >
            {data?.length > 0 ? <div >
                {data?.map((element, index) => (
                    <div className={classes.link} >
                        <RequestedClassCard func={props?.func} key={index} data1={element} />
                    </div>
                ))}
                <NewPagination {...props.paginationProps} />
            </div> : "No data found!"}
        </div>
    )
}

export default ReqCardCon
