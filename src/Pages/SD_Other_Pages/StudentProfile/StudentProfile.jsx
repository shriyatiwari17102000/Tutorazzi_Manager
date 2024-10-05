import React from 'react'
import ProfileDiv from '../../../Components/ProfileDiv/ProfileDiv'
import LabelledInput from '../../../Components/LabelledInput/LabelledInput'
import classes from './StudentProfile.module.css'
import Heading from '../../../Components/Heading/Heading'

const data = [
  {
    label: "First Name",
    id: 'fn',
    value: 'Puneet'
  },
  {
    label: "Last Name",
    id: 'ln',
    value: 'Shrivastav'
  },
  {
    label: "Email",
    id: 'em',
    value: 'psri@gmail.com'
  },
  {
    label: "Mobile",
    id: 'mob',
    value: '9311676139'
  },
  {
    label: "Parent Email id",
    id: 'em2',
    value: 'Shrivastav@gmail.com'
  },
  {
    label: "Parent Phone Number",
    id: 'mob2',
    value: '12329293993'
  },
  // {
  //   label: "Grade",
  //   id: 'gr',
  //   value: 'A'
  // },
  {
    label: "Country",
    id: 'cn',
    value: 'India'
  },
  {
    label: "City",
    id: 'city',
    value: 'New Delhi'
  },
  {
    label: "Standard",
    id: 'standard',
    value: '12th'
  },
  {
    label: "Address",
    id: 's1',
    value: 'CA 76 D Hari Nagar New Delhi'
  }
]

const StudentProfile = () => {

  return (
    <React.Fragment>
      <Heading heading={'Student Profile'} />
      <ProfileDiv />
      <div className={classes.flex}>
        {data.map((element, index) => (
          <LabelledInput key={index} id={element.id} ro={true} label={element.label} value={element.value} />
        ))}
      </div>
    </React.Fragment>
  )
}

export default StudentProfile