import React, { useState } from 'react'
import classes from './SupportModal.module.css'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import LabelledInput from "../../LabelledInput/LabelledInput"
import Modal from "../../Modal/Modal"
import BlackButton from '../../BlackButton/BlackButton'
import FileLabel from '../../FileLabel/FileLabel'


const SupportModal = ({ popupFunc, isPopup, func }) => {
    // console.log(popupFunc)
    // console.log(func)
    console.log("ghfdghdfg")
    const [subject, setSubject] = useState("")
    const [priority, setPriority] = useState("High")
    const [query, setQuery] = useState("")
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setLoading] = useState(false)

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    let profileTokenJson = Cookies.get("tutorazzi_token");
    let profileToken = JSON.parse(profileTokenJson);
    // console.log(profileToken.access_token)
    let token = profileToken.access_token;

    const handleDataUpload = async () => {
        // alert('clicked')
        // console.log("yyyy")
        const formData = new FormData();
        formData.append('title', subject);
        formData.append('category', priority);
        formData.append('description', query);
        if (selectedImage) {
            formData.append('file', selectedImage);
        }
        const register = `${BASE_URL}/support`

        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
            const response = await axios.post(register, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
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
            setSubject("")
            setQuery("")
            setPriority("")
            setSelectedImage(null)
            setLoading(false)
        }
    };
    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Add Ticket'} p={'Add a ticket for query'} />
            </div>

            <div className={classes.body}>
              <LabelledInput func={setSubject} value={subject} id={'subject'} label={'Subject'} />
                {/* <LabelledInput func={setPriority} value={priority} id={'priority'} label={'Priority'} /> */}

              <div >
                <label className={classes.label1}>Category</label>
                <select className={classes.input_div1}>
                    <option selected value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
              </div>
              
                <div className={classes.txtarea}>
                    <label htmlFor="txt">Description</label>
                    <textarea id="txt" onChange={handleQueryChange} value={query}></textarea>
                </div>

                <FileLabel id={'attachment'} label={'Attachment'} setter={handleImageChange} />

                {/* <label htmlFor="">Attachment</label>
                <input type="file" style={{ border: "1px solid #d9d9d9", width: "100%", padding: "10px" }} onChange={handleImageChange} /> */}

            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <BlackButton disabled={isLoading} func={handleDataUpload}>Add Ticket</BlackButton>
            </div>
        </Modal>
    )
}

export default SupportModal