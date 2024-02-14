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

const BundleDetail = ({ popupFunc, isPopup, func, data1 }) => {
    const[bundles, setBundles] = useState([])
    console.log(data1)
    const [show, setShow] = useState(false)

    const handleShow = () => {
        // popupFunc(false)
        setShow(!show)
    }
let id = data1._id
console.log(id)

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

            console.log(response.data.data?.bundles)
            setBundles(response.data.data?.bundles)
    }

useEffect(()=>{
    getDetail()
},[])
    return (
        <>
            <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
                <div className={classes.top}>
                    <Heading heading={'Add Extra Class'} p={''} />
                </div>

                <div className={classes.body}>
                    <div>
                        <h5 className={classes.h5}>Bundle Details</h5>
                        <div className={classes.flex2}>
                            <div className={classes.middle}>
                                <div className={classes.row}>
                                    <p>Teacher</p>
                                    <span>Shriya</span>
                                </div>
                                <div className={classes.row}>
                                    <p>Purchased</p>
                                    <span><Moment format="DD/MM/YYYY">20/09/2024</Moment></span>
                                </div>
                                <div className={classes.row}>
                                    <p>Class Remaining</p>
                                    <span>Class </span>
                                </div>
                            </div>
                            <button onClick={handleShow}>Add Extra Class</button>
                        </div>
                    </div>
                    <div className={classes.view_height}>
                        {bundles?.length > 0 ? <>{bundles?.map((item) =>   <BundleCard data={item} />)}</> : "no classes found!"}
                        {/* <BundleCard pending={true} />
                        <BundleCard done={true} />
                        <BundleCard scheduled={true} />
                        <BundleCard scheduled={true} />
                        <BundleCard scheduled={true} />
                        <BundleCard scheduled={true} />
                        <BundleCard scheduled={true} /> */}
                    </div>
                </div>


            </Modal>
            {show && <AddExtraClass isPopup={show} popupFunc={setShow} />}
        </>
    )
}

export default BundleDetail