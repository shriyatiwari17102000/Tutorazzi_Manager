import React, { useEffect, useState } from 'react'
import classes from './Taskmodal.module.css'
import Modal from '../../../../Components/Modal/Modal'
import Heading from '../../../../Components/Heading/Heading'
import BlackButton from '../../../../Components/BlackButton/BlackButton'
import Moment from 'react-moment'
import greenTick from '../../../../assets/check-contained.png'
import alert from '../../../../assets/alert-triangle.png'
import Container from '../../../../UI/Container/Container'
import axios from 'axios'
import { BASE_URL } from '../../../../Apis/BaseUrl'
import Cookies from "js-cookie"
import {MdOutlineFileDownload} from "react-icons/md"

const ViewTaskDetail = (props) => {
    const [taskData, setTaskData] = useState({})

    let id = props?.id
    console.log(props.data)
    let data = props?.data
    console.log(data?.taskData)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getTaskData = async () => {
        // console.log("hhhhhhhhhhh")
        let register = `${BASE_URL}/doubt-details?id=${id}`
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setTaskData(res.data.data)
    }

    useEffect(() => {
        getTaskData()
    }, [])
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
    return (
        <Modal cls={classes.popup} value={props.isPopup} Func={props.popupFunc}>

            <Heading heading={'Doubt Information'} p={'You can see task information here'} />


            <Container cls={`${classes.fold_body} ${classes.w1}`}>

                <div>


                    <div className={classes.task}>
                        <h4> Title</h4>
                        <p> <span>{taskData?.title}</span></p>
                    </div>
                   {taskData?.answer &&  <div className={classes.task}>
                        <h4>Answer</h4>
                        <p>{taskData?.answer}</p>
                    </div>}
                    {taskData?.answer_document_id?.document_url && <div className={classes.task}>
                        <h4 className={classes.para}>Answer pdf</h4>
                        <p className={classes.p2} onClick={() => downloadFile(taskData?.answer_document_id?.document_url, taskData?.answer_document_id?.name)}>Download  <a

                            style={{ textAlign: "center", fontSize: "16px", cursor: "pointer" }}
                        >
                            <MdOutlineFileDownload />
                        </a></p>
                    </div>
                    }
                    <div className={classes.task}>
                        <h4 className={classes.para}>Due Date</h4>
                        <p> <Moment format='DD/MM/YYYY'>{taskData?.due_date}</Moment></p>
                    </div>
                   



                </div>

            </Container>

            <div className={classes.bottom}>
                <button onClick={() => { props.popupFunc(!props.isPopup) }}>Cancel</button>

            </div>
        </Modal>
    )
}

export default ViewTaskDetail