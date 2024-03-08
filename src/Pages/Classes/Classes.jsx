import React, { useEffect, useState } from 'react'
import classes from './Classes.module.css'
import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon'
// import New from './New'
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../Apis/BaseUrl';
import axios from 'axios';

const data = [
  {
    h1: '35',
    p: 'New Trial Class Request',
    color: '#BCCFFF',
    icon: 'a',
    bg: '#DBE5FF',
    link:'trial-request'
  },
  {
    h1: '35',
    p: 'Reschedule Request',
    color: '#FF9191',
    icon: 'b',
    bg: '#FFACAC',
    link:'reschedule-request'
  },
  {
    h1: '35',
    p: 'Resources Requests',
    color: '#B5FFB8',
    icon: 'c',
    bg: '#DAFFDB',
    link:'resource-request'
  },
  {
    h1: '35',
    p: 'Homework Requests',
    color: '#FFD28F',
    icon: 'd',
    bg: '#FFE7C2',
    link:'homework-request'
  },
]

const Classes = () => {
  const[trialData , setTrialData] = useState(0)
  const[rescheduleData , setRescheduleData] = useState(0)
  const[resourceData , setResourceData] = useState(0)
  const[homeworkData , setHomeworkData] = useState(0)

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
    console.log(res.data.data)
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
    console.log(res.data.data)
    setResourceData(res.data.data)
  }
  const getHomeworkData = async () => {
    const axiosData = `${BASE_URL}/total-homework-pending`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setHomeworkData(res.data.data)
  }

  data[0].h1 = trialData || 0
  data[1].h1 = rescheduleData || 0
  data[2].h1 = resourceData || 0
  data[3].h1 = homeworkData || 0

  useEffect(() => {
    getTrialData()
    getRescheduleData()
    getResourceData()
    getHomeworkData()
  }, [])

  return (
    <React.Fragment>

      <DataDivCon data={data} cls={classes.data_div_con} />
      <Outlet />
    </React.Fragment>
  )
}

export default Classes