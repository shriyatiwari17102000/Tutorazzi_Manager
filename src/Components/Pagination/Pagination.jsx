import React, { useState } from 'react'
import classes from './Pagination.module.css'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const Pagination = (props) => {
    const [index, setIndex] = useState(1)

    const prevPage = () => {
        setIndex(prev => {
            return prev - 1
        })
    }
    const nextPage = () => {
        setIndex(prev => {
            return prev + 1
        })
    }

    return (
        <div className={`${classes.container} ${props.cls} d-flex align-items-center justify-content-center column-gap-3 mt-5`}>
            <button onClick={prevPage} disabled={index <= 1 ? true : false} className={`${classes.btn}`}><BiChevronLeft /></button>
            <input type="text" readOnly value={index} />
            <button onClick={nextPage} disabled={index >= 5 ? true : false} className={`${classes.btn}`}><BiChevronRight /></button>
        </div>
    )
}

export default Pagination