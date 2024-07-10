import React from 'react'
import classes from "./Dash.module.css"
import { useNavigate } from 'react-router-dom'
import { MdArrowOutward } from 'react-icons/md'
import FallbackImage from '../../../Components/FallbackImgae/FallbackImage'

const PendingStu = ({data}) => {
  console.log(data)
  const navigate = useNavigate()
  return (
    <div className={classes.cont1}>
        <div className={classes.inn_div3}>
            <FallbackImage imgData={data?.user_id?.profile_image_url}/>
            <h5>{data?.preferred_name}</h5>
            <p></p>
            <button className={classes.btn1} onClick={()=> navigate(`/student/details/${data?.user_id?._id}`)}>View Profile <MdArrowOutward />
            </button>
        </div>
        <button>Pending</button>
    </div>
  )
}

export default PendingStu