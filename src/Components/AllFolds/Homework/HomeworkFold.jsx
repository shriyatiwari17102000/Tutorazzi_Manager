import React, { useState } from 'react'
import Foldable from '../../Foldable/Foldable'
import classes from './Homework.module.css'
import greenTick from '../../../assets/check-contained.png'
import BlackButton from '../../BlackButton/BlackButton'
import Moment from 'react-moment'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import { toast } from 'react-toastify'
import axios from 'axios'

const HomeworkFold = (props) => {
    const[loading, setLoading] = useState(false)
    const {data} = props
    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;
    const id = data?._id

    const downloadFile = (
        filePath
      ) => {
        let fileName = filePath
      
        fetch(`https://tutorrazzi-prvx.onrender.com/${filePath}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
        })
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
    
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
    
            document.body.appendChild(link);
    
            link.click();
    
            link.parentNode.removeChild(link);
          });
      };

    const handleRequest = async() => {
      
            const register = `${BASE_URL}/request-re-upload/${id}`
    
            const myToast = toast.loading('Please Wait...')
            setLoading(true)
            try {
                const response = await axios.patch(register, {}, {
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
                setLoading(false)
            }
        };
        // console.log(props?.data?.answer_document_id && )
       
    // console.log(data)
    return (
        <Foldable open={props.open} cls={classes.fold}>
            <div className={classes.fold_header}>
                <h5>{data?.title}</h5>
                <img src={greenTick} alt="" />
            </div>
            <div className={classes.fold_body}>
                <p>Due Date : <Moment format="DD/MM/YYYY" utc>{data?.due_date}</Moment></p>
                <p>
              {data?.description}
                </p>
                <div className={classes.btns}>
                    <button onClick={() => downloadFile(data?.answer_document_id?.name)}>Download Homework</button>
                    <button style={{background:"black", color:"white"}} onClick={handleRequest} disabled={loading}>Re-Upload Request</button>
                </div>
            </div>
        </Foldable>
    )
}

export default HomeworkFold
