import React from 'react'
import { Link } from 'react-router-dom'
import ClassCard from '../../Components/ClassCard/ClassCard'
import classes from './ClassCardCon.module.css'
import NewPagination from '../../Components/NewPagination/NewPagination'
import CardDiv from '../../Components/ClassCard/CardDiv'
const CardCon = props => {
console.log(props)
    const { data } = props
    console.log(data)

    return (
        <div className={`${classes.container} ${props.cls}`} >
            {data?.length > 0 ? <div >
                {data?.map(element => (
                <div className={classes.link} >
                    <CardDiv data={element} status={props.status} />
                </div>
            ))}
             <NewPagination {...props.paginationProps} />
            </div> : "No data found!" }
        </div>
    )
}

export default CardCon
