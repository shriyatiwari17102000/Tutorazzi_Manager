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
import axios from 'axios'


const ProfileDiv = (props) => {
  const[profile, setProfile] = useState("")
  let userdata = props?.data
// console.log(userdata)


let profileTokenJson = Cookies.get("tutorazzi_academic");
let profileToken = JSON.parse(profileTokenJson);
let token = profileToken.access_token;
// console.log(token)
// console.log(profileToken?.user?.profile_image_url)
const updateProfile = () => {
  if (profileToken?.user?.profile_image_url) {
    setProfile(profileToken?.user?.profile_image_url)
  }
}

const imageHandler = async(e) => {

  try {
    const formData = new FormData()
     formData.append('photo', e.target.files[0])

    const req = await fetch(`${BASE_URL}/photo`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })


    const result = await req.json()
    console.log(result)
    if (!result.success) {
      throw new Error(result.message)
    }

    console.log(result.data?.user_id?.profile_image_url)

    let new_user = {
      ...profileToken,
      user:{
        ... profileToken.user, 
        profile_image_url : result.data?.user_id?.profile_image_url
        }
    }

    Cookies.set('tutorazzi_academic', JSON.stringify(new_user))
    toast.success(result.message)
    console.log(result.data)
    setProfile(result.data?.user_id?.profile_image_url)
    console.log(result.data?.user_id?.profile_image_url)

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
// }
}
// console.log(profileToken)
// console.log(profile)
useEffect(() => {
  updateProfile()
 }, [])

 const handleDelete = async(e) => {
  // console.log(e)
    const myToast = toast.loading('Please Wait...')
    try {
      let register = `${BASE_URL}/photo`
      const response = await axios.delete(register,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        toast.update(myToast, {
          render: response.data.message,
          type: 'success',
          isLoading: false,
          autoClose: 1500
        });
        
        props.getData()
    } catch (error) {
      toast.update(myToast, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 1500
      })
      console.error('Error deleting resource:', error);
    }
  
 }
  return (
    <div className={classes.profile_div}>
       <label className={classes.prof_label}>
        {props.icon &&  <div className={classes.icons_div}>
          <div >
            <FaPencilAlt />
            <input onChange={(e) => imageHandler(e)} type="file"  name="profile" id='profile' style={{display:"none"}} />
          </div>
          <button className={classes.del_btn}>
          <RiDeleteBinLine id='btn' onClick={(e)=>handleDelete(e)} />

          </button></div>}
          <FallbackImage imgData={profile} cls={classes.img_div} alt="Profie Picture" />
         
        </label>
        {/* <img src={img} alt="" /> */}
        <div className={classes.d2}>
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