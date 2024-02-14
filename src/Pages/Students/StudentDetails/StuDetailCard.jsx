import React, { useState } from 'react'
import classes from './StudentDetails.module.css'
import BundleDetail from '../../../Components/AllModals/StuProfile/BundleDetail'

const StuDetailCard = (props) => {
    const[show, setShow] = useState(false)
    const handleOpen = () => setShow(!show)
    const {data} = props
    console.log(data)
    return (
        <>
        <div className={classes.card} onClick={handleOpen}>
            <div>
                <h1>{data?.subject_name} {data?.class_count && <span className={classes.cls_span}>x{data?.class_count}</span>}</h1>
                <div className={classes.flex}>
                    {data?.curriculum_name && <p>{data?.curriculum_name} Curriculum </p>}
                    <p>Due Date : <>20/02/2023</></p>
                </div>
            </div>
            <div>
                {data.status == "Pending" && <button type='button' className={classes.pend}>Pending</button>}
                {data.status == "Paid" && <button type="button" className={classes.don}>All Done</button>}
            </div>
        </div>
        {show && <BundleDetail isPopup={show} popupFunc={setShow} data1={data} />}
        </>
    )
}

export default StuDetailCard