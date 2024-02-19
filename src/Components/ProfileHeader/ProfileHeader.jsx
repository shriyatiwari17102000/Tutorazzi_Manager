import React from 'react'
import classes from './ProfileHeader.module.css'
import ProfileDiv from '../ProfileDiv/ProfileDiv'

const ProfileHeader = (props) => {
  return (
    <div className={classes.header}>
        <ProfileDiv data={props?.user_info} getData={props?.getData} profileUpdater={props?.profileUpdater} />
    </div>
  )
}

export default ProfileHeader