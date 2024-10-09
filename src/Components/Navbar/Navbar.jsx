// import React, { useState } from 'react'
// import classes from './Navbar.module.css'
// import Cookies from 'js-cookie';
// import search from '../../assets/search.png'
// import setting from '../../assets/setting.png'
// import alert from '../../assets/alert.png'
// import dp from '../../assets/dp.png'
// import cd from '../../assets/cd.png'
// import Notifications from '../Notifications/Notifications'
// import FallbackImage from '../FallbackImgae/FallbackImage'
// import { AiOutlineBell } from 'react-icons/ai'

// const Navbar = (props) => {
//   const [notification, setNotification] = useState(false)
//   const sidebarHandler = () => {
//     props.onSideberBtn(true)
//   }
//   let profileToken = Cookies.get("tutorazzi_academic") && JSON.parse(Cookies.get("tutorazzi_academic"));
//   let img = profileToken?.user?.profile_image_url

//   return (
//     <>
//       {notification && <Notifications setterFunc={setNotification} />}

//       <header className={classes.navbar}>
//         <div className={classes.search_bar}>
//           <img src={search} alt="" />
//           <input placeholder='Search...' type="text" />
//         </div>
//         <div className={classes.nav_body}>
//           {/* <div className={classes.nav_btn}>
//             <img src={alert} alt="" />
//           </div>
//           <div className={classes.nav_btn}>
//             <img src={setting} alt="" />
//           </div> */}

// <button onClick={() => setNotification(!notification)}><AiOutlineBell /></button>
//                         <div className={classes.profile_con} onClick={() => navigate('/profile')}><FallbackImage imgData={img} /></div>
//           <div className={classes.nav_profile}>
//             <div>
//               <img src={dp} alt="" />
//               <p>Puneet Shrivastav</p>
//               <img src={cd} alt="" />
//             </div>
//           </div>
//           <button onClick={sidebarHandler} className={classes.sidebar_open_btn}>
//             <div></div>
//             <div></div>
//             <div></div>
//           </button>
//         </div>
//       </header>
//     </>
//   )
// }

// export default Navbar

import React, { useEffect, useState } from 'react'
import classes from './Navbar.module.css'

import search from '../../assets/search.png'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import FallbackImage from '../FallbackImgae/FallbackImage'
import { FaRegBell } from 'react-icons/fa'
import Notifications from '../Notifications/Notifications'

const Navbar = (props) => {
  const [notification, setNotification] = useState(false)
  const [searchbar, setSearchbar] = useState("");
  const [showResults, setShowResults] = useState(false);

  
  let profileToken = Cookies.get("tutorazzi_academic") && JSON.parse(Cookies.get("tutorazzi_academic"));
  console.log(profileToken)

  // useEffect(() => {
 
  //   if (profileToken) {
  //     if (!profileToken.is_complete) {
  //       return navigate("/auth-complete");
  //     }
  //     if (!profileToken.is_approved) {
  //       return navigate("/auth-process");
  //     }

  //   } else {
  //     navigate('/')
  //   }
  // }, []);



  const sidebarHandler = () => {
    props.onSideberBtn(true)
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
  const navigate = useNavigate()
  const handleNavigate = (route) => {
    // navigate("/schedule/sch/");
    navigate(route);
    setShowResults(false);
  };
  let img = profileToken?.user?.profile_image_url
  // console.log(img)

  return (
    <>
      {notification && <Notifications setterFunc={setNotification} />}

      <header className={classes.navbar}>
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
        {/* <div > */}

        {/* </div> */}
        <div className={classes.nav_body}>
          <div onClick={() => setNotification(!notification)} className={classes.nav_btn}>
            <FaRegBell />
          </div>
          <Link to={'/profile'} className={classes.nav_profile}>
            <div className={classes.nav_width}>
              <FallbackImage imgData={img} />
              <p style={{ fontWeight: "500", fontSize: "13px" }}>{profileToken?.user?.name && profileToken?.user?.name?.slice(0, 20).toUpperCase()} </p>

            </div>
          </Link>
          {/* <div className={classes.nav_profile}>
          <div>
            <FallbackImage imgData={img} />
            <p style={{ fontWeight: "500", fontSize:"13px" }}>{profileToken.user.name && profileToken.user.name?.slice(0, 20).toUpperCase()} </p>
          </div>
        </div> */}
          <button onClick={sidebarHandler} className={classes.sidebar_open_btn}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
      </header>
    </>
  )
}

export default Navbar