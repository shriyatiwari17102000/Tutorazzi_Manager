import React, { useState } from 'react'
import classes from './Layout.module.css'

// import Navbar from '../../Components/Navbar/Navbar'
// import Sidebar from '../../Components/Sidebar/Sidebar'
import MainNavbar from '../../Components/MainNavbar/MainNavbar'
import MainFooter from '../../Components/MainFooter/MainFooter'


const Layout = (props) => {

  // const [sidebar, setSidebar] = useState(false)

  //   const sidebarToggleHandler = () =>{
  //       sidebar===true?setSidebar(false):setSidebar(true)
  //   }


  return (
    <div className={classes.layout}>
        <MainNavbar />
        <div>{props.children}</div>
        {/* <MainFooter /> */}
    </div>
  )
}

export default Layout