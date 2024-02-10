import React from 'react'
import Heading from '../../Components/Heading/Heading'
import SearchBar from '../../Components/SearchBar/SearchBar'
import classes from './Teachers.module.css'
import Container from '../../UI/Container/Container'
import UserDiv from '../../Components/UserDiv/UserDiv'
import { data } from './Data'
import { FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom'


const Teachers = () => {
    return (
        <React.Fragment>
            <Heading heading={'All Teachers'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'}>
                <div className={classes.sb}>
                    <SearchBar />
                </div>
            </Heading>
            <div className={classes.box}>
                {data.map((element, index) => (
                    <Link to={'details'} key={index} className={classes.teacher}>
                        <UserDiv cls={classes.my_teacher_card} data={element} >
                            <h6 className={classes.review}>5.0 (503 reviews)</h6>
                        </UserDiv>
                        <FaChevronRight className={classes.i} />
                    </Link>
                ))}
            </div>
        </React.Fragment>
    )
}

export default Teachers
