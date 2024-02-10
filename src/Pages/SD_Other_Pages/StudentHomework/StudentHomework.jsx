import React, { useState } from 'react'
import classes from './StudentHomework.module.css'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import LabelledInput from '../../../Components/LabelledInput/LabelledInput'
import HomeworkCollapsible from '../../../Components/HomeworkCollapsible/HomeworkCollapsible'
import Heading from '../../../Components/Heading/Heading'
import HomeworkModal from '../../../Components/AllModals/HomeworkModal/HomeworkModal'

const StudentHomework = () => {

  const [popup,setPop] = useState(false)

  return (
    <React.Fragment>
      <Heading btn={'Add Homework'} btnFunction={setPop} btnValue={popup} heading={'Student Homework'} />
      <div className={classes.header}>
        <LabelledInput label={'Select Date'} id={'date'} type={'date'} />
        {/* <BlackButton cls={classes.add_homework}>Add Homework</BlackButton> */}
      </div>
      <div className={classes.card_container}>
        <HomeworkCollapsible />
        <HomeworkCollapsible />
        <HomeworkCollapsible />
        <HomeworkCollapsible />
        <HomeworkCollapsible />
      </div>


      <HomeworkModal isPopup={popup} popupFunc={setPop} />

    </React.Fragment>
  )
}

export default StudentHomework