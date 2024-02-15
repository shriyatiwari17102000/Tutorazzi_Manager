import React from 'react'
import StuDetailCard from './StuDetailCard'
import NewPagination from '../../../Components/NewPagination/NewPagination'

const StuDetailMap = (props) => {
    const {data} = props
    
  return (
    <>
       {data?.length > 0 ? <>
       {data?.map((item, index) => (
                <StuDetailCard data={item} key={index} id={props?.id}/>
       ))
       }<NewPagination {...props.paginationProps}/></> : "no data found!"}
    </>
  )
}

export default StuDetailMap