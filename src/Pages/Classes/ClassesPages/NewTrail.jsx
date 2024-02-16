import React, { useEffect, useState } from 'react'
import classes from './ClasssesPages.module.css'
import Heading from '../../../Components/Heading/Heading'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import DateButton from '../../../Components/DateButton/DateButton'
import ClassCard from '../../../Components/ClassCard/ClassCard'
import Pagination from '../../../Components/Pagination/Pagination'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import NewPagination from '../../../Components/NewPagination/NewPagination'
import moment from 'moment'

const NewTrial = () => {
  const [trialData, setTrialData] = useState([])
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [value, onChange] = useState('');
  const [search, setSearch] = useState('');

  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token

  const getTrialData = async () => {
    let dateValue = value ? moment(value).format('YYYY-MM-DD') : " ";
    let register = `${BASE_URL}/trial-classes?limit=${limit}&page=${page}&search=${search}&date=${dateValue}`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setPageInfo({ ...res.data.data, docs: null })
    setTrialData(res.data.data?.docs)
  }
  useEffect(() => {
    getTrialData()
  }, [limit, page, search, value])

  const paginationProps = {
    setPage,
    pageInfo
  }
  const navigate = useNavigate()

  const mylinks = {
    'true': `/classes/trial-past-details`,
    'false' :`/classes/trial-details`
  }

  const links = (data) => {
    // console.log(data.is_past)
    let link = mylinks[`${data.is_past}`] + `/${data._id}`
    // console.log(mylinks[`false`])
    // console.log(link)
    navigate(link)
  }

  return (
    <React.Fragment>
      <Heading cls={classes.heading} heading={'New Trial Classes'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'}>
        <div className={classes.sb_div}>
          <SearchBar cls={classes.sb} search={search} setSearch={setSearch} />
          <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
        </div>
      </Heading>
      {trialData.length > 0 ? <div>
        {trialData.map((item) => (
          <div onClick={() => links(item)} style={{ textDecoration: "none" }}>
            <ClassCard data={item} tags={["accept", 'reschedule', "cancel"]} />
          </div>
        ))}
        <NewPagination {...paginationProps} />
      </div> : "No data found!"}

    </React.Fragment>
  )
}

export default NewTrial
