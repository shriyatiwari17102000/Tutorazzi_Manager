import React, { useEffect, useState } from 'react'
import classes from './ClasssesPages.module.css'
import Heading from '../../../Components/Heading/Heading'
import SearchBar from '../../../Components/SearchBar/SearchBar'
import DateButton from '../../../Components/DateButton/DateButton'
import ClassCard from '../../../Components/ClassCard/ClassCard'
import Pagination from '../../../Components/Pagination/Pagination'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';  
import NewPagination from '../../../Components/NewPagination/NewPagination'
import axios from 'axios'
import moment from 'moment'

const data = {
  title: 'Maths Class',
  resource:'lorem lorem lorem lorm lorem',
  student:'Puneet Shrivastav',
  request_date:'13/08/2023',
  tags: ['notify-teacher','resolve']
}

const ResourceReq = () => {
  const [resourceData, setResourceData] = useState([])
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [value, onChange] = useState('');
  const [search, setSearch] = useState('');

  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token

  const getResourceData = async () => {
    let dateValue = value ? moment(value).format('YYYY-MM-DD') : " "; 
    let register = `${BASE_URL}/resource-requests?limit=${limit}&page=${page}&search=${search}&date=${dateValue}`
    console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setPageInfo({ ...res.data.data, docs: null })
    setResourceData(res.data.data?.docs)
  }
  useEffect(() => {
    getResourceData()
  }, [limit, page, search, value])

  const paginationProps = {
    setPage,
    pageInfo
  }
  return (
    <React.Fragment>
      <Heading cls={classes.heading} heading={'Resource Requests'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'}>
         <div className={classes.sb_div}>
         <SearchBar cls={classes.sb} search={search} setSearch={setSearch}/>
         <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
         </div>
      </Heading>
      {resourceData.length > 0 ? <div>
        {resourceData.map((item, index)=> (
      <ClassCard resource={true} layout={1} data={item}  />
      ) )}
      <NewPagination {...paginationProps} />
      </div> : "No data found!"}
    

    </React.Fragment>
  )
}

export default ResourceReq
