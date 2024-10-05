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
import TaskDashboard from '../../Components/AllFolds/TaskInfo/TaskDashboard';
import { useNavigate } from 'react-router-dom';
import TrialBelow from './ClassesDash/TrialBelow';


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
    p: 'Doubt request',
    // color: '#FFD28F',
    // icon: 'd',
    bg: 'rgba(243, 244, 255, 1)',
    txt: "Fulfilled",
     link:'doubt-request'
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
]


const Overview = () => {
  const [reqData, setReqData] = useState({})
  const [graphData, setGraphData] = useState([])
  const [likedData, setLikeData] = useState([])
  const [dislikeData, setDislikeData] = useState([])
  const [noResponse, setNoResponse] = useState([])
  const [pendingHomework, setPendingHomework] = useState([])
  const [pendingRequest, setPendingRequest] = useState([])
  const [trialData, setTrialData] = useState([])
  const [upcomingData, setUpcomingData] = useState([])
  const [pendingStudent, setPendingStudent] = useState([])
  const[dependTime, setDependTime] = useState('week')


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
    data[0].h1 = res.data.data?.trialRequests || 0
    data[1].h1 = res.data.data?.rescheduleRequestsByStudents || 0
    data[2].h1 = res.data.data?.rescheduleRequestsByTeachers || 0
    data[3].h1 = res.data.data?.resourceRequestsAndDoubtResponse || 0
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
    const axiosData = `${BASE_URL}/homeworks?limit=2&page=1`
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
    const axiosData = `${BASE_URL}/all-pending-resource-requests?limit=2&page=1`
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

  // const getUpcomingData = async () => {
  //   let register = `${BASE_URL}/upcoming-classes?limit=3&page=1`

  //   // console.log(register)
  //   let res = await axios.get(register, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   // console.log(res.data.data.docs)
  //   setUpcomingData(res.data.data?.docs)
  // }
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

    data[1].h1 = res.data.data?.classAcceptedResponse || 0  ;
      data[1].h2 = res.data.data?.classPendingResponse || 0
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

    data[0].h1 = res.data.data?.acceptedClassResponse || 0;
    data[0].h2 = res.data.data?.pendingClassResponse || 0
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

    data[3].h1 = res.data.data?.homeworksResolved || 0
    data[3].h2 = res.data.data?.homeworks || 0
  }

  const getDoubtData = async () => {
    let register = `${BASE_URL}/total-doubts`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
  
    data[2].h1 = res.data.data.doubtResolvedResponse || 0
    data[2].h2 = res.data.data.doubtResponse
  }
  const getGraphData = async () => {
    let register = `${BASE_URL}/total-teachers-revenue?time=${dependTime}`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setGraphData(res.data.data)

  }

  useEffect(() => {
    getGraphData()
  }, [dependTime])

  const getPendingStudent = async () => {
    let register = `${BASE_URL}/all-pending-students?limit=3&page=1`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setPendingStudent(res.data.data?.docs)

  }
  const getTrialListData = async () => {
    let register = `${BASE_URL}/trial-classes?limit=3&page=1&is_pending=true`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data.docs)
    setTrialData(res.data.data?.docs)
  }
  const getTrialLikeData = async () => {
    let register = `${BASE_URL}/trial-class-liked?limit=3&page=1`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data.docs)
    setLikeData(res.data.data?.docs)
  }
  const getTrialDisLikeData = async () => {
    let register = `${BASE_URL}/trial-class-disliked?limit=3&page=1`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data.docs)
    setDislikeData(res.data.data?.docs)
  }
  const getTrialNoResponse = async () => {
    let register = `${BASE_URL}/trial-class-no-response?limit=3&page=1`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data.docs)
    setNoResponse(res.data.data?.docs)
  }


  // console.log(data)

  useEffect(() => {
    getTrialData()
    // getUpcomingData()
    getRescheduleData()
    // getResourceData()
    getHomeworkData()
    getTrialListData()
    getPendingStudent()
    getDoubtData()
    getTrialDisLikeData()
    getTrialNoResponse()
    getTrialLikeData()
  }, [])

  const navigate = useNavigate()

  return (
    <React.Fragment>
      <div className={classes.grid}>
        <DataDivCon2 data={data} cls={classes.data_div_con} />
        <Container cls={classes.my_bar_container}>

          {/* <BarChart2 graphdata={graphData} /> */}
          <div>
            <StatisticsGraph data={graphData} setDependTime={setDependTime} dependTime={dependTime}/>
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
       <div className={classes.flexx}>
       <h5 className={classes.head1}>New Trial Class Request</h5>
       <button onClick={() => navigate('/classes')}>View All</button>
       </div>
          <div className={classes.up_div}>
            {trialData?.map((item) => (
              <TrialUpcoming trial={true} data={item} />
            ))}
          </div>
        </div>
        <div className={classes.my_bar_container1}>
        <div className={classes.flexx}>
        <h5 className={classes.head1}>Pending Student Profile</h5>
        <button onClick={() => navigate('/student')}>View All</button>
          </div>  
          <div className={classes.up_div}>
           {pendingStudent?.map((item) =>  <PendingStu data={item} />)}
          </div>
        </div>



        {/* <div style={{display:"flex"}}> */}
        <Container cls={classes.inner_div}>
          <div className={classes.see_all}>
            <h4 className={classes.heading}>Pending Homeworks</h4>
            <button style={{background:"none",border:"none", color:"blue", textDecoration:"underline"}} onClick={()=> navigate('/classes/homework-request')}>See all</button>
          </div>

          {pendingHomework.length > 0 ? pendingHomework?.map((item) => (
            <TaskDashboard cls={classes.my_most_inner} date={true} alert={true} homeworkData={item} />
          )) : "no data found!"}

        </Container>
        <Container cls={classes.inner_div}>
          <div className={classes.see_all}>
            <h4 className={classes.heading}>Pending Resource Request</h4>
            <button style={{background:"none",border:"none", color:"blue", textDecoration:"underline"}} onClick={()=> navigate('/classes/resource-request')}>See all</button>
          </div>
          {pendingRequest.length > 0 ? pendingRequest.map((item, index) => (
            <TaskDashboard key={index} cls={classes.my_most_inner} date={false} alert={true} homeworkData={item} />
          )) : "no data found!"}
        </Container>
       
        {/* </div> */}
      </div>
      <div className={classes.my_bar_container4}>
        <h5 className={classes.head2}>Trial classes</h5>
   <div className={classes.in_div}>
   <div>
    <div className={classes.flexx}>
       <h4 style={{marginBottom:"10px", fontWeight:"500", fontSize:"16px"}}>Pending classes which has no response from student</h4>
       <button onClick={() => navigate('/classes')}>See more</button>
       </div>
          <div className={classes.up_div}>
            {noResponse?.map((item) => (
              <TrialBelow  trial={true} data={item} />
            ))}
          </div>
    </div>
    <div className={classes.mtop}>
    <div className={classes.flexx} >
       <h4 style={{marginBottom:"10px", fontWeight:"500", fontSize:"16px"}}>Liked</h4>
       <button onClick={() => navigate('/classes')}>See more</button>
       </div>
          <div className={classes.up_div}>
            {likedData?.map((item) => (
              <TrialBelow  status={"liked"} liked={true} trial={true} data={item} />
            ))}
          </div>
    </div>
    <div className={classes.mtop}>
    <div className={classes.flexx}>
       <h4 style={{marginBottom:"10px", fontWeight:"500", fontSize:"16px"}}>Disliked</h4>
       <button onClick={() => navigate('/classes')}>See more</button>
       </div>
          <div className={classes.up_div}>
            {dislikeData?.map((item) => (
              <TrialBelow status={"disliked"} comment={true} liked={true} trial={true} data={item} />
            ))}
          </div>
    </div>
   </div>
        </div>
    </React.Fragment>
  )
}

export default Overview