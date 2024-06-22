import React, { useEffect, useState } from 'react'
import classes from './Classes.module.css'
import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon'
// import New from './New'
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../Apis/BaseUrl';
import axios from 'axios';
import DataDivCon2 from '../../Components/DataDivCon2/DataDivCon2';

// const data = [
//   {
//     h1: '35',
//     p: 'New Trial Class Request',
//     color: '#BCCFFF',
//     icon: 'a',
//     bg: '#DBE5FF',
//     link:'trial-request'
//   },
//   {
//     h1: '35',
//     p: 'Reschedule Request',
//     color: '#FF9191',
//     icon: 'b',
//     bg: '#FFACAC',
//     link:'reschedule-request'
//   },
//   {
//     h1: '35',
//     p: 'Resources Requests',
//     color: '#B5FFB8',
//     icon: 'c',
//     bg: '#DAFFDB',
//     link:'resource-request'
//   },
//   {
//     h1: '35',
//     p: 'Homework Requests',
//     color: '#FFD28F',
//     icon: 'd',
//     bg: 'rgb(248 174 210)',
//     link:'homework-request'
//   },
  // {
  //   h1: '35',
  //   p: 'Doubt Requests',
  //   color: '#FFD28F',
  //   icon: 'd',
  //   bg: '#FFE7C2',
  //   link:'homework-request'
  // },
// ]

const data = [
  {
    h1: 0,
    h2: 0,
    p: 'Trial Class Request',
    // color: '#BCCFFF',
    // icon: 'a',
    bg: 'rgba(243, 244, 255, 1)',
    key: 'trialRequests',
    txt: "Accepted",
    link:'trial-request'
  },
  {

    h1: 0,
    h2: 0,
    p: 'Reschedule class requests',
    // color: '#FF9191',
    // icon: 'b',
    bg: 'rgba(243, 244, 255, 1)',
    key: 'rescheduleRequests',
    txt: "Accepted",
      link:'reschedule-request'
  },
  {
    h1: 0,
    h2: 0,
    p: 'Resource Requests',
    // color: '#FFD28F',
    // icon: 'd',
    bg: 'rgba(243, 244, 255, 1)',
    txt: "Fulfilled",
     link:'resource-request'
  },
  {
    h1: 0,
    h2: 0,
    p: 'Homework request',
    // color: 'rgba(66, 77, 182, 1)',
    // icon: 'c',
    bg: 'rgba(243, 244, 255, 1)',
    key: 'resourceRequests',
    txt: "Fulfilled",
    link:'homework-request'
  },
  {
    h1: 0,
    h2: 0,
    p: 'Doubt Requests',
    // color: '#FFD28F',
    // icon: 'd',
    bg: 'rgba(243, 244, 255, 1)',
    key: 'resourceRequests',
    txt: "Fulfilled",
    link:'doubt-request'
  },
]

const Classes = () => {
  const[trialData , setTrialData] = useState(0)
  const[rescheduleData , setRescheduleData] = useState(0)
  const[resourceData , setResourceData] = useState(0)
  const[homeworkData , setHomeworkData] = useState(0)
  const [doubtData, setDoubtData] = useState(0)

  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token
  // console.log(token)

const getRescheduleData = async () => {
  let register = `${BASE_URL}/total-reschedule-requests`
  // console.log(register)
  let res = await axios.get(register, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  // console.log(res.data.data.docs)

  data[1].h1 = res.data.data.classAcceptedResponse
  data[1].h2 = res.data.data.classPendingResponse
}
const getTrialData = async () => {
  let register = `${BASE_URL}/total-trial-requests`
  // console.log(register)
  let res = await axios.get(register, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  // console.log(res.data.data.docs)

  data[0].h1 = res.data.data.acceptedClassResponse
  data[0].h2 = res.data.data.pendingClassResponse
}
const getResourceData = async () => {
  let register = `${BASE_URL}/total-resource-requests`
  // console.log(register)
  let res = await axios.get(register, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  console.log(res.data.data)

  data[2].h1 = res.data.data.resourceResolvedRequests
  data[2].h2 = res.data.data.resourcePendingRequests
}
const getHomeworkData = async () => {
  let register = `${BASE_URL}/total-homework-pending`
  // console.log(register)
  let res = await axios.get(register, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  console.log(res.data.data)

  data[3].h1 = res.data.data.homeworksResolved || 0
  data[3].h2 = res.data.data.homeworks
}
 
useEffect(() => {
  getTrialData()
  getRescheduleData()
  getResourceData()
  getHomeworkData()
}, [])

  return (
    <React.Fragment>

      <DataDivCon2 data={data} cls={classes.data_div_con} />
      <Outlet />
    </React.Fragment>
  )
}

export default Classes