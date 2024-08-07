import React, { useState } from 'react'
import classes from './TaskCard.module.css'
import Container from '../../UI/Container/Container'
import Moment from 'react-moment'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../Apis/BaseUrl'
import { toast } from 'react-toastify'
import axios from 'axios'
import ViewTaskDetail from '../../Pages/Classes/ClassesDetail/PastModal/ViewTaskDetail'
const TaskCard = props => {
    const [isLoading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [ID, setID] = useState('')

    const handleShow = (id) => {
        setOpenModal(true)
        setID(id)
    }
    // console.log(props.data)
    let id = props?.data?._id
    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;

    const handleMark = async () => {

        const register = `${BASE_URL}/mark-task-done/${id}`

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
            popupFunc(!isPopup)
            setFile(null)
            setLoading(false)
        }
    };
    return (
        <>
            <Container cls={classes.card}>
                <div className={classes.header}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <h5>{props?.data?.title}</h5>
                      <div className={classes.ss_div}>
                      <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", textDecoration: "underline", fontSize: "13px", marginRight: "10px", cursor: "pointer" }} onClick={() => handleShow(props?.data?._id)} >View Detail</h4>
                      <img src={props?.data?.status === "Resolved" ? '/done.png' : '/alert.png'} alt="" />
                      </div>
                    </div>
                    
                </div>
                <p className={classes.p}>
                    <Moment format="DD/MM/YYYY" utc>{props?.data?.due_date}</Moment>
                </p>

                {/* {props?.data?.status === "Pending" &&
                    <button type='button' onClick={handleMark} className={classes.btn} disabled={isLoading}>Mark Done</button>} */}
            </Container>
            {openModal && <ViewTaskDetail id={ID} isPopup={openModal} popupFunc={setOpenModal} />}
        </>
    )
}

export default TaskCard
