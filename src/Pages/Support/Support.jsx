import React, { useState } from 'react'
import classes from './Support.module.css'
import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon'
import Heading from '../../Components/Heading/Heading'
import BlackButton from '../../Components/BlackButton/BlackButton'
import SupportFoldContainer from '../../Components/AllFolds/Support/SupportFoldContainer'
import Pagination from '../../Components/Pagination/Pagination'


const data = [
    {
        h1: '35',
        p: 'New Trial Class Request',
        color: '#BCCFFF',
        icon: 'a',
        bg: '#DBE5FF',
        link: ''
    },
    {
        h1: '35',
        p: 'Reschedule Request',
        color: '#FFE198',
        icon: 'b',
        bg: '#FFF3D6',
        link: ''
    }]

const Support = () => {

    const [num,setNum] = useState(1)

    const btnsHandler = num => {
        setNum(num)
    }

    return (
        <React.Fragment>
            <DataDivCon data={data} cls={classes.data_div_con} />
            <Heading heading={'Support'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
                <BlackButton cls={classes.black_btn} >Add Ticket</BlackButton>
            </Heading>
            <div className={classes.btns}>
                <button className={num===1 ? classes.active : ''} onClick={()=>btnsHandler(1)}>All Tickets</button>
                <button className={num===2 ? classes.active : ''} onClick={()=>btnsHandler(2)}>Resolved Ticket</button>
                <button className={num===3 ? classes.active : ''} onClick={()=>btnsHandler(3)}>Past Ticket</button>
            </div>


            <SupportFoldContainer />

            <Pagination />

        </React.Fragment>
    )
}

export default Support
