// import React from 'react'
// import classes from './ProfileDiv.module.css'
// import img from '../../assets/profile.png'

// const ProfileDiv = () => {
//   return (
//     <div className={classes.profile_div}>
//         <img src={img} alt="" />
//         <div>
//             <h3>Puneet Shrivastav</h3>
//             <h5>Academic Manager</h5>
//             {/* <h5>+91 9311676139</h5> */}
//         </div>
//     </div>
//   )
// }

// export default ProfileDiv


import React, { useEffect, useState } from 'react'
import classes from './ProfileDiv.module.css'
import img from '../../assets/profile.png'
import { FaPencilAlt } from 'react-icons/fa'
import FallbackImage from '../FallbackImgae/FallbackImage'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../Apis/BaseUrl'
import { RiDeleteBinLine } from "react-icons/ri";


const ProfileDiv = (props) => {
  const[profile, setProfile] = useState("")
  let userdata = props?.data
console.log(userdata)


let profileTokenJson = Cookies.get("tutorazzi_token");
let profileToken = JSON.parse(profileTokenJson);
let token = profileToken.access_token;
console.log(profileToken?.user?.profile_image_url)
const updateProfile = () => {
  if (profileToken?.user?.profile_image_url) {
    setProfile(profileToken?.user?.profile_image_url)
  }
}

const imageHandler = async(e) => {
  try {
    const formData = new FormData()

    formData.append('profile_image', e.target.files[0])

    console.log( e.target.files[0])


    const req = await fetch(`${BASE_URL}/photo`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })


    const result = await req.json()
    if (!result.success) {
      throw new Error(result.message)
    }

    console.log(result.data?.user_id?.profile_image_url)

    // console.log(user.profile_image_url)
    let new_user = {
      ...profileToken,
      user:{
        ... profileToken.user, 
        profile_image_url : result.data?.user_id?.profile_image_url
        }
      // profile_image_url: result.data?.user_id?.profile_image_url
    }
//     ... Profiletoken, 
// User:{
// ... Profiletoken.User, 
// Profile_image:profiletoken.user.profile_image_url
// }
    console.log(new_user)
    Cookies.set('tutorazzi_token', JSON.stringify(new_user))
    toast.success(result.message)
    console.log(result.data)
    setProfile(result.data?.user_id?.profile_image_url)
    console.log(result.data?.user_id?.profile_image_url)

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}
console.log(profileToken)
console.log(profile)
useEffect(() => {
  updateProfile()
 }, [])
  return (
    <div className={classes.profile_div}>
       <label htmlFor="profile" className={classes.prof_label}>
        {props.icon &&  <div className={classes.icons_div}>
          <span  >
            <FaPencilAlt/>
          </span>
          <span  >
          <RiDeleteBinLine />

          </span></div>}
          <FallbackImage imgData={profile} cls={classes.img_div} alt="Profie Picture" />
          <input onChange={imageHandler} type="file" id='profile' name="profile" style={{display:"none"}} />
        </label>
        {/* <img src={img} alt="" /> */}
        <div>
            <h3 style={{textTransform:"capitalize"}}>{userdata?.preferred_name}</h3>
            <h5>Academic Manager</h5>
            {/* <h5>+91 9311676139</h5> */}
        </div>
        {/* <img src={img} alt="" />
        <div>
            <h3>Puneet Shrivastav</h3>
            <h5>puneetsri9990@gmail.com</h5>
        </div> */}
    </div>
  )
}

export default ProfileDiv