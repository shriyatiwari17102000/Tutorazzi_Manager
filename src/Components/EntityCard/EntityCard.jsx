import React from 'react'
import Container from '../../UI/Container/Container'
import img from '../../assets/dp1.png'
import { BiChevronRight } from 'react-icons/bi'

const EntityCard = () => {
    return (
        <Container cls={classes.contianer}>
            <div className={classes.data_con}>
                <img src={img} alt="Profile" />
                <div>
                    <h5>Puneet Shrivastav</h5>
                    <p>Indian Curriculum</p>
                    <p>MPY05</p>
                </div>
            </div>

            <button className={classes.btn}><Link to={'/'}> <BiChevronRight /></Link></button>
        </Container>
    )
}

export default EntityCard