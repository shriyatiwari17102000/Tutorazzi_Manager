import React, { useEffect, useState } from 'react'
import classes from './SlotModal.module.css'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import Modal from "../../Modal/Modal"
import BlackButton from '../../BlackButton/BlackButton'
import { fileChecker } from '../../FileChecker/fileChecker'
import Moment from 'react-moment'
import moment from 'moment'


const SlotModal = ({ popupFunc, isPopup, func, data1 }) => {

    const [itemdata, setItemdata] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(null);

    let id = data1?.classDetails?.id
   

    let profileTokenJson = Cookies.get("tutorazzi_token");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;

    const getSlotData = async () => {
        let register = `${BASE_URL}/slots?id=${id}`
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setData(res.data.data)
    }

    useEffect(() => {
        getSlotData()
    }, [])
    const handleCheckboxChange = (index, item) => {
        console.log(index)
        setIsChecked(index);
        setItemdata(item)
    };
    const handleDataUpload = async () => {
        // e.preventDefault()
      
          const bdy = {
            start_time : isChecked,
            
          }
          const register = `${BASE_URL}/select-slot/${id}`
      
          const myToast = toast.loading('Please Wait...')
          setLoading(true)
          try {
              const response = await axios.patch(register, bdy, {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              })
      
              console.log(response)
              if (!response.data.success) {
                  throw new Error(response.data.message)
              }
              toast.update(myToast, {
                  render: response.data.message,
                  type: 'success',
                  isLoading: false,
                  autoClose: 1500
              });
              func()
          } catch (error) {
              console.error('Error while uploading data:', error);
          
              toast.update(myToast, {
                  render: error.message,
                  type: 'error',
                  isLoading: false,
                  autoClose: 1500
              });
          }
          finally {
              popupFunc(!isPopup)
            
              setLoading(false)
          }
      };
    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Schedule Slot'} p={'Select slots that is suitable for you'} />
            </div>

            <div className={classes.body}>

                {data?.slots ? data?.slots?.map((item, index) => (
                    // console.log(item)
                    <label className={classes.label}>
                        <input
                            type="checkbox"
                            checked={isChecked === index}
                            className={classes.input_box}
                            onChange={() => handleCheckboxChange(index, item)}
                           
                        />
                    
                        <p>{moment(item).format('DD/MM/YYYY')}</p>
                        <p>{moment(item).format('hh:mm A')}</p>
                       
                    </label>
                )) : "no slots available!"}



            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <BlackButton disabled={isLoading} func={handleDataUpload}>Accept</BlackButton>
            </div>
        </Modal>
    )
}

export default SlotModal