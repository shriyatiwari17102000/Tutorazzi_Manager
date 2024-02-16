import React, { useEffect, useState } from 'react'
import Modal from '../../Modal/Modal'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import ToasterUpdate from '../../Toaster/ToasterUpdate'
import { BASE_URL } from '../../../Apis/BaseUrl'
import classes from "./StuProfile.module.css"
import Moment from 'react-moment'
import BundleCard from './BundleCard/BundleCard'
import AddExtraClass from '../Quote/AddExtraClass'
import Container from '../../../UI/Container/Container'

const BundleDetail = ({ popupFunc, isPopup, func, data1, stuId }) => {
    const[bundles, setBundles] = useState([])
    const[bundleInfo, setBundleInfo] = useState([])
    console.log(data1)
    const [show, setShow] = useState(false)
    const [isShow, setIsShow] = useState(true);
// let ClosePop = popupFunc
    const handleClose = () => {
      setIsShow(false);
    }

    const handleShow = () => {
        setShow(!show)
        // ClosePop(!isPopup)
    }
let id = data1._id
// console.log(id)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token



    const getDetail = async () => {

        const register = `${BASE_URL}/bundle-details?quote_id=${id}`
               let response = await axios.get(register, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token} `,
                },
            })

            console.log(response.data.data)
            setBundleInfo(response.data.data)
            setBundles(response.data.data?.bundles)
    }

useEffect(()=>{
    getDetail()
},[])

    return (
        <>
            <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
             {/* {bundleInfo?.show == true &&    <div className={classes.top}>
                  <h1>Student request to increase their class subscripton</h1>
                  <button>x</button>
                </div>} */}
                 {bundleInfo?.show === true && isShow && (
        <div className={classes.top1}>
          <h1>Student request to increase their class subscription</h1>
          <button onClick={handleClose}>x</button>
        </div>
      )}

                <div className={classes.body}>
                    <div>
                        <h5 className={classes.h5}>Bundle Details</h5>
                        <div className={classes.flex2}>
                            <div className={classes.middle}>
                                <div className={classes.row}>
                                    <p>Teacher</p>
                                    <span>{bundleInfo?.teacher_name}</span>
                                </div>
                                <div className={classes.row}>
                                    <p>Purchased</p>
                                    <span><Moment format="DD/MM/YYYY">{bundleInfo?.purchased_date}</Moment></span>
                                </div>
                                <div className={classes.row}>
                                    <p>Class Remaining</p>
                                    <span>{bundleInfo?.classRemaining} </span>
                                </div>
                            </div>
                            <button onClick={handleShow}>Add Extra Class</button>
                        </div>
                    </div>
                  <Container cls={classes.cont}>
                  <div className={classes.view_height}>
                        {bundles?.length > 0 ? <>{bundles?.map((item) =>   <BundleCard data={item} func={getDetail} />)}</> : "no classes found!"}
                        
                    </div>
                  </Container>
                </div>


            </Modal>
            {show && <AddExtraClass data1={bundleInfo} id={stuId} isPopup={show} func={getDetail} popupFunc={setShow} />}
        </>
    )
}

export default BundleDetail