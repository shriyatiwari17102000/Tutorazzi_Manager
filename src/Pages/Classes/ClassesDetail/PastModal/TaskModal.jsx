import React, { useState } from 'react'
import classes from './Taskmodal.module.css'
import Modal from '../../../../Components/Modal/Modal'
import Heading from '../../../../Components/Heading/Heading'
import BlackButton from '../../../../Components/BlackButton/BlackButton'
import Moment from 'react-moment'
import greenTick from '../../../../assets/check-contained.png'
import alert from '../../../../assets/alert-triangle.png'
import Container from '../../../../UI/Container/Container'
import ViewTaskDetail from './ViewTaskDetail'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../../Apis/BaseUrl'


const TaskModal = (props) => {
    const [isLoading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [ID, setID] = useState('')

    console.log(props.data)
    const handleShow = (id) => {
        setOpenModal(true)
        setID(id)
    }



    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;

    const handleMark = async (id) => {

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

    console.log(props.data)
    let data = props?.data
    console.log(data?.taskData)
    return (
        <>
            <Modal cls={classes.popup} value={props.isPopup} Func={props.popupFunc}>

                <Heading heading={'Urgent Doubt Solving'} p={'You can see urgent doubt here'} />


                <Container cls={`${classes.fold_body}`}>
                    {data?.doubtResponse?.length > 0 ?
                        data?.doubtResponse?.slice()?.reverse()?.map((item, index) => (

                            <div className={classes.card}>
                                <div className={classes.header}>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <h5>{item.title}</h5>
                                        <div className={classes.ss_div}>
                                            <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", textDecoration: "underline", fontSize: "13px", marginRight: "10px", cursor: "pointer" }} onClick={() => handleShow(item._id)} >View Detail</h4>
                                            <img src={item.status === "Resolved" ? '/done.png' : '/alert.png'} alt="" />
                                        </div>
                                    </div>

                                </div>
                                <p className={classes.p}>
                                    <Moment format="DD/MM/YYYY" utc>{item.due_date}</Moment>
                                </p>
                                   
                                    </div>
                        ))
                        : <p>no data found!</p>
                    }
                </Container>

                <div className={classes.bottom}>
                    <button onClick={() => { props.popupFunc(!props.isPopup) }}>Cancel</button>

                </div>
            </Modal>
            {openModal && <ViewTaskDetail id={ID} isPopup={openModal} popupFunc={setOpenModal} />}
        </>
    )
}

export default TaskModal