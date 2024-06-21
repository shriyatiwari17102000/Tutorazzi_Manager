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


const ProfileStu = (props) => {
  const[profile, setProfile] = useState("")
  let userdata = props?.data
// console.log(props?.profileUpdater)


let profileTokenJson = Cookies.get("tutorazzi_academic");
let profileToken = JSON.parse(profileTokenJson);
let token = profileToken.access_token;
// console.log(token)
// console.log(profileToken?.user?.profile_image_url)
const updateProfile = () => {
setProfile(props?.data?.user_id?.profile_image_url) 
}

const imageHandler = async(e) => {

  try {
    const formData = new FormData()
     formData.append('photo', e.target.files[0])

    const req = await fetch(`${BASE_URL}/student-photo/${props?.id}`, {
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

    // console.log(result.data?.user_id?.profile_image_url)

     toast.success(result.message)
    // console.log(result.data)
    setProfile(result.data)
    // console.log(result.data)
props?.getData()
  } catch (error) {
    // console.log(error)
    toast.error(error.message)
  }
// }
}

useEffect(() => {
  updateProfile()
 })

 const handleDelete = async(e) => {
  // console.log(e)
    const myToast = toast.loading('Please Wait...')
    try {
      let register = `${BASE_URL}/student-photo/${props?.id}`
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
        
        // Cookies.set("tutorazzi_academic", JSON.stringify({...profileToken, user:{...profileToken.user, profile_image_url:null}}))
        setProfile(null)
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
 console.log(userdata?.preferred_name)
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
        <div className={classes.d2}>
            <h3 style={{textTransform:"capitalize"}}>{userdata?.preferred_name}</h3>
            <h5>Academic Manager</h5>
        </div>
      
    </div>
  )
}

export default ProfileStu