import React from 'react'
import Foldable from '../../Foldable/Foldable'
import classes from './Homework.module.css'
import greenTick from '../../../assets/check-contained.png'
import BlackButton from '../../BlackButton/BlackButton'
import Moment from 'react-moment'

const HomeworkFold = (props) => {
    const {data} = props
    console.log(data)
    return (
        <Foldable open={props.open} cls={classes.fold}>
            <div className={classes.fold_header}>
                <h5>{data?.title}</h5>
                <img src={greenTick} alt="" />
            </div>
            <div className={classes.fold_body}>
                <p>Due Date : <Moment format="DD/MM/YYYY" utc>{data?.due_date}</Moment></p>
                <p>
              {data?.description}
                </p>
                <div className={classes.btns}>
                    <button>Download Homework</button>
                    <BlackButton >Re-Upload Request</BlackButton>
                </div>
            </div>
        </Foldable>
    )
}

export default HomeworkFold
