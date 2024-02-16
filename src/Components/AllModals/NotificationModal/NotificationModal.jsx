import React from 'react'
import classes from './NotificationModal.module.css'
import Modal from '../../Modal/Modal'
import Moment from 'react-moment'

const NotificationModal = (props) => {
    let data = props?.myData
    return (
        <Modal cls={`${classes.popup}`} value={props.isPopup} Func={props.popupFunc}>
            <div className={classes.header}>
                <>Notifications</>
                <span className={classes.span}>
                    {data?.time_diff}
                    {/* <Moment format="DD/MM/YYYY">{data?.createdAt}</Moment> */}
                </span>
            </div>
            <div className={classes.body}>
                <p className={classes.p}>
                {data?.description}
                </p>
            </div>
            <div className={classes.bottom}>
                <button onClick={()=>{props.popupFunc(!props.isPopup)}}>Cancel</button>
            </div>
        </Modal>
    )
}

export default NotificationModal
