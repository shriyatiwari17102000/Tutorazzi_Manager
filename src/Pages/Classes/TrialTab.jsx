import React, { useEffect, useState } from 'react'
import ClassCardCon from '../../MappableDivs/ClassCardCon/ClassCardCon'
import ClassCard from '../../Components/ClassCard/ClassCard'
import { BASE_URL } from '../../Apis/BaseUrl'
import Cookies from 'js-cookie'
import axios from 'axios'
import classes from './Classes.module.css'
import { Link, useNavigate } from 'react-router-dom'
import NewPagination from '../../Components/NewPagination/NewPagination'
import TrialClassCard from '../../Components/ClassCard/TrialClassCard'

const TrialTab = (props) => {
    // console.log("jjjjjjjjj")
    // const [data, setData] = useState([])
    // const [limit, setLimit] = useState(10);
    // const [page, setPage] = useState(1);
    // const [pageInfo, setPageInfo] = useState({});
    // const tutToken = Cookies.get("tutorazzi_token")
    // const getTutToken = JSON.parse(tutToken)
    // const token = getTutToken.access_token

    // const getData = async () => {
    //     let register = `${BASE_URL}/trial-classes-requests?limit=${limit}&page=${page}`
    //     console.log(register)
    //     let res = await axios.get(register, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     console.log(res.data.data.docs)
    //     setPageInfo({...res.data.data, docs: null})
    //     setData(res.data.data.docs)
    // }

    // useEffect(() => {
    //     getData()
    // }, [])

    
    // const paginationProps = {
    //     setPage,
    //     pageInfo
    //   }

    let data = props?.data
    const navigate = useNavigate()

    const mylinks = {
      'true': `/classes/past-details`,
      'false': `/classes/trial-upcoming-details`
    }
  
    const links = (event, data) => {
      console.log(data.is_past)
      let link = mylinks[`${data.is_past}`] + `/${data._id}`
      if (event.target.id != "button") {
        navigate(link)
      }
    //   navigate(link)
    }

    return (<>
    {data?.length > 0 ? <>
        <div className={`${classes.container} ${props.cls}`}>
            {data?.map((element, index) => (
                // <Link key={index} className={classes.link}   onClick={(event) => links(event,element)}>
                //      <TrialClassCard data1={element} trial={true} func={props.func}/>
                // </Link>
                <div id="div" key={index} className={classes.link} onClick={(event) => links(event,element)} style={{ textDecoration: "none" }}>
                    <TrialClassCard data1={element} trial={true} func={props.func}/>
                </div>
            ))}
        </div>  
        <NewPagination {...props.paginationProps}/> </> : "data not found"}
        </>
    )
}

export default TrialTab