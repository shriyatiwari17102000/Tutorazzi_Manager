import React from 'react'
import classes from './Navbar.module.css'

import search from '../../assets/search.png'
import setting from '../../assets/setting.png'
import calender from '../../assets/cal.png'
import alert from '../../assets/alert.png'
import dp from '../../assets/dp.png'
import cd from '../../assets/cd.png'

const Navbar = (props) => {

  const sidebarHandler = () => {
    props.onSideberBtn(true)
  }

  return (
    <header className={classes.navbar}>
      <div className={classes.search_bar}>
        <img src={search} alt="" />
        <input placeholder='Search...' type="text" />
      </div>
      <div className={classes.nav_body}>
        <div className={classes.nav_btn}>
          <img src={alert} alt="" />
        </div>
        <div className={classes.nav_btn}>
          <img src={setting} alt="" />
        </div>
        <div className={classes.nav_btn}>
          <img src={calender} alt="" />
        </div>
        <div className={classes.nav_profile}>
          <div>
            <img src={dp} alt="" />
            <p>Puneet Shrivastav</p>
            <img src={cd} alt="" />
          </div>
        </div>
        <button onClick={sidebarHandler} className={classes.sidebar_open_btn}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
    </header>
  )
}

export default Navbar