import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading/Heading'
import SearchBar from '../../Components/SearchBar/SearchBar'
import classes from './Teachers.module.css'
import Container from '../../UI/Container/Container'
import UserDiv from '../../Components/UserDiv/UserDiv'
import { FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../Apis/BaseUrl'
import axios from 'axios'
import NewPagination from '../../Components/NewPagination/NewPagination'


const Teachers = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token
  
    const getData = async () => {
    
      let register = `${BASE_URL}/all-teachers?limit=${limit}&page=${page}&search=${search}`
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
    }, [limit, page, search])
  
    const paginationProps = {
      setPage,
      pageInfo
    }

    return (
        <React.Fragment>
            <Heading heading={'All Teachers'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'}>
                <div className={classes.sb}>
                    <SearchBar search={search} setSearch={setSearch} />
                </div>
            </Heading>
            <div className={classes.box}>
                {data.length > 0 ? <>
                  {data.map((element, index) => (
                    <Link to={`details/${element.user_id}`} key={index} className={classes.teacher}>
                        <UserDiv cls={classes.my_teacher_card} data={element} >
                            <h6 className={classes.review}>{element.ratings} ({element.reviews} reviews)</h6>
                        </UserDiv>
                        <FaChevronRight className={classes.i} />
                    </Link>
                )) }
                <NewPagination {...paginationProps} />
                </>: "no data found"}
            </div>
        </React.Fragment>
    )
}

export default Teachers
