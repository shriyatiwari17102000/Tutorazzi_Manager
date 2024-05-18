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
import ViewHomeworkDetail from './ViewHomeworkDetail'




const HomeWorkModal = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const[ID, setID] = useState('')
console.log(props)
    const handleShow = (id) => {
        setOpenModal(true)
        setID(id)
    }

    console.log(props.data)
    let data = props?.data
    console.log(data)

   
    const downloadFile = (
        filePath
      ) => {
          console.log(filePath)
        let fileName = filePath
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
            link.download = fileName;
    
            document.body.appendChild(link);
    
            link.click();
    
            link.parentNode.removeChild(link);
          });
      };
    return (
        <>
            <Modal cls={classes.popup} value={props.isPopup} Func={props.popupFunc}>

                <Heading heading={'Homework Detail'} p={'You can see homework here'} />


                <Container cls={classes.fold_body}>

                    {data?.length > 0 ? data?.slice().reverse().map((item) => (
                        <div className={classes.fold_div}>
                            <div className={classes.fold_header}>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <h5>{item.title}</h5>
                                    <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", textDecoration: "underline", fontSize: "13px", marginRight: "10px", cursor : "pointer" }} onClick={()=>handleShow(item._id)} >View Detail</h4>
                                </div>
                                {/* <img src={imgSource} alt="" /> */}
                                {item.status === "ReUpload" || item.status == "Resolved" ? <img src={greenTick} alt="" /> : <img src={alert} alt="" />}
                            </div>
                            <p className={classes.para}> Due Date : <Moment format='DD/MM/YYYY'>{item.due_date}</Moment></p>
                            {/* <p className={classes.para} style={{ marginTop: '10px' }}>{item.description}</p> */}
                            {item.status === "ReUpload" || item.status == "Resolved" && <div className={classes.btns2} style={{ display: "flex" }}>
                                {console.log(item?.answer_document_id?.document_url)}
                                <button onClick={()=> downloadFile(item?.answer_document_id?.document_url)}>Download Homework</button>
                                <button onClick={() => handleRequest(item._id)}>Request Reupload</button>
                            </div>}
                        </div>
                    )) : <p>no data found!</p>}
                </Container>

                <div className={classes.bottom}>
                    <button onClick={() => { props.popupFunc(!props.isPopup) }}>Cancel</button>

                </div>
            </Modal>
            {openModal && <ViewHomeworkDetail isPopup={openModal} id={ID} popupFunc={setOpenModal} />}
        </>
    )
}

export default HomeWorkModal