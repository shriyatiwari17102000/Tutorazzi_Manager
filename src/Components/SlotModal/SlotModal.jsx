import React, { useEffect, useState } from 'react'
import classes from './SlotModal.module.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import Moment from 'react-moment'
import moment from 'moment'
import AddNewSlots from './AddNewSlots'
import Heading from '../Heading/Heading'
import Modal from '../Modal/Modal'
import BlackButton from '../BlackButton/BlackButton'
import { BASE_URL } from '../../Apis/BaseUrl'


const SlotModal = ({ popupFunc, isPopup, func, data1 }) => {

    const [itemdata, setItemdata] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(null);
    const [isSecondPopup, setSecondPopup] = useState(false); // State to manage second modal


    let id = data1?.classDetails?._id || data1?._id
    console.log(id)


    let profileTokenJson = Cookies.get("tutorazzi_academic");
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
        setData(res.data.data?.slots)
    }

    useEffect(() => {
        getSlotData()
    }, [])

    const handleCheckboxChange = (index, item) => {
        console.log(index)
        setIsChecked(index);
        setItemdata(item)
    };
    console.log(isChecked, itemdata)
    const handleSendNewTimings = () => {
        setSecondPopup(true); // Open the second modal when clicked
    };
    const handleDataUpload = async () => {
        // e.preventDefault()
        let bdy = {
            start_time: itemdata
        }
        console.log(bdy)

        const register = `${BASE_URL}/accept-class/${id}`

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
        <>
            <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
                <div className={classes.top}>
                    <Heading heading={'Schedule Slot'} p={'Select slots that is suitable for you'} />
                </div>

                <div className={classes.body}>

                    {data?.map((item, index) => (
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
                    ))}



                </div>

                <div className={classes.bottom}>
                    <button type='submit' onClick={handleSendNewTimings}>Send New Timings</button>
                    <BlackButton disabled={isLoading} func={handleDataUpload}>Accept</BlackButton>
                </div>
            </Modal>
            {isSecondPopup && (
                <AddNewSlots isPopup={isSecondPopup} popupFunc={setSecondPopup} func={func} data1={data1} />
            )}
        </>
    )
}

export default SlotModal