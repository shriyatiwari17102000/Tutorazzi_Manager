import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import FallbackImage from '../../../Components/FallbackImgae/FallbackImage'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import DataDivCon from '../../../MappableDivs/DataDivCon/DataDivCon'
import classes from './StudentDetails.module.css'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import StuDetailCard from './StuDetailCard'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import PaymentCard from '../../../Components/PaymentCard/PaymentCard'
import ViewProfileModal from '../../../Components/AllModals/StuProfile/ViewProfileModal'
import AddClassBundle from '../../../Components/AllModals/StuProfile/AddClassBundle'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'
import StuDetailMap from './StuDetailMap'
import StuPaymentMap from './StuPaymentMap'
import moment from 'moment'


const StudentDetails = () => {
  const [data1, setData1] = useState([])
  const [classData, setClassData] = useState([])
  const [paymentData, setPaymentData] = useState([])
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [inx, setInx] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [pageInfo, setPageInfo] = useState({})
  const [limit1, setLimit1] = useState(10)
  const [page1, setPage1] = useState(1)
  const [pageInfo1, setPageInfo1] = useState({})
  const [value, onChange] = useState('');
  const [teacher, setTeacher] = useState('')
  const [teacherData, setTeacherData] = useState([])
  const [isShow, setIsShow] = useState(true);

  const { id } = useParams()
  // console.log(id)

  const popupHandler = () => setShow(!show)
  const handleOpen = () => setShow1(!show1)
  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token

  const getTeacher = async () => {
    const register = `${BASE_URL}/all-teachers`
    let response = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    })

    console.log(response.data.data?.docs)
    setTeacherData(response.data.data?.docs)
    // setTeacher(response.data.data?.docs[0]?.user_id)
  }

  useEffect(() => {
    getTeacher()
  }, [])

  const getData = async () => {

    let register = `${BASE_URL}/student-by-id?student_id=${id}`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setData1(res.data.data)
  }
  useEffect(() => {
    getData()
  }, [])

  const getClasses = async () => {

    let register = `${BASE_URL}/student-classes?student_id=${id}&limit=${limit}&page=${page}&teacher_id=${teacher}`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setClassData(res.data.data?.result?.docs)
    setPageInfo({ ...res.data.data?.result, docs: null })
  }
  useEffect(() => {
    getClasses()
  }, [limit, page, teacher])

  const getPayment = async () => {
    let dateValue = value ? moment(value).format('YYYY-MM-DD') : " ";
    console.log(dateValue)
    let register = `${BASE_URL}/student-payments?student_id=${id}&limit=${limit1}&page=${page1}&date=${dateValue}`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setPaymentData(res.data.data?.docs)
    setPageInfo1({ ...res.data.data, docs: null })
  }
  useEffect(() => {
    getPayment()
  }, [limit1, page1, value])

  const paginationProps = {
    setPage,
    pageInfo
  }
  const paginationProps1 = {
    setPage: setPage1,
    pageInfo: pageInfo1
  }



  // console.log(paymentData)
  const renderDiv = {
    0: <StuDetailMap getData={getClasses} data={classData} id={id} paginationProps={paginationProps} />,
    1: <StuPaymentMap getData={getPayment} data={paymentData} paginationProps={paginationProps1} />
  }
  const data = [
    {
      h1: data1?.no_of_classes || 0,
      p: 'All Classes',
      color: '#FF9191',
      bg: '#FFACAC',
    },
    {
      h1: data1?.last_payment ? "₹" + data1?.last_payment : 0,
      p: 'Last Payment',
      color: '#BCCFFF',
      bg: '#DBE5FF',
    },

    // {
    //   h1: '35',
    //   p: 'Recourses Requests',
    //   color: '#B5FFB8',
    //   bg: '#DAFFDB',
    // },
    // {
    //   h1: '35',
    //   p: 'Homework Requests',
    //   color: '#FFD28F',
    //   bg: '#FFE7C2',
    // },
  ]
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/chats')
  }
  let profile_img = data1?.studentResponse?.user_id?.profile_image_url
  const handleClose = () => {
    setIsShow(false);
  }
  return (
    <>
      {data1?.show === true && isShow && (
        <div className={classes.top1}>
          <h1>This Student’s Plan is about to end please Make a plan for this student</h1>
          <button onClick={handleClose}>x</button>
        </div>
      )}
      <div className={classes.main_div}>
        <Heading heading={'Student Profile'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} />
        <button onClick={() => navigate(`/student/details/${id}/editstu`)}>Edit Student Profile</button>
      </div>
      <div>
        <FallbackImage imgData={profile_img} cls={classes.img1} />
        <div className={classes.curr_top}>
          <p>{data1?.studentResponse?.preferred_name}</p> <span onClick={popupHandler} style={{ cursor: "pointer" }}>View Details</span>
        </div>
        <div className={classes.curr_div}>
          <p>{data1?.studentResponse?.user_id?.email}</p>
          <p>{data1?.studentResponse?.curriculum_name}</p>
          <p>Joined <Moment format="YYYY">{data.createdAt}</Moment></p>
        </div>
        <div className={classes.btn_div}>
          <button className={classes.btn1} onClick={handleNavigate}>Message</button>
          <button className={classes.btn2} onClick={handleOpen}>Add Class bundle</button>
        </div>

        {/* <DataDivCon data={data} cls={classes.data_div_con} /> */}
        <Outlet />
        <div className={classes.sb_div}>
          <div className={classes.toggle_btns}>
            <button onClick={() => setInx(0)} className={inx === 0 ? classes.active : ''}> Classe Bundles</button>
            <button onClick={() => setInx(1)} className={inx === 1 ? classes.active : ''}>Payments</button>
          </div>
          {inx == 0 && <div className={classes.wd}>
            {/* <label className={classes.label1}>Select Teacher</label> */}
            <select className={classes.input_div1} value={teacher} onChange={(e) => setTeacher(e.target.value)}>
              <option value="">Select Teacher</option>
              {teacherData && teacherData?.map((element, index) => (<option key={index} selected value={element.user_id}>{element.preferred_name}</option>))}
            </select>
          </div>}
          {inx == 1 && <DatePicker className={classes.choose_date} onChange={onChange} value={value} />}
        </div>
        {
          renderDiv[inx]
        }

      </div>
      {show && <ViewProfileModal id={id} isPopup={show} popupFunc={setShow} />}
      {show1 && <AddClassBundle id={id} isPopup={show1} func={getClasses} popupFunc={setShow1} />}
    </>
  )
}

export default StudentDetails
