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
import alert from '../../../assets/alert-triangle.png'
import ViewHomeworkDetail from '../../../Pages/Classes/ClassesDetail/PastModal/ViewHomeworkDetail'

const HomeworkFold = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const [ID, setID] = useState('')
    const [loading, setLoading] = useState(false)

    const handleShow = (id) => {
        setOpenModal(true)
        setID(id)
    }
    const { data } = props
    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;
    const id = data?._id

    const downloadFile = (
        filePath, name
    ) => {
        let fileName = filePath
        console.log(fileName)

        fetch(`${filePath}`, {
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
                link.download = name;

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
            });
    };

    const handleRequest = async () => {

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
            props?.func()
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

    console.log(data)
    return (
        <>
            <Foldable open={props.open} cls={`${classes.fold} ${props?.cls}`}>
                <div className={classes.fold_header}>
                    {/* <h5>{data?.title}</h5> */}
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <h5>{data?.title}</h5>
                        <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", textDecoration: "underline", fontSize: "13px", marginRight: "10px", cursor: "pointer" }} onClick={() => handleShow(data?._id)} >View Detail</h4>
                    </div>
                    {data.status === "Resolved" ? <img src={greenTick} alt="" /> : <img src={alert} alt="" />}

                </div>
                <div className={classes.fold_body}>
                    <p>Due Date : <Moment format="DD/MM/YYYY" utc>{data?.due_date}</Moment></p>
                    <p>
                        {data?.description}
                    </p>
                    {data.status === "Resolved" && <div className={classes.btns2} style={{ display: "flex" }}>
                            <button onClick={() => downloadFile(data?.answer_document_id?.document_url, data?.answer_document_id?.name)}>Download Homework</button>
                            <button style={{ background: "rgba(66, 77, 182, 1)" }} onClick={() => handleRequest(data._id)}>Request Reupload</button>
                        </div>}
                    {/* <div className={classes.btns}>
                        <button onClick={() => downloadFile(data?.answer_document_id?.document_url)}>Download Homework</button>
                        <button style={{ background: "black", color: "white" }} onClick={handleRequest} disabled={loading}>Re-Upload Request</button>
                    </div> */}
                </div>
            </Foldable>
            {openModal && <ViewHomeworkDetail isPopup={openModal} id={ID} popupFunc={setOpenModal} />}
        </>
    )
}

export default HomeworkFold
