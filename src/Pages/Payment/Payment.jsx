import React, { Fragment, useEffect, useState } from 'react';
import Heading from '../../Components/Heading/Heading'
import classes from './Payment.module.css'
import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon'
import SearchBar from '../../Components/SearchBar/SearchBar';
import PaymentCard from '../../Components/PaymentCard/PaymentCard';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../Apis/BaseUrl';
import axios from 'axios';
import NewPagination from '../../Components/NewPagination/NewPagination';
import PaymentGraph from './PaymentGraph';
import Container from '../../UI/Container/Container';
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';  
import moment from 'moment';


const data = [
  {
    h1: '3500',
    p: 'Wallet Amount',
    color: '#BCCFFF',
    icon: 'a',
    bg: '#DBE5FF',
    link: ''
  },
  {
    h1: '4100',
    p: 'Other State',
    color: '#FFE198',
    icon: 'b',
    bg: '#f3f4ff',
    link: ''
  }]



const Payment = () => {
  const[paymentData, setPaymentData] = useState([])
  const[limit, setLimit] = useState(10)
  const[page, setPage] = useState(1)
  const[pageInfo, setPageInfo] = useState({})
  const[search, setSearch] = useState('')
const[graphData, setGraphData] = useState([])
const [value, onChange] = useState('');
const [years, setYears] = useState([]);
const [selectedYear, setSelectedYear] = useState('');

  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token
  const getPayment = async () => {
    let dateValue = value ? moment(value).format('YYYY-MM-DD') : " "; 
    let register = `${BASE_URL}/payments?limit=${limit}&page=${page}&search=${search}&date=${dateValue}`
    // console.log(register)
    let res = await axios.get(register, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data.data)
    setPaymentData(res.data.data?.docs)
    setPageInfo({ ...res.data.data, docs: null })
  }
  useEffect(() => {
    getPayment()
  }, [limit, page, search, value])
  
const paginationProps = {
  setPage,
  pageInfo
}
const getGraphData = async () => {
  const axiosData = `${BASE_URL}/payment-stats?year=${selectedYear}`
  let res = await axios.get(axiosData, {
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
}, [selectedYear])

const fetchYears = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/years`,    {headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }});
    const availableYears =  response.data.data;
    console.log(response.data.data)
    setYears(response.data.data);
    const currentYear = new Date().getFullYear();

    setSelectedYear(currentYear); // Set the first year as the default selected year
  } catch (error) {
    console.error('Error fetching years:', error);
  }
};
useEffect(() => {
  fetchYears();
}, []);

console.log(years, "years")
  return (
    <Fragment>
      {/* <DataDivCon data={data} cls={classes.data_div_con} /> */}
      <Heading heading={'Payments'} p={'You can see your Payments here and manage them'} />
    <Container  cls={classes.cont}>
      <Heading heading={'Stats Section'}   cls={classes.cont1} />
    <PaymentGraph graphData={graphData} selectedYear={selectedYear} setSelectedYear={setSelectedYear} years={years} setYears={setYears}/>
      <Heading heading={'Monthly Payments'}   cls={classes.cont2} />
    </Container>
      <Heading heading={'Payments Details'} p={''} >
        <div className={classes.sb_div} >
          <SearchBar cls={classes.sb}  search={search} setSearch={setSearch} />
          <DatePicker className={classes.choose_date} onChange={onChange} value={value} />
        </div>
      </Heading>

      <div className={classes.container}>
       {paymentData?.length > 0 ?  <>
        {paymentData?.map((item)=>(
          <PaymentCard data={item} />
        
        ))}
        <NewPagination {...paginationProps}/>
        </> : "no data found"}
        {/* <PaymentCard />
        <PaymentCard /> */}
      </div>

      {/* <Pagination /> */}

    </Fragment>
  )
}

export default Payment