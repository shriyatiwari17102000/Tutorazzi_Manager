import React from 'react'
import Heading from '../../../Components/Heading/Heading'
import ListCalendar from '../../../Components/ListCalendar/ListCalendar'

const StudentSchedule = () => {
  return (
    <React.Fragment>
      <Heading heading={'Student Schedule'} />
      <ListCalendar />
    </React.Fragment>
  )
}

export default StudentSchedule