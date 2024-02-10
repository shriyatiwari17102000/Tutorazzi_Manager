import React, { useState } from 'react'
import classes from './StudentClasses.module.css'
import FilterButton from '../../../Components/FilterButton/FilterButton'
import ClassCardContainer from '../../../UI/ClassCardContainer/ClassCardContainer'
import Heading from '../../../Components/Heading/Heading'

const d1 = [
  {
    title: 'Maths Class',
    agenda: 'Discreate Maths Chapter 1 ',
    status: 'Pending',
    timing: '10:30pam to 11:30am',
    date: '16/07/2023'
  },
  {
    title: 'Computer Class',
    agenda: 'Data Stuctures Chapter 1 ',
    status: 'Completed',
    timing: '11:30pam to 12:30am',
    date: '17/07/2023'
  },
  {
    title: 'Maths Class',
    agenda: 'Discreate Maths Chapter 2 ',
    status: 'Accepted',
    timing: '10:30pam to 11:30am',
    date: '18/07/2023'
  },

]

const StudentClasses = () => {
  const [num, setNum] = useState(1)

  const renderSection = (value) => {
    switch (value) {
      case 1:
        return <ClassCardContainer data={d1} />
      case 2:
        return <><h2>world</h2></>
    }
  }

  return (
    <React.Fragment>
      <Heading heading={'Student Classes'} />
      <div className={classes.button_con}>
        <button className={`${num === 1 ? classes.active_btn : ""}`} onClick={() => setNum(1)}>Upcoming Classes</button>
        <button className={`${num === 2 ? classes.active_btn : ""}`} onClick={() => setNum(2)}>Completed Classes</button>
      </div>
      <FilterButton cls={classes.filter_btn} />
      {
        renderSection(num)
      }
    </React.Fragment>
  )
}

export default StudentClasses