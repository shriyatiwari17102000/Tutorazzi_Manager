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

const BundleDetail = ({ popupFunc, handleClose1, isPopup, bundleInfo1, func, data1, stuId, setShowModal, setShowModal1, showModal1, showModal }) => {
    const [bundles, setBundles] = useState([])
    const [bundleInfo, setBundleInfo] = useState([])
    const [isShow, setIsShow] = useState(true);
    // const [showModal, setShowModal] = useState(false)

    console.log(showModal, "1")
    const handleShow = () => {
        console.log(showModal, "2a")
        console.log("showmodal")
        setShowModal(true)
        console.log(showModal, "2b")
        handleClose1()
        // console.log(handleClose1())
    }
    const handleTransfer = () => {
        console.log(showModal1, "2a")
        console.log("showmodal")
        setShowModal1(true)
        console.log(showModal1, "2b")
        handleClose1()
        // console.log(handleClose1())
    }
  console.log(showModal1, "3")

    console.log(data1)
    const handleClose = () => {
        setIsShow(false);
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
        bundleInfo1(response.data.data)
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <>
            <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
                
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
                           
                        </div>
                    </div>
                    <Container cls={classes.cont}>
                        <div className={classes.view_height}>
                            {bundles?.length > 0 ? <>{bundles?.map((item) => <BundleCard data={item} func={getDetail} />)}</> : "no classes found!"}

                        </div>
                    </Container>
                    <div className={classes.butn_div}>
                    <button  onClick={()=>{popupFunc(!isPopup)}}>Cancel</button>
                    <button onClick={handleShow} style={{background:"rgba(176, 183, 255, 1)", color:"rgba(66, 77, 182, 1)"}}>Add Extra Class</button>
                    <button onClick={handleTransfer} style={{background:"rgba(66, 77, 182, 1)", color:"white"}}>Transfer Remaining classes</button>
                   
                    </div>
                </div>


            </Modal>
            {/* {showModal && <AddExtraClass data1={bundleInfo} id={stuId} isPopup={showModal} func={getDetail} popupFunc={setShowModal} />} */}
        </>
    )
}

export default BundleDetail