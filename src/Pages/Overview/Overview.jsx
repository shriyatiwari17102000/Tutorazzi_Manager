// import React, { useEffect, useState } from 'react'
// import classes from './Overview.module.css'
// import { Link } from 'react-router-dom'
// import Heading from '../../Components/Heading/Heading'
// import ColoredDiv from './Components/ColoredDiv'
// import ReferDiv from './Components/ReferDiv'
// import HomeworkDiv from './Components/HomeworkDiv'
// import UpdateDiv from './Components/UpdateDiv'
// import OverviewAreaChart from './Components/OverviewAreaChart'
// import Cookies from 'js-cookie'
// import { BASE_URL } from '../../Apis/BaseUrl'
// import axios from 'axios'
// import StatisticsGraph from '../../Components/StatisticsGraph/StatisticsGraph'

// const d1 = [
//   {
//     id: '01',
//     link: '/student',
//     p: 'Total revenue',
//     h1: '12000',
//     bg: '#DBE5FF'
//   },
//   {
//     id: '02',
//     link: '/teacher',
//     p: 'Teachers share',
//     h1: '15000',
//     bg: '#FFACAC'
//   },
//   {
//     id: '03',
//     link: '',
//     p: 'Profit',
//     h1: '19000',
//     bg: '#FFC2AF'
//   },
// ]


// const Overview = () => {
//   const[trialData , setTrialData] = useState(0)
//   const[rescheduleData , setRescheduleData] = useState(0)
//   const[resourceData , setResourceData] = useState(0)
//   const[ticketData , setTicketData] = useState(0)
//   const[homeworkData , setHomeworkData] = useState(0)
//   const[teacherStuData, setTeacherStuData] = useState({})
//   const[allHomework , setAllHomework] = useState([])
  
//   const d2 = [
//     {
//       id: '04',
//       link: '/classes/trail-request',
//       p: 'Trial Class Request',
//       h1: '0',
//       bg: '#DBE5FF'
//     },
//     {
//       id: '05',
//       link: '/classes/reschedule-request',
//       p: 'Reschedule Class Request',
//       h1: '43',
//       bg: '#FFACAC'
//     },
//     {
//       id: '06',
//       link: '/classes/resource-request',
//       p: 'Resource Request',
//       h1: '23',
//       bg: '#FFC2AF'
//     },
//     {
//       id: '07',
//       link: '',
//       p: 'Wallet Amount',
//       h1: '42',
//       bg: '#DBE5FF'
//     },
//     {
//       id: '08',
//       link: '',
//       p: 'Tickets pending to resolve',
//       h1: '43',
//       bg: '#FFACAC'
//     },
//     {
//       id: '09',
//       link: '/classes/homework-request',
//       p: 'Homework Request',
//       h1: '23',
//       bg: '#FFC2AF'
//     },
//   ]
  
//   const tutToken = Cookies.get("tutorazzi_academic")
//   const getTutToken = JSON.parse(tutToken)
//   const token = getTutToken.access_token
//   // console.log(token)
//   const getTrialData = async () => {
//     const axiosData = `${BASE_URL}/total-trial-requests`
//     let res = await axios.get(axiosData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     console.log(res.data.data)
//     setTrialData(res.data.data)
//   }

//   const getRescheduleData = async () => {
//     const axiosData = `${BASE_URL}/total-reschedule-requests`
//     let res = await axios.get(axiosData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     // console.log(res.data.data)
//     setRescheduleData(res.data.data)
//   }
//   const getResourceData = async () => {
//     const axiosData = `${BASE_URL}/total-resource-requests`
//     let res = await axios.get(axiosData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     // console.log(res.data.data)
//     setResourceData(res.data.data)
//   }
//   const getTicketData = async () => {
//     const axiosData = `${BASE_URL}/total-pending-tickets`
//     let res = await axios.get(axiosData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     // console.log(res.data.data)
//     setTicketData(res.data.data)
//   }
//   const getTeacherStudentData = async () => {
//     const axiosData = `${BASE_URL}/total-teachers-revenue`
//     let res = await axios.get(axiosData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     console.log(res.data.data)
//     setTeacherStuData(res.data.data)
//   }

//   const getHomeworkData = async () => {
//     const axiosData = `${BASE_URL}/total-homework-pending`
//     let res = await axios.get(axiosData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     // console.log(res.data.data)
//     setHomeworkData(res.data.data)
//   }
//   const getAllHomework = async () => {
//     const axiosData = `${BASE_URL}/homeworks?page=1&limit=3`
//     let res = await axios.get(axiosData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       }
//     })
//     // console.log(res.data.data)
//     setAllHomework(res.data.data.docs)
//   }
//   useEffect(()=>{
//     getAllHomework()
//   },[])

//   // d2[0].h1 = trialData
//   // d2[1].h1 = rescheduleData
//   // d2[2].h1 = resourceData
//   // d2[4].h1 = ticketData
//   // d2[5].h1 = homeworkData

//   d1[0].h1 = teacherStuData.students
//   d1[1].h1 = teacherStuData.teachers

//   useEffect(() => {
//     getTrialData()
//     getRescheduleData()
//     getResourceData()
//     getTicketData()
//     getHomeworkData()
//     getTeacherStudentData()
//   }, [])
//   return (
//     <>
//       <div className={classes.grid}>
//         <Heading cls={`${classes.heading} ${classes.box1}`} heading={'Revenue'} p={'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'} />
//         <div className={`${classes.graph}`}>
//           <h3 className={classes.heading}>Stats Section</h3>
//           <StatisticsGraph/>
//         </div>

//         {d1.map(element => (<ColoredDiv {...element} key={element.id} />))}
//       </div>

//       <div className={classes.grid_2}>
//         <h3 className={classes.heading}>Class Details</h3>

//         <UpdateDiv />

//         {d2.map(element => (<ColoredDiv {...element} key={element.id} />))}

//         <ReferDiv />
//        <HomeworkDiv data={allHomework}/>
//       </div>
//     </>
//   )
// }

// export default Overview
import React, { useEffect, useState } from 'react'
import classes from './Overview.module.css'
import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon';
import Container from '../../UI/Container/Container';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../Apis/BaseUrl';
import DataDivCon2 from '../../Components/DataDivCon2/DataDivCon2';
import TrialUpcoming from './ClassesDash/TrialUpcoming';
import StatisticsGraph from '../../Components/StatisticsGraph/StatisticsGraph';
import PendingStu from './ClassesDash/PendingStu';


const data = [
  {
    h1: '0',
    h2 : "0",
    p: 'Trial Class Request',
    // color: '#BCCFFF',
    // icon: 'a',
    bg: 'rgba(243, 244, 255, 1)',
    key: 'trialRequests',
    txt : "Accepted"
  },
  {
    
    h1: '0',
    h2 : "0",
    p: 'Reschedule class requests',
    // color: '#FF9191',
    // icon: 'b',
    bg: 'rgba(243, 244, 255, 1)',
    key: 'rescheduleRequests',
     txt : "Accepted"
  },
  {
    h1: '0',
    h2 : "0",
    p: 'Resource request',
    // color: '#FFD28F',
    // icon: 'd',
    bg: 'rgba(243, 244, 255, 1)',
     txt : "Fulfilled"
  },
  {
    h1: '0',
    h2 : "0",
    p: 'Homework request',
    // color: 'rgba(66, 77, 182, 1)',
    // icon: 'c',
    bg: 'rgba(243, 244, 255, 1)',
    key: 'resourceRequests',
     txt : "Fulfilled"
  },
]


const Overview = () => {
  const [reqData, setReqData] = useState({})
  const [graphData, setGraphData] = useState([])
  const [pendingHomework, setPendingHomework] = useState([])
  const [pendingRequest, setPendingRequest] = useState([])
  const [trialData, setTrialData] = useState([])
  const [upcomingData, setUpcomingData] = useState([])
  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token
  // console.log(getTutToken.is_complete)

  const getRequestData = async () => {
    const axiosData = `${BASE_URL}/stats`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    setReqData(res.data.data)
    console.log(res.data.data)
    // setGraphData(res.data.data.getPaymentsData)
    data[0].h1 = res.data.data?.trialRequests
    data[1].h1 = res.data.data?.rescheduleRequestsByStudents
    data[2].h1 = res.data.data?.rescheduleRequestsByTeachers
    data[3].h1 = res.data.data?.resourceRequestsAndDoubtResponse
    // data.map(element => (
    //   console.log([element.key])
    //   // element.h1 = res.data.data[element.key]
    // ))
  }

  useEffect(() => {
    getRequestData()
  }, [])
  // //////
  const getPendingHomeWorks = async () => {
    const axiosData = `${BASE_URL}/pending-homeworks?limit=2&page=1`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    setPendingHomework(res.data.data.docs)
    console.log(res.data.data.docs)
    // setGraphData(res.data.data.getPaymentsData)
  }
  useEffect(() => {
    getPendingHomeWorks()
  }, [])
  // //////
  const getPendingRequest = async () => {
    const axiosData = `${BASE_URL}/pending-resource-requests?limit=2&page=1`
    let res = await axios.get(axiosData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    setPendingRequest(res.data.data.docs)
    console.log(res.data.data.docs)
  }
  useEffect(() => {
    getPendingRequest()
  }, [])

  const getUpcomingData = async () => {
    let register = `${BASE_URL}/upcoming-classes?limit=3&page=1`

    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data.docs)
    setUpcomingData(res.data.data?.docs)
  }
  const getRescheduleData = async () => {
    let register = `${BASE_URL}/total-reschedule-requests`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data.docs)

    data[1].h1= res.data.data?.classAcceptedResponse
data[1].h2= res.data.data?.classPendingResponse
  }
  const getTrialData = async () => {
    let register = `${BASE_URL}/total-trial-requests`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(res.data.data.docs)

    data[0].h1= res.data.data?.acceptedClassResponse
data[0].h2= res.data.data?.pendingClassResponse
  }
  const getResourceData = async () => {
    let register = `${BASE_URL}/total-resource-requests`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)

    data[2].h1 = res.data.data?.resourceResolvedRequests
 data[2].h2 = res.data.data?.resourcePendingRequests
  }
  const getHomeworkData = async () => {
    let register = `${BASE_URL}/total-homework-pending`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)

    data[3].h1= res.data.data?.homeworksResolved
data[3].h2= res.data.data?.homeworks
  }
  const getGraphData = async () => {
    let register = `${BASE_URL}/total-teachers-revenue`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
setGraphData(res.data.data)
 
  }


  console.log(data)

  useEffect(() => {
    getTrialData()
    getUpcomingData()
    getRescheduleData()
    getResourceData()
    getHomeworkData()
    getGraphData()
  }, [])

  return (
    <React.Fragment>
          <div className={classes.grid}>
        <DataDivCon2 data={data} cls={classes.data_div_con} />
        <Container cls={classes.my_bar_container}>

          {/* <BarChart2 graphdata={graphData} /> */}
          <div>
          <StatisticsGraph data={graphData}/>
            {/* <div className={classes.my_bar_inner_box}>
              <h5>Total Payment to this Month</h5>
              <h1>₹{reqData?.totalPaymentThisMonth?.toFixed(2)}</h1>
              <span className={
                reqData?.percentageMonthChange === 0
                  ? classes.green
                  : reqData?.percentageMonthChange < 0
                    ? classes.red
                    : classes.green
              }>
                {reqData?.percentageMonthChange !== undefined
                  ? reqData.percentageMonthChange === 0
                    ? '0 % increment from last month'
                    : reqData.percentageMonthChange < 0
                      ? `${Math.abs(reqData.percentageMonthChange.toFixed(2))} % decrement from last month`
                      : ` ${reqData.percentageMonthChange.toFixed(2)} % change from last month`
                  : "N/A"}
              </span>
            </div>
            <div className={classes.my_bar_inner_box}>
              <h5>Total Payment to this week</h5>
              <h1>₹{reqData?.totalPaymentThisWeek?.toFixed(2)}</h1>
              <span className={
                reqData?.percentageWeekChange === 0
                  ? classes.green
                  : reqData?.percentageWeekChange < 0
                    ? classes.red
                    : classes.green
              }>
                {reqData?.percentageWeekChange !== undefined
                  ? reqData.percentageWeekChange === 0
                    ? '0 % increment from last Week'
                    : reqData.percentageWeekChange < 0
                      ? `${Math.abs(reqData.percentageWeekChange.toFixed(2))} % decrement from last week`
                      : ` ${reqData.percentageWeekChange.toFixed(2)} % change from last week`
                  : "N/A"}
              </span>
            </div> */}
          </div>
        </Container>
        <div className={classes.my_bar_container1}>
          <h5 className={classes.head1}>New Trial Class Request</h5>
          <div className={classes.up_div}>
            {trialData?.map((item) => (
              <TrialUpcoming trial={true} data={item} />
            ))}
          </div>
        </div>
        <div className={classes.my_bar_container1}>
          <h5 className={classes.head1}>Pending Student Profile</h5>
          <div className={classes.up_div}>
           <PendingStu/>
          </div>
        </div>
        


       {/* <div style={{display:"flex"}}> */}
       <Container cls={classes.inner_div}>
          <div className={classes.see_all}>
            <h4 className={classes.heading}>Pending Homeworks</h4>
          </div>

          {pendingHomework.length > 0 ? pendingHomework?.map((item) => (
            <TaskDashboard cls={classes.my_most_inner} date={true} alert={true} homeworkData={item} />
          )) : "no data found!"}

        </Container>
        <Container cls={classes.inner_div}>
          <div className={classes.see_all}>
            <h4 className={classes.heading}>Pending Resource Request</h4>

          </div>
          {pendingRequest.length > 0 ? pendingRequest.map((item, index) => (
            <TaskDashboard key={index} cls={classes.my_most_inner} date={false} alert={true} homeworkData={item} />
          )) : "no data found!"}
        </Container>
       {/* </div> */}
      </div>
    </React.Fragment>
  )
}

export default Overview