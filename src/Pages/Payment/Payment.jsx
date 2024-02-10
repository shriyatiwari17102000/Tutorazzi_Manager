import React, { Fragment } from 'react';
import Heading from '../../Components/Heading/Heading'
import classes from './Payment.module.css'
import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon'
import SearchBar from '../../Components/SearchBar/SearchBar';
import PaymentCard from '../../Components/PaymentCard/PaymentCard';
import Pagination from '../../Components/Pagination/Pagination';


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

  return (
    <Fragment>
      <DataDivCon data={data} cls={classes.data_div_con} />
      <Heading heading={'Payments'} p={'You can see your Payments here and manage them'} >
        <div className={classes.sb}>
          <SearchBar />
        </div>
      </Heading>

      <div className={classes.container}>
        <PaymentCard />
        <PaymentCard />
        <PaymentCard />
      </div>

      <Pagination />

    </Fragment>
  )
}

export default Payment