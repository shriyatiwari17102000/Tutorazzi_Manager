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

const ClassIndex = () => {

    const [upcomingData, setUpcomingData] = useState([])
    const [pastData, setPastData] = useState([])
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [search, setSearch] = useState('');
    const [value, onChange] = useState('');

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getRescheduleData = async () => {
        let dateValue = value ? moment(value).format('YYYY-MM-DD') : " "; 
        let register = `${BASE_URL}/upcoming-classes?limit=${limit}&page=${page}&search=${search}&date=${dateValue}`
        console.log(register)
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
        getRescheduleData()
    }, [limit, page, search, value])

    const getPastData = async () => {
        let dateValue = value ? moment(value).format('YYYY-MM-DD') : " "; 
        let register = `${BASE_URL}/past-classes?limit=${limit}&page=${page}&search=${search}&date=${dateValue}`
        console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setPageInfo({ ...res.data.data, docs: null })
        setPastData(res.data.data?.docs)
    }
    useEffect(() => {
        getPastData()
    }, [limit, page, search, value])

    const paginationProps = {
        setPage,
        pageInfo
    }

    const [inx, setInx] = useState(0)

    const renderDiv = {
        0: <ClassCardCon link={'upcoming-details'} data={upcomingData} paginationProps={paginationProps} />,
        1: <ClassCardCon link={'past-details'} data={pastData} paginationProps={paginationProps} />
    }


    return (
        <React.Fragment>
            <Heading cls={classes.heading} heading={'Classes'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} />
            <div className={classes.sb_div}>
                <div className={classes.toggle_btns}>
                    <button onClick={() => setInx(0)} className={inx === 0 ? classes.active : ''}>Upcoming Classes</button>
                    <button onClick={() => setInx(1)} className={inx === 1 ? classes.active : ''}>Past Classes</button>
                </div>
          <div className={classes.sb_div}>
          <SearchBar cls={classes.sb} search={search} setSearch={setSearch} />
                <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
          </div>

            </div>

            {
                renderDiv[inx]
            }



        </React.Fragment>
    )
}

export default ClassIndex
