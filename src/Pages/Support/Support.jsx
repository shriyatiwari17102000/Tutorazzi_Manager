// import React, { useState } from 'react'
// import classes from './Support.module.css'
// import DataDivCon from '../../MappableDivs/DataDivCon/DataDivCon'
// import Heading from '../../Components/Heading/Heading'
// import BlackButton from '../../Components/BlackButton/BlackButton'
// import SupportFoldContainer from '../../Components/AllFolds/Support/SupportFoldContainer'
// import Pagination from '../../Components/Pagination/Pagination'


// const data = [
//     {
//         h1: '35',
//         p: 'New Trial Class Request',
//         color: '#BCCFFF',
//         icon: 'a',
//         bg: '#DBE5FF',
//         link: ''
//     },
//     {
//         h1: '35',
//         p: 'Reschedule Request',
//         color: '#FFE198',
//         icon: 'b',
//         bg: '#FFF3D6',
//         link: ''
//     }]

// const Support = () => {

//     const [num,setNum] = useState(1)

//     const btnsHandler = num => {
//         setNum(num)
//     }

//     return (
//         <React.Fragment>
//             <DataDivCon data={data} cls={classes.data_div_con} />
//             <Heading heading={'Support'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
//                 <BlackButton cls={classes.black_btn} >Add Ticket</BlackButton>
//             </Heading>
//             <div className={classes.btns}>
//                 <button className={num===1 ? classes.active : ''} onClick={()=>btnsHandler(1)}>All Tickets</button>
//                 <button className={num===2 ? classes.active : ''} onClick={()=>btnsHandler(2)}>Resolved Ticket</button>
//                 <button className={num===3 ? classes.active : ''} onClick={()=>btnsHandler(3)}>Past Ticket</button>
//             </div>


//             <SupportFoldContainer />

//             <Pagination />

//         </React.Fragment>
//     )
// }

// export default Support

import React, { useEffect, useState } from 'react'
import SupportCard from './SupportCard'
import { useNavigate } from 'react-router-dom'
import classes from "./Support.module.css"
import Heading from '../../Components/Heading/Heading'
import BlackButton from '../../Components/BlackButton/BlackButton'
import SupportModal from '../../Components/AllModals/SupportModal/SupportModal'
import Cookies from 'js-cookie'
import axios from 'axios'
import { BASE_URL } from '../../Apis/BaseUrl'
import NewPagination from '../../Components/NewPagination/NewPagination'

const Support = () => {
  const[data, setData]  = useState([])
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
    const [show, setShow] = useState(false)
    const popupHandler = () => setShow(!show)

    
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token
    const getData = async () => {
    
      let register = `${BASE_URL}/tickets?limit=${limit}&page=${page}`
      console.log(register)
      let res = await axios.get(register, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.data)
      setPageInfo({ ...res.data.data, docs: null })
      setData(res.data.data?.docs)
    }
    useEffect(() => {
      getData()
    }, [limit, page])
  
    const paginationProps = {
      setPage,
      pageInfo
    }
    return (
        <div>
                  <Heading heading={'Support'}  >
                <BlackButton 
                func={popupHandler} funcVal={show} 
                cls={classes.btn}
                >Add Ticket</BlackButton>
            </Heading>
         {data.length > 0 ? <>
         {
          data.map((item)=> (
            <SupportCard open={true} data={item}  />
                     ))}  <NewPagination {...paginationProps}/></> : "no data found"}
            {/* <SupportCard closed={true} /> */}
          {show &&  <SupportModal func={getData} isPopup={show} popupFunc={setShow} />}
        </div>
    )
}

export default Support
