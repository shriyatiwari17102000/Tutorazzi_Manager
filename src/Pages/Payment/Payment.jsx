import React, { Fragment, useEffect, useState } from 'react';
import Heading from '../../Components/Heading/Heading'
import classes from './Payment.module.css'
import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon'
import SearchBar from '../../Components/SearchBar/SearchBar';
import PaymentCard from '../../Components/PaymentCard/PaymentCard';
import Pagination from '../../Components/Pagination/Pagination';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../Apis/BaseUrl';
import axios from 'axios';
import NewPagination from '../../Components/NewPagination/NewPagination';
import PaymentGraph from './PaymentGraph';
import Container from '../../UI/Container/Container';


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
    bg: '#FFF3D6',
    link: ''
  }]



const Payment = () => {
  const[paymentData, setPaymentData] = useState([])
  const[limit, setLimit] = useState(10)
  const[page, setPage] = useState(1)
  const[pageInfo, setPageInfo] = useState({})
  const[search, setSearch] = useState('')
const[graphData, setGraphData] = useState([])

  const tutToken = Cookies.get("tutorazzi_academic")
  const getTutToken = JSON.parse(tutToken)
  const token = getTutToken.access_token
  const getPayment = async () => {

    let register = `${BASE_URL}/payments?limit=${limit}&page=${page}&search=${search}`
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
  }, [limit, page, search])
const paginationProps = {
  setPage,
  pageInfo
}
const getGraphData = async () => {
  const axiosData = `${BASE_URL}/payment-stats`
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
}, [])
  return (
    <Fragment>
      {/* <DataDivCon data={data} cls={classes.data_div_con} /> */}
      <Heading heading={'Payments'} p={'You can see your Payments here and manage them'} />
    <Container  cls={classes.cont}>
      <Heading heading={'Stats Section'}   cls={classes.cont1} />
    <PaymentGraph graphData={graphData}/>
      <Heading heading={'Monthly Payments'}   cls={classes.cont2} />
    </Container>
      <Heading heading={'Payments Details'} p={''} >
        <div className={classes.sb}>
          <SearchBar  search={search} setSearch={setSearch}/>
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