import React, { useEffect, useState } from 'react'
import classes from './Video.module.css'
import Heading from '../../Heading/Heading'
import Modal from "../../Modal/Modal"


const VideoModal = ({ popupFunc, isPopup, video_url }) => {

    const [itemdata, setItemdata] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(null);

    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Intro Video'} p={'Select slots that is suitable for you'} />
            </div>

            <div className={classes.body}>

            <iframe
                                height="300"
                                src={video_url}
                                width="100%"
                                frameBorder="0"
                                style={{
                                    borderRadius: '5px',
                                    paddingRight: '20px',
                                    paddingLeft: '5px',
                                    paddingTop: '10px',
                                }}
                                className="mx-2"
                                allowFullScreen
                            ></iframe>



            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
          
            </div>
        </Modal>
    )
}

export default VideoModal