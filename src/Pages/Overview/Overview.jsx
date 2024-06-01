import React, { useEffect, useState } from 'react'
import classes from './Overview.module.css'
import { Link } from 'react-router-dom'
import Heading from '../../Components/Heading/Heading'
import ColoredDiv from './Components/ColoredDiv'
import ReferDiv from './Components/ReferDiv'
import HomeworkDiv from './Components/HomeworkDiv'
import UpdateDiv from './Components/UpdateDiv'
import OverviewAreaChart from './Components/OverviewAreaChart'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../Apis/BaseUrl'
import axios from 'axios'
import StatisticsGraph from '../../Components/StatisticsGraph/StatisticsGraph'

const d1 = [
  {
    id: '01',
    link: '/student',
    p: 'Total revenue',
    h1: '12000',
    bg: '#DBE5FF'
  },
  {
    id: '02',
    link: '/teacher',
    p: 'Teachers share',
    h1: '15000',
    bg: '#FFACAC'
  },
  {
    id: '03',
    link: '',
    p: 'Profit',
    h1: '19000',
    bg: '#FFC2AF'
  },
]


const Overview = () => {
  const[trialData , setTrialData] = useState(0)
  const[rescheduleData , setRescheduleData] = useState(0)
  const[resourceData , setResourceData] = useState(0)
  const[ticketData , setTicketData] = useState(0)
  const[homeworkData , setHomeworkData] = useState(0)
  const[teacherStuData, setTeacherStuData] = useState({})
  const[allHomework , setAllHomework] = useState([])
  
  const d2 = [
    {
      id: '04',
      link: '/classes/trail-request',
      p: 'Trial Class Request',
      h1: '0',
      bg: '#DBE5FF'
    },
    {
      id: '05',
      link: '/classes/reschedule-request',
      p: 'Reschedule Class Request',
      h1: '43',
      bg: '#FFACAC'
    },
    {
      id: '06',
      link: '/classes/resource-request',
      p: 'Resource Request',
      h1: '23',
      bg: '#FFC2AF'
    },
    {
      id: '07',
      link: '',
      p: 'Wallet Amount',
      h1: '42',
      bg: '#DBE5FF'
    },
    {
      id: '08',
      link: '',
      p: 'Tickets pending to resolve',
      h1: '43',
      bg: '#FFACAC'
    },
    {
      id: '09',
      link: '/classes/homework-request',
      p: 'Homework Request',
      h1: '23',
      bg: '#FFC2AF'
    },
  ]
  
  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token
  // console.log(token)
  const getTrialData = async () => {
    const axiosData = `${BASE_URL}/total-trial-requests`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data)
    setTrialData(res.data.data)
  }

  const getRescheduleData = async () => {
    const axiosData = `${BASE_URL}/total-reschedule-requests`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data)
    setRescheduleData(res.data.data)
  }
  const getResourceData = async () => {
    const axiosData = `${BASE_URL}/total-resource-requests`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data)
    setResourceData(res.data.data)
  }
  const getTicketData = async () => {
    const axiosData = `${BASE_URL}/total-pending-tickets`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data)
    setTicketData(res.data.data)
  }
  const getTeacherStudentData = async () => {
    const axiosData = `${BASE_URL}/total-teachers-revenue`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setTeacherStuData(res.data.data)
  }

  const getHomeworkData = async () => {
    const axiosData = `${BASE_URL}/total-homework-pending`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data)
    setHomeworkData(res.data.data)
  }
  const getAllHomework = async () => {
    const axiosData = `${BASE_URL}/homeworks?page=1&limit=3`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data)
    setAllHomework(res.data.data.docs)
  }
  useEffect(()=>{
    getAllHomework()
  },[])

  d2[0].h1 = trialData
  d2[1].h1 = rescheduleData
  d2[2].h1 = resourceData
  d2[4].h1 = ticketData
  d2[5].h1 = homeworkData

  d1[0].h1 = teacherStuData.students
  d1[1].h1 = teacherStuData.teachers

  useEffect(() => {
    getTrialData()
    getRescheduleData()
    getResourceData()
    getTicketData()
    getHomeworkData()
    getTeacherStudentData()
  }, [])
  return (
    <>
      <div className={classes.grid}>
        <Heading cls={`${classes.heading} ${classes.box1}`} heading={'Revenue'} p={'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'} />
        <div className={`${classes.graph}`}>
          <h3 className={classes.heading}>Stats Section</h3>
          <StatisticsGraph/>
        </div>

        {d1.map(element => (<ColoredDiv {...element} key={element.id} />))}
      </div>

      <div className={classes.grid_2}>
        <h3 className={classes.heading}>Class Details</h3>

        <UpdateDiv />

        {d2.map(element => (<ColoredDiv {...element} key={element.id} />))}

        <ReferDiv />
       <HomeworkDiv data={allHomework}/>
      </div>
    </>
  )
}

export default Overview
