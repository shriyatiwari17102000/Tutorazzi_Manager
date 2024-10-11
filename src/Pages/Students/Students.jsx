import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import SearchBar from '../../Components/SearchBar/SearchBar'
import classes from './Students.module.css'
import Container from '../../UI/Container/Container'
import UserDiv from '../../Components/UserDiv/UserDiv'
import { FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../Apis/BaseUrl'
import axios from 'axios'
import NewPagination from '../../Components/NewPagination/NewPagination'


const Students = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const[total, setTotal] = useState('')

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token
  
    const getData = async () => {
    
      let register = `${BASE_URL}/all-students?limit=${limit}&page=${page}&search=${search}`
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
      setTotal(res.data.data)
    }
    useEffect(() => {
      getData()
    }, [limit, page, search])
  
    const paginationProps = {
      setPage,
      pageInfo
    }
    // console.log(data[0].user_id)
    return (
        <React.Fragment>
            <Heading heading={`All Students (${total?.totalDocs})`} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'}>
            
                <div className={classes.sb}>
                    <SearchBar search={search} setSearch={setSearch} />
                </div>
            </Heading>
      
            <div>
                {data?.length > 0 ? <div>
              <div className={classes.box}>
              {
                  data?.map((element, index) => (
                    <Link to={`details/${element?.user_id?._id}`} key={index} className={classes.student}>
                        <UserDiv cls={classes.my_student_Card} data={element} >
                        <FaChevronRight className={classes.i} />
                        </UserDiv>
                    </Link>
                ))}
              </div>
                <NewPagination {...paginationProps}/>
                </div>: "no data found!"}
            </div>
        </React.Fragment>
    )
}

export default Students
