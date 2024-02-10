import React from 'react'
import classes from './ProfileDiv.module.css'
import img from '../../assets/profile.png'

const ProfileDiv = () => {
  return (
    <div className={classes.profile_div}>
        <img src={img} alt="" />
        <div>
            <h3>Puneet Shrivastav</h3>
            <h5>puneetsri9990@gmail.com</h5>
            <h5>+91 9311676139</h5>
        </div>
    </div>
  )
}

export default ProfileDiv