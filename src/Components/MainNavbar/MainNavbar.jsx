import React, { useState } from 'react'
import classes from './MainNavbar.module.css'
import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { AiOutlineBell } from 'react-icons/ai'
import { BsCalendarWeek } from 'react-icons/bs'
import { BiMessageDetail } from 'react-icons/bi'
import dp from '../../assets/dp1.png'
import Sidebar from '../Sidebar/Sidebar'


const MainNavbar = () => {
    const name = 'pumeet'

    const [sidebar, setSidebar] = useState(false)

    return (
        <>
            {sidebar && <Sidebar sidebarHandler={setSidebar} />}
            <header className={classes.header}>

                <div className={classes.header_child}>
                    <nav className={classes.nav}>
                        <h2 className={classes.heading}>Tutorazzi</h2>
                        <NavLink className={({ isActive }) =>
                            isActive ? classes.active : ""
                        } to={'/dashboard'} >Overview</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? classes.active : ""
                        } to={'/payment'} >Payments</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? classes.active : ""
                        } to={'/classes'} >Classes</NavLink>
                        <NavLink className={({ isActive }) =>
                            isActive ? classes.active : ""
                        } to={'/support'} >Support</NavLink>
                    </nav>
                    <div className={classes.btns_con}>
                        <SearchBar cls={classes.sb} />
                        {/* <button><BsCalendarWeek /></button> */}
                        <button><AiOutlineBell /></button>
                        <button><BiMessageDetail /></button>
                        <div className={classes.profile_con}><img src={dp} alt="" /></div>
                        <button onClick={() => setSidebar(true)}>s</button>
                    </div>


                </div>
            </header>
        </>
    )
}

export default MainNavbar