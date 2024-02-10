import React from 'react'
import Foldable from '../../Foldable/Foldable'
import classes from './TaskInfoFold.module.css'
import greenTick from '../../../assets/check-contained.png'
// import BlackButton from '../../BlackButton/BlackButton'

const TaskInfoFold = (props) => {
    return (
        <Foldable open={props.open} cls={classes.fold}>
            <div className={classes.fold_header}>
                <h5>Practice 3 Algebra Exercices</h5>
                <img src={greenTick} alt="" />
            </div>
            <div className={classes.fold_body}>
                <p>Due Date : 20/3/2023</p>
                <div className={classes.btns}>
                    <button>Mark Done</button>
                </div>
            </div>
        </Foldable>
    )
}

export default TaskInfoFold
