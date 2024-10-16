// import React from 'react'
// import classes from './Sidebar.module.css'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { RxCross2 } from 'react-icons/rx'
// import img from '../../assets/dp.png'
// import { createPortal } from 'react-dom'
// import { ImSwitch } from "react-icons/im";
// import Cookies from 'js-cookie'

// const MySidebar = props => {
//   const navigate = useNavigate()
//   const handleLogout = () => {
//     navigate('/')
//     Cookies.remove("tutorazzi_academic")
//   }
//   return (
//     <div className={classes.sidebar}>
//       <div className={classes.top}>
//         <h2>
//           Tutorazzi
//         </h2>
//         <button className={classes.side_bn} onClick={() => { props.sidebarHandler(false) }}><RxCross2 /></button>
//       </div>

//       <div onClick={() => { props.sidebarHandler(false) }} className={classes.middle}>
//         <h5>Generals</h5>
//         <NavLink className={classes.link} to={'/dashboard'}>
//           Dashboard
//         </NavLink>
//         <NavLink className={classes.link} to={'/student'}>
//           Student Info
//         </NavLink>
//         <NavLink className={classes.link} to={'/teacher'}>
//           All Teachers
//         </NavLink>
//         <NavLink className={classes.link} to={'/payment'}>
//           Payment
//         </NavLink>
//         <NavLink className={classes.link} to={'/classes'}>
//           Classes
//         </NavLink>
//         <NavLink className={classes.link} to={'/chats'}>
//           Chats
//         </NavLink>
        
//         <br />
//         <h5>Other Links</h5>
//         {/* <NavLink className={classes.link} to={'/'}>
//           Profile
//         </NavLink> */}
//         {/* <NavLink className={classes.link} to={'/'}>
//           Preferences
//         </NavLink>
//         <NavLink className={classes.link} to={'/'}>
//           Role
//         </NavLink> */}
//         <NavLink className={classes.link} to={'/support'}>
//           Support
//         </NavLink>
//         <NavLink className={classes.link} to={'/profile'}>
//           Profile
//         </NavLink>
//         <NavLink className={classes.link} to={'/'}>
//         </NavLink>
//       </div>

//       <div className={classes.bottom} onClick={handleLogout} >
//         <button className={classes.logout_button}>
//           <ImSwitch /> Logout
//         </button>
//       </div>
//     </div>
//   )
// }

// const MyOverlay = (props) => {
//   return (
//     <div onClick={() => { props.sidebarHandler(false) }} className={classes.overlay}></div>
//   )
// }


// const Sidebar = (props) => {
//   return (
//     <>
//       {createPortal(<MySidebar sidebarHandler={props.sidebarHandler} />, document.getElementById('modal'))}
//       {createPortal(<MyOverlay sidebarHandler={props.sidebarHandler} />, document.getElementById('overlay'))}
//     </>
//   )
// }

// export default Sidebar.


import React from 'react'
import classes from './Sidebar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import {ImSwitch} from 'react-icons/im'
import Cookies from 'js-cookie'

const Sidebar = (props) => {
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
        <button className={classes.side_bn} onClick={() => { props.onSidebarBtn(false) }}><RxCross2 /></button>
      </div>

      <div onClick={() => {props.onSidebarBtn(false)}} className={classes.middle}>
        <h5>Generals</h5>
        <NavLink className={classes.link} to={'/dashboard'}>
          Overview
        </NavLink>
        <NavLink className={classes.link} to={'/student'}>
         Student Info
        </NavLink>
        <NavLink className={classes.link} to={'/teacher'}>
        All Teachers
        </NavLink>
        <NavLink className={classes.link} to={'/payment'}>
          Payment
        </NavLink>
        <NavLink className={classes.link} to={'/classes'}>
          Classes
        </NavLink>
        {/* <NavLink className={classes.link} to={'/reschedule-request'}>
          Reschedule Classes
        </NavLink>
        <NavLink className={classes.link} to={'/trial-request'}>
          Trial Classes
        </NavLink> */}
        <NavLink className={classes.link} to={'/resource-request'}>
          Resource Requests
        </NavLink>
        <NavLink className={classes.link} to={'/homework-request'}>
          Homework Pending
        </NavLink>
        <NavLink className={classes.link} to={'/chats'}>
          Chats
        </NavLink>
        
        <br />
        <h5>Other Links</h5>
        <NavLink className={classes.link} to={'/profile'}>
          Profile
        </NavLink>
        {/* <NavLink className={classes.link} to={'/'}>
          Preferences
        </NavLink> */}
        <NavLink className={classes.link} to={'/support'}>
          Support
        </NavLink>
        {/* <NavLink className={classes.link} to={'/'}>
          Notifications
        </NavLink> */}
      </div>

      <div onClick={handleLogout} className={classes.bottom}>
        <button className={classes.logout_button}>
          <ImSwitch /> Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar