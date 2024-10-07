import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import axios from 'axios'
import styles from "./SlotModal.module.css"
import BlackButton from '../BlackButton/BlackButton'
import Modal from '../Modal/Modal'
import { BASE_URL } from '../../Apis/BaseUrl'
import AddMoreInput from '../LabelledInput/AddMoreInput'

const AddNewSlots = ({ popupFunc, isPopup, func, data1 }) => {
  const [isLoading, setIsLoading] = useState(false)

  const props_ = {
    cls: styles.popup,
    value: isPopup,
    Func: popupFunc,

  }

  const { register, handleSubmit, unregister, reset, formState: { errors } } = useForm()



  const studentToken = Cookies.get('tutorazzi_academic')
  const getStuToken = JSON.parse(studentToken)


  const token = getStuToken;

  let id = data1?._id
  console.log(id)

  const submitHandler = async (data) => {

    let newData = {
      ...data
    };
    const myToast = toast.loading('Please Wait...')
    setIsLoading(true)
    try {
      const response = await axios.patch(`${BASE_URL}/reject-reschedule-request/${id}`,
        newData, {
        headers: {
          'Authorization': `Bearer ${token?.access_token}`,
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
    }
    catch (error) {
      console.error('Error while uploading data:', error);

      toast.update(myToast, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 1500
      });
    } finally {
      setIsLoading(false);
      popupFunc(!isPopup)
    }
  }


  const labelData = { "label": "Date & Time", "type": "datetime-local", "id": "start_time" }

  return (
    <Modal {...props_} >
      <h3  style={{marginBottom:"20px", fontWeight:500}}>Schedule Class</h3>
      <form onSubmit={handleSubmit(submitHandler)}>
        <AddMoreInput cls2={styles.inp}
                  unregister={unregister}  // Pass unregister here
        data={labelData} register={register} errors={errors} minCount={3} maxCount={5} name="+ Add more dates" />
        <div className={styles.bottom}>
          <button type='button' onClick={() => popupFunc(false)} >Cancel</button>
          <BlackButton disabled={isLoading}>Send Request</BlackButton>
        </div>
      </form>
    </Modal>
  )
}

export default AddNewSlots
