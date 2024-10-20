import React, { useEffect, useState } from 'react'
import classes from './ClasssesPages.module.css'
import Heading from '../../../Components/Heading/Heading'
// import SearchBar from '../../../Components/SearchBar/SearchBar'
// import DateButton from '../../../Components/DateButton/DateButton'
import ClassCard from '../../../Components/ClassCard/ClassCard'
import Pagination from '../../../Components/Pagination/Pagination'
import ClassCardCon from '../../../MappableDivs/ClassCardCon/ClassCardCon'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import NewPagination from '../../../Components/NewPagination/NewPagination'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import CardDiv from '../../../Components/ClassCard/CardDiv'
import CardCon from '../../../MappableDivs/ClassCardCon/CardCon'
import NewTrial from './NewTrail'
import ReqCardCon from '../../../MappableDivs/ClassCardCon/ReqCardCon'
import TrialTab from '../TrialTab'


const ClassIndex = () => {

    const [upcomingData, setUpcomingData] = useState([])
    const [rescheduleData, setRescheduleData] = useState([])
    const [pastData, setPastData] = useState([])
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [search, setSearch] = useState('');
    const [limit1, setLimit1] = useState(10);
    const [limit3, setLimit3] = useState(10);
    const [limit4, setLimit4] = useState(10);
    const [page1, setPage1] = useState(1);
    const [page3, setPage3] = useState(1);
    const [page4, setPage4] = useState(1);
    const [pageInfo1, setPageInfo1] = useState({});
    const [pageInfo4, setPageInfo4] = useState({});
    const [pageInfo3, setPageInfo3] = useState({});
    const [search1, setSearch1] = useState('');
    const [limit2, setLimit2] = useState(10);
    const [page2, setPage2] = useState(1);
    const [pageInfo2, setPageInfo2] = useState({});
    const [search2, setSearch2] = useState('');
    const [search3, setSearch3] = useState('');
    const [search4, setSearch4] = useState('');
    const [value, onChange] = useState('');
    const [teacher, setTeacher] = useState('')
    const [teacherData, setTeacherData] = useState('')
    const [student, setStudent] = useState('')
    const [studentData, setStudentData] = useState([])
    const [missedData, setMissedData] = useState([])
    const [trialData, setTrialData] = useState([])

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getTeacher = async () => {
        const register = `${BASE_URL}/classes-teachers`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data.data)
        setTeacherData(response.data.data)
    }

    const getStudent = async () => {
        const register = `${BASE_URL}/classes-students?teacher_id=${teacher}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data.data)
        setStudentData(response.data.data)
        // setStudent(response.data.data[0]?._id)
    }

    useEffect(() => {
        getTeacher()
    }, [])

    useEffect(() => {
        getStudent()
    }, [teacher])

    const getUpcomingData = async () => {
        let dateValue = value ? moment(value).format('YYYY-MM-DD') : "";
        let register = `${BASE_URL}/upcoming-classes?limit=${limit}&page=${page}&search=${search}&date=${dateValue}&teacher_id=${teacher}&student_id=${student}`
        // console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setPageInfo({ ...res.data.data, docs: null })
        setUpcomingData(res.data.data?.docs)
    }
    useEffect(() => {
        getUpcomingData()
    }, [limit, page, search, value, teacher, student])

    const getPastData = async () => {
        let dateValue = value ? moment(value).format('YYYY-MM-DD') : " ";
        let register = `${BASE_URL}/past-classes?limit=${limit1}&page=${page1}&search=${search1}&date=${dateValue}&teacher_id=${teacher}&student_id=${student}`
        console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setPageInfo1({ ...res.data.data, docs: null })
        setPastData(res.data.data?.docs)
    }
    useEffect(() => {
        getPastData()
    }, [limit1, page1, search1, value, teacher, student])


    const getMissedData = async () => {
        let dateValue = value ? moment(value).format('YYYY-MM-DD') : " ";
        let register = `${BASE_URL}/missed-classes?limit=${limit2}&page=${page2}&search=${search2}&date=${dateValue}&teacher_id=${teacher}&student_id=${student}`
        console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setPageInfo2({ ...res.data.data, docs: null })
        setMissedData(res.data.data?.docs)
    }

    useEffect(() => {
        getMissedData()
    }, [limit2, page2, search2, value, teacher, student])


    const getTrialData = async () => {
        let dateValue = value ? moment(value).format('YYYY-MM-DD') : "";
        let register = `${BASE_URL}/trial-classes?limit=${limit4}&page=${page4}&search=${search4}&date=${dateValue}&teacher_id=${teacher}&student_id=${student}`
        console.log(register)
        let res = await axios.get(register, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        console.log(res.data.data)
        setPageInfo4({ ...res.data.data, docs: null })
        setTrialData(res.data.data?.docs)
      }
      useEffect(() => {
        getTrialData()
      }, [limit4, page4, search4, value, teacher, student])

      const getRescheduleData = async () => {
        let dateValue = value ? moment(value).format('YYYY-MM-DD') : ""; 
        let register = `${BASE_URL}/rescheduled-classes?limit=${limit3}&page=${page3}&search=${search3}&date=${dateValue}&teacher_id=${teacher}&student_id=${student}`
        console.log(register)
        let res = await axios.get(register, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        console.log(res.data.data)
        setPageInfo3({ ...res.data.data, docs: null })
        setRescheduleData(res.data.data?.docs)
      }
      useEffect(() => {
        getRescheduleData()
      }, [limit3, page3, search3, value, teacher, student])
    
    const paginationProps = {
        setPage,
        pageInfo
    }
    const paginationProps1 = {
        setPage: setPage1,
        pageInfo: pageInfo1
    }
    const paginationProps2 = {
        setPage: setPage2,
        pageInfo: pageInfo2
    }
    const paginationProps3 = {
        setPage: setPage3,
        pageInfo: pageInfo3
    }
    const paginationProps4 = {
        setPage: setPage4,
        pageInfo: pageInfo4
    }



    const [inx, setInx] = useState(0)

    const renderDiv = {
        0: <ClassCardCon link={'upcoming-details'} data={upcomingData} paginationProps={paginationProps} />,
        1: <ClassCardCon link={'past-details'} data={pastData} paginationProps={paginationProps1} />,
        2: <CardCon data={missedData} paginationProps={paginationProps2} status={"Missed"} />,
        3:<ReqCardCon data={rescheduleData} paginationProps={paginationProps3} func={getRescheduleData}  /> ,
        4: <TrialTab data={trialData} paginationProps={paginationProps4}  />
    }


    return (
        <React.Fragment>
            <div className={classes.top_div}>
                <Heading cls={classes.mbb}  heading={'Classes'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} />
                {inx === 0 && <div className={classes.sb_div2}>
                    <SearchBar cls={classes.sb} search={search} setSearch={setSearch} />
                    <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
                </div>}
                {inx === 1 && <div className={classes.sb_div2}>
                    <SearchBar cls={classes.sb} search={search1} setSearch={setSearch1} />
                    <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
                </div>}
                {inx === 2 && <div className={classes.sb_div2}>
                    <SearchBar cls={classes.sb} search={search2} setSearch={setSearch2} />
                    <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
                </div>}
                {inx === 3 && <div className={classes.sb_div2}>
                    <SearchBar cls={classes.sb} search={search3} setSearch={setSearch3} />
                    <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
                </div>}
                {inx === 4 && <div className={classes.sb_div2}>
                    <SearchBar cls={classes.sb} search={search4} setSearch={setSearch4} />
                    <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
                </div>}
            </div>
            <div className={classes.select_cont}>
                <select className={classes.selecttag} onChange={(e) => setInx(Number(e.target.value))} value={inx}>
                    <option value={0}>Upcoming Classes</option>
                    <option value={1}>Past Classes</option>
                    <option value={2}>Missed Classes</option>
                    <option value={3}>Pending Classes</option>
                    <option value={4}>Trial Classes</option>
                </select>
                <div className={classes.sb_div}>
                    <select name="" id="" className={classes.selecttag} value={teacher} onChange={(e) => setTeacher(e.target.value)}>
                        <option value="">Select Teacher</option>

                        {teacherData && teacherData?.map((element, index) => (<option key={index} selected value={element._id}>{element.name}</option>))}

                    </select>
                    <select name="" id="" className={classes.selecttag} value={student} onChange={(e) => setStudent(e.target.value)}>
                        <option value="">Select Student</option>
                        {studentData && studentData?.map((element, index) => (<option key={index} value={element._id}>{element.name}</option>))}

                    </select>
                </div>

            </div>
            {/* <div className={classes.sb_div}> */}
            {/* <div className={classes.toggle_btns}>
                    <button onClick={() => setInx(0)} className={inx === 0 ? classes.active : ''}>Upcoming Classes</button>
                    <button onClick={() => setInx(1)} className={inx === 1 ? classes.active : ''}>Past Classes</button>
                    <button onClick={() => setInx(2)} className={inx === 2 ? classes.active : ''}>Missed Classes</button>
                </div> */}


            {/* </div> */}



            {
                renderDiv[inx]
            }



        </React.Fragment>
    )
}

export default ClassIndex
