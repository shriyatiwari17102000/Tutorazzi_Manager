import React, { useState } from 'react'
import PagePath from '../../../Components/PagePath/PagePath'

import StudentInfoLayout from '../../../UI/StudentInfoLayout/StudentInfoLayout';
import StudentSchedule from '../../SD_Other_Pages/StudentSchedule/StudentSchedule';
import StudentProfile from '../../SD_Other_Pages/StudentProfile/StudentProfile';
import StudentClasses from '../../SD_Other_Pages/StudentClasses/StudentClasses';
import StudentHomework from '../../SD_Other_Pages/StudentHomework/StudentHomework';
import StudentReport from '../../SD_Other_Pages/StudentReport/StudentReport';
import StudentResouces from '../../SD_Other_Pages/StudentResouces/StudentResouces';

const StudentDetails = () => {

  const [ren, setRen] = useState(0)

  const renderElement = (number) => {
    switch (number) {
      case 0:
        return <StudentProfile />
      case 1:
        return <StudentSchedule />
      case 2:
        return <StudentClasses />
      case 3:
        return <StudentReport />
      case 4:
        return <StudentHomework />
      case 5:
        return <StudentResouces />
    }
  }


  return (
    <React.Fragment>
      <PagePath />
      <StudentInfoLayout func={setRen} >
        {renderElement(ren)}
      </StudentInfoLayout>
    </React.Fragment>
  )
}

export default StudentDetails