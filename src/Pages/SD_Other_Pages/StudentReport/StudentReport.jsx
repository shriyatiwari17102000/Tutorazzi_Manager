import React from 'react'
import classes from './StudentReport.module.css'
import Heading from '../../../Components/Heading/Heading'
import Tile from '../../../Components/Tile/Tile'
import SubjectsReport from '../../../Components/SubjectsReport/SubjectsReport'

const td1 = [
    {
        h5: 'No of Hour Completed (Last week)',
        h1: '20hr'
    }
]

const td2 = [
    {
        h5:'Montly Goal',
        h1:'5',
        p:'Montly Goals ( Pending )'
    },
    {
        h5:'Montly Goal',
        h1:'5',
        p:'Montly Goals ( Completed )'
    }
]

const StudentReport = () => {
    return (
        <React.Fragment>
            <Heading heading={'Student Report'} btn={'Add Report'} />
            <div className={classes.grid}>
                <Tile data={td1} ></Tile>
                <Tile data={td2} direction={'row'} />
                <Tile data={td2} direction={'row'} />
                <SubjectsReport />
            </div>
        </React.Fragment>
    )
}

export default StudentReport