import React, { useState } from 'react'
import classes from './StudentDetails.module.css'
import BundleDetail from '../../../Components/AllModals/StuProfile/BundleDetail'
import AddExtraClass from '../../../Components/AllModals/Quote/AddExtraClass'
import Moment from 'react-moment'
import TransferModal from '../../../Components/AllModals/Quote/TransferModal'

const StuDetailCard = (props) => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModal1, setShowModal1] = useState(false)
    const [bundleData, setBundleData] = useState({})

    const handleOpen = () => setShow(!show)
    const handleClose = () => setShow(false)
    const { data } = props
    // console.log(data)
    let id = props?.id
    const bundleInfo = (data) => {
        // console.log(data)
        setBundleData(data)
    }
    console.log(bundleData)
    return (
        <>
            <div className={classes.card} onClick={handleOpen}>
                <div>
                    <h1>{data?.subject_name} {data?.class_count && <span className={classes.cls_span}>x{data?.class_count}</span>}</h1>
                    <div className={classes.flex}>
                        {data?.curriculum_name && <p>{data?.curriculum_name} Curriculum </p>}
                        {data?.due_date && <p>Due Date : <Moment format='DD/MM/YYYY'>{data?.due_date}</Moment></p>}
                    </div>
                </div>
                <div>
                    {data?.schedule_status == "pending" && <button type='button' className={classes.pend}>Pending</button>}
                    {data?.schedule_status == "done" && <button type="button" className={classes.don}>All Done</button>}
                </div>
            </div>
            {show && <BundleDetail stuId={id} handleClose1={handleClose} bundleInfo1={bundleInfo} isPopup={show} showModal1={showModal1} showModal={showModal} setShowModal1={setShowModal1} setShowModal={setShowModal} popupFunc={setShow} data1={data} />}
            {/* {showModal1 && <BundleDetail stuId={id} handleClose1={handleClose} bundleInfo1={bundleInfo} isPopup={show} showModal={showModal} setShowModal={setShowModal} popupFunc={setShow} data1={data} />} */}
            {showModal && <AddExtraClass getData={props?.getData} data1={bundleData} id={id} setShow={setShow} show={show} isPopup={showModal} popupFunc={setShowModal} />}
            {showModal1 && <TransferModal getData={props?.getData} data1={bundleData} id={id} setShow={setShow} show={show} isPopup={showModal1} popupFunc={setShowModal1} />}
        </>
    )
}

export default StuDetailCard