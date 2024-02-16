import React, { useState } from 'react'
import classes from './MainNavbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import search from '../../assets/search.png'
import SearchBar from '../SearchBar/SearchBar'
import { AiOutlineBell } from 'react-icons/ai'
import { BsCalendarWeek } from 'react-icons/bs'
import { BiMessageDetail } from 'react-icons/bi'
import dp from '../../assets/dp1.png'
import Sidebar from '../Sidebar/Sidebar'
import Notifications from '../Notifications/Notifications'


const MainNavbar = () => {
    const [notification, setNotification] = useState(false)
    const [searchbar, setSearchbar] = useState("");
    const [showResults, setShowResults] = useState(false);

    const name = 'pumeet'

    const [sidebar, setSidebar] = useState(false)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/chats')
    }

    const staticResults = [
        { label: "Dashboard", route: "/dashboard" },
        { label: "Students", route: "/student" },
        { label: "Payment", route: "/payment" },
        { label: "Classes", route: "/classes" },
        { label: "Chats", route: "/chats" },
        { label: "Support", route: "/support" },
        { label: "Profile", route: "/profile" },
        // Add more static results as needed
    ];
    const filteredResults = staticResults.filter(
        (item) => item.label.toLowerCase().includes(searchbar.toLowerCase())
    );

    return (
        <>
            {notification && <Notifications setterFunc={setNotification} />}
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
                        {/* <SearchBar cls={classes.sb} /> */}
                        <div className={classes.search_bar}>
                            <img src={search} alt="" />
                            <input placeholder='Search...' type="text" value={searchbar}
                                onChange={(e) => {
                                    setSearchbar(e.target.value);
                                    setShowResults(true);
                                }} />
                            {showResults && searchbar && (
                                <div className={classes.nav_div1}>
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((item, index) => (
                                            <div key={index}>
                                                <Link
                                                    to={item.route}
                                                    className="w-100"

                                                    key={item.route}
                                                    onClick={() => handleNavigate(item.route)}
                                                >
                                                    <p className="nav_show_div_p">{item.label}</p>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="nav_show_div_p text-center border-0 py-4 fs-6">No data found</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* <button><BsCalendarWeek /></button> */}
                        <button onClick={() => setNotification(!notification)}><AiOutlineBell /></button>
                        <button onClick={handleNavigate}><BiMessageDetail /></button>
                        <div className={classes.profile_con}><img src={dp} alt="" /></div>
                        <button onClick={() => setSidebar(true)}>s</button>
                    </div>


                </div>
            </header>
        </>
    )
}

export default MainNavbar