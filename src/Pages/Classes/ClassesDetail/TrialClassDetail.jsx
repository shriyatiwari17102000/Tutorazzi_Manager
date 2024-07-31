import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import classes from './ClassesDetail.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'
import { BiDislike } from 'react-icons/bi'
import { FcLike } from "react-icons/fc";
import SlotModal from '../../../Components/AllModals/ScheduleSlotModal/SlotModal'
import {FiDownload} from "react-icons/fi"

const TrialClassDetail = () => {
    const[data, setData] = useState([])
    const [popup, setPop] = useState(false)
    const popupHandler = () => {
        setPop(!popup) 
    }
    const {id} = useParams()
    console.log(id)
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token
  
    const getData = async () => {
    
      let register = `${BASE_URL}/trial-class-details?class_id=${id}`
      console.log(register)
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
      getData()
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
    console.log(data?.studentDetails?.curriculum)
    return (
        <React.Fragment>
            <Heading heading={'Trial Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} btn={'Show all Slots'} btnFunction={popupHandler} btnValue={popup} >
            </Heading>
            <div className={classes.box}>
                <Container cls={classes.header}>
                    <div className={classes.header_right}>
                        <div className={classes.header_right_profile}>P</div>
                        <div className={classes.header_right_inner}>
                            <h4 className={classes.secondary_heading}>Mathematics Class</h4>
                            {data?.classDetails?.start_time && <>  <h5> <Moment format="hh:mm A">{data?.classDetails?.start_time}</Moment> to <Moment format="hh:mm A">{data?.classDetails?.end_time}</Moment> </h5>
                            <h5><Moment format="DD/MM/YYYY">{data?.classDetails?.start_time}</Moment></h5>
                            </>}
                        </div>
                    </div>
                    <button className={classes.header_btn}>View Recording</button>
                </Container>
                {/* <Container cls={classes.inner_box}>
                    <h4 className={classes.secondary_heading}>Description</h4>
                    <p className={classes.page_para}>
                       {data?.classDetails?.details ? data?.classDetails?.details : "no data found!"}
                    </p>
                   
                </Container> */}
                <Container cls={`${classes.inner_box} ${classes.small_box}  ${classes.sb2}`}>
                    <h4 className={classes.secondary_heading} style={{color: "rgba(66, 77, 182, 1)"}}>Teacher's Details</h4>
                    <UserDiv data={data?.teacherDetails}>
                        <Link className={classes.link} to="/">View Profile</Link>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.inner_box} ${classes.small_box} ${classes.sb2}`}>
                    <h4 className={classes.secondary_heading} style={{color: "rgba(66, 77, 182, 1)"}}>Student's Details</h4>
                    <UserDiv data={data?.classDetails?.student_id} curr={data?.studentDetails?.curriculum}>
                        <Link className={classes.link} to="/">View Profile</Link>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.inner_box}`} >
                    <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", color: "rgba(66, 77, 182, 1)" }} >Inputs by Parent and Student</h4>
                    <div style={{
                        borderBottom: "1px solid #d9d9d9",
                        paddingBottom: "30px"
                    }}>
                        <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500", }}>Student Instruction</h6>
                        <p style={{ fontSize: "14px", color: "#898989" }}>{data?.classDetails?.student_instructions}</p>
                        {data?.classDetails?.student_instruction_document_url &&   <div className={classes.btns}>
                      <button  onClick={()=> downloadFile(data?.classDetails?.student_instruction_document_url, data?.classDetails?.student_instructions_document)}>Student instruction.pdf <FiDownload />
                            </button>
                        </div>}
                       
                    </div>

                    <div>
                        <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500" }}>Parent Instruction</h6>
                        <p style={{ fontSize: "14px", color: "#898989" }}>{data.classDetails?.parent_instructions}</p>
                        {data?.classDetails?.parent_instruction_document_url &&   <div className={classes.btns}>
                      <button  onClick={()=> downloadFile(data?.classDetails?.parent_instruction_document_url , data?.classDetails?.parent_instruction_document)}>Parent instruction.pdf <FiDownload />
                            </button>
                        </div>}
                        {/* <div className={classes.btns}>
                            <button>Parent instruction.pdf <FiDownload />
                            </button>
                        </div> */}
                    </div>
                </Container>
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading} style={{color: "rgba(66, 77, 182, 1)"}}>Teacher’s Instructions</h4>
                    <p className={`${classes.instruction}`}>
                       {data?.classDetails?.notes ? data?.classDetails?.notes : "no data found!" }
                    </p>
                </Container>
              
            </div>
            {popup && <SlotModal isPopup={popup} popupFunc={setPop} data1={data} />}
        </React.Fragment>
    )
}

export default TrialClassDetail
