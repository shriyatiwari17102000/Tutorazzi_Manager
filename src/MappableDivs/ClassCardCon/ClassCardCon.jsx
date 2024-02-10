import React from 'react'
import { Link } from 'react-router-dom'
import ClassCard from '../../Components/ClassCard/ClassCard'
import classes from './ClassCardCon.module.css'
import NewPagination from '../../Components/NewPagination/NewPagination'
const ClassCardCon = props => {
console.log(props)
    const { data } = props
    console.log(data)

    return (
        <div className={`${classes.container} ${props.cls}`} >
            {data.length > 0 ? <div >
                {data.map(element => (
                <Link className={classes.link} to={`/classes/${props.link}/${element._id}`}>
                    <ClassCard data={element} />
                </Link>
            ))}
             <NewPagination {...props.paginationProps} />
            </div> : "No data found!" }
        </div>
    )
}

export default ClassCardCon
