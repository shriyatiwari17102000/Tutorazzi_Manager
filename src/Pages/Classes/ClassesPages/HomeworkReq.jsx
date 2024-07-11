import React, { useEffect, useState } from 'react'
import classes from './ClasssesPages.module.css'
import Heading from '../../../Components/Heading/Heading'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import DateButton from '../../../Components/DateButton/DateButton'
import ClassCard from '../../../Components/ClassCard/ClassCard'
import Pagination from '../../../Components/Pagination/Pagination'
import NewPagination from '../../../Components/NewPagination/NewPagination'
import Cookies from 'js-cookie'
import axios from 'axios'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css'; 
import { BASE_URL } from '../../../Apis/BaseUrl'
import moment from 'moment'

const data = {
  title: 'Maths Class',
  homework:'lorem lorem lorem lorm lorem',
  student:'Puneet Shrivastav',
  due_date:'13/08/2023',
  alert:'3 Days left',
  tags: ['notify-student','resolve']
}

const HomeworkReq = () => {
  const [rescheduleData, setRescheduleData] = useState([])
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [value, onChange] = useState('');
  const [search, setSearch] = useState('');
  const [teacher, setTeacher] = useState('')
    const [teacherData, setTeacherData] = useState('')
    const [student, setStudent] = useState('')
    const [studentData, setStudentData] = useState([])

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
    setStudent(response.data.data[0]?._id)
}

useEffect(() => {
    getTeacher()
}, [])

useEffect(() => {
    getStudent()
}, [teacher])

  const getHomeworkData = async () => {
    let dateValue = value ? moment(value).format('YYYY-MM-DD') : " "; 
    let register = `${BASE_URL}/homeworks-list?limit=${limit}&page=${page}&search=${search}&date=${dateValue}&teacher_id=${teacher}&student_id=${student}`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setPageInfo({ ...res.data.data, docs: null })
    setRescheduleData(res.data.data?.docs)
  }
  useEffect(() => {
    getHomeworkData()
  }, [limit, page, search, value, teacher, student])

  const paginationProps = {
    setPage,
    pageInfo
  }
  return (
    <React.Fragment>
      <Heading cls={classes.heading} heading={'Homework Requests'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'}>
     <div className={classes.top_sb_div}>
     <div className={classes.sb_div}>
                    <select name="" id="" className={classes.selecttag} value={teacher} onChange={(e) => setTeacher(e.target.value)}>
                        <option value="">Select Teacher</option>

                        {teacherData && teacherData?.map((element, index) => (<option key={index} selected value={element._id}>{element.name}</option>))}

                    </select>
                    <select name="" id="" className={classes.selecttag} value={student} onChange={(e) => setStudent(e.target.value)}>
                        {/* <option value="">Select Student</option> */}
                        {studentData && studentData?.map((element, index) => (<option key={index} value={element._id}>{element.name}</option>))}

                    </select>
                </div>
      <div className={classes.sb_div}>
         <SearchBar cls={classes.sb} search={search} setSearch={setSearch}/>
         <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
         </div>
     </div>
      </Heading>
      {rescheduleData.length > 0 ? <div>
        {rescheduleData.map((item, index)=> (
        <ClassCard key={index} home={true} func={getHomeworkData}   tags =  {['notify-student']} layout={1} data={item}   />
      
    ) )}
      <NewPagination {...paginationProps} />
      </div> : "No data found!"}
      {/* <ClassCard layout={2} data={data}  />

      <Pagination /> */}

    </React.Fragment>
  )
}

export default HomeworkReq
