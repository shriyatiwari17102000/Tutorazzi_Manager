import React from 'react'
import classes from './Sidebar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import img from '../../assets/dp.png'
import { createPortal } from 'react-dom'
import { ImSwitch } from "react-icons/im";

const MySidebar = props => {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/')
    Cookies.remove("tutorazzi_academic")
  }
  return (
    <div className={classes.sidebar}>
      <div className={classes.top}>
        <h2>
          Tutorazzi
        </h2>
        <button className={classes.side_bn} onClick={() => { props.sidebarHandler(false) }}><RxCross2 /></button>
      </div>

      <div onClick={() => { props.sidebarHandler(false) }} className={classes.middle}>
        <h5>Generals</h5>
        <NavLink className={classes.link} to={'/dashboard'}>
          Dashboard
        </NavLink>
        <NavLink className={classes.link} to={'/student'}>
          Student Info
        </NavLink>
        <NavLink className={classes.link} to={'/payment'}>
          Payment
        </NavLink>
        <NavLink className={classes.link} to={'/classes'}>
          Classes
        </NavLink>
        <NavLink className={classes.link} to={'/chats'}>
          Chats
        </NavLink>
        
        <br />
        <h5>Other Links</h5>
        {/* <NavLink className={classes.link} to={'/'}>
          Profile
        </NavLink> */}
        {/* <NavLink className={classes.link} to={'/'}>
          Preferences
        </NavLink>
        <NavLink className={classes.link} to={'/'}>
          Role
        </NavLink> */}
        <NavLink className={classes.link} to={'/'}>
          Support
        </NavLink>
        <NavLink className={classes.link} to={'/'}>
        </NavLink>
      </div>

      <div className={classes.bottom} onClick={handleLogout} >
        <button className={classes.logout_button}>
          <ImSwitch /> Logout
        </button>
      </div>
    </div>
  )
}

const MyOverlay = (props) => {
  return (
    <div onClick={() => { props.sidebarHandler(false) }} className={classes.overlay}></div>
  )
}


const Sidebar = (props) => {
  return (
    <>
      {createPortal(<MySidebar sidebarHandler={props.sidebarHandler} />, document.getElementById('modal'))}
      {createPortal(<MyOverlay sidebarHandler={props.sidebarHandler} />, document.getElementById('overlay'))}
    </>
  )
}

export default Sidebar