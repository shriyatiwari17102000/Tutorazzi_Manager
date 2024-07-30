import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import classes from './ClassesDetail.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link, useNavigate, useParams } from 'react-router-dom'
import img from '../../../assets/ins.png'
import DownloadPdf from '../../../Components/DownloadPdf/DownloadPdf'
import UpcomingClassCard from '../../../Components/UpcomingClassCard/UpcomingClassCard'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'
import moment from 'moment'
import RescheduleClasses from '../../../Components/AllModals/RescheduleModal copy/RescheduleClasses'
import { toast } from 'react-toastify'
import ToasterUpdate from '../../../Components/Toaster/ToasterUpdate'
import { FiDownload } from "react-icons/fi"

const UpcomingClassDetail = () => {
    const [popup, setPop] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    console.log(id)
    const popupHandler = () => {
        setPop(!popup)
    }
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getUpcomingData = async () => {

        let register = `${BASE_URL}/upcoming-class-details?class_id=${id}`
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setData(res.data.data)
    }
    // moment(data.classDetails.start_date)
    useEffect(() => {
        getUpcomingData()
    }, [])
    let teacherId = data?.teacherDetails?.user_id?._id
    let stu_id = data?.studentDetails?.user_id
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/teacher/details/${teacherId}`)
    }
    const handleNavigateStudent = () => {
        // console.log(`teacher-detail/${stu_id}`)
        navigate(`/student/details/${stu_id}`)
    }

    const startMeet = async () => {
        let register = `${BASE_URL}/join-class`
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
            let res = await axios.post(register, { class_id: id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if (!res.data.success) {
                ToasterUpdate(myToast, res.data.message, "error")
                return
            }
            console.log(res)
            let token1 = res.data.data.tokenData.token
            //   setData(res.data.data)
            navigate(`/meet/${token1}`);
            ToasterUpdate(myToast, res.data.message, "success")
        } catch (error) {
            console.log(error)
            ToasterUpdate(myToast, error.message, "error")
        }
        finally {
            setLoading(false)
        }
    };

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
        <React.Fragment>
            <Heading heading={'Upcoming Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
                <BlackButton func={popupHandler} funcVal={popup} cls={classes.btn}>Reschedule</BlackButton>
            </Heading>
            <div className={classes.box}>
                <Container cls={classes.header}>
                    <div className={classes.header_right}>
                        <div className={classes.header_right_profile}>P</div>
                        <div className={classes.header_right_inner}>
                            {/* <h4 className={classes.secondary_heading}>Mathematics Class</h4>
                            <h5>10:30 Am to 12:30 Pm</h5>
                            <h5>Tuesday 20 Jun 2023</h5> */}
                            <h4 className={classes.secondary_heading}>{data?.classDetails?.subject_name} Class</h4>
                            <h5> <Moment format="hh:mm A">{data?.classDetails?.start_time}</Moment> to <Moment format="hh:mm A">{data?.classDetails?.end_time}</Moment> </h5>
                            <h5><Moment format="DD/MM/YYYY">{data?.classDetails?.start_time}</Moment></h5>
                        </div>
                    </div>
                    <button className={classes.header_btn} onClick={startMeet}>Join Class</button>
                </Container>
                {/* <Container cls={classes.inner_box}>
                    <h4 className={classes.secondary_heading}>Description</h4>
                    <p className={classes.page_para}>
                        {data?.classDetails?.details ? data?.classDetails?.details : "no data found"}
                    </p>
                   
                </Container> */}
                <Container cls={`${classes.small_box} ${classes.inner_box} ${classes.hh}`}>
                    <h4 className={classes.secondary_heading} style={{ color: "rgba(66, 77, 182, 1)" }}>Teacher's Details</h4>
                    <UserDiv data={data?.teacherDetails}>
                        <div className={classes.link} style={{ cursor: "pointer" }} onClick={handleNavigate}>View Profile</div>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.small_box} ${classes.inner_box}  ${classes.hh}`}>
                    <h4 style={{ color: "rgba(66, 77, 182, 1)" }} className={classes.secondary_heading}>Student's Details</h4>
                    <UserDiv data={data?.classDetails?.student_id} curr={data?.studentDetails?.curriculum}>
                        <div className={classes.link} style={{ cursor: "pointer" }} onClick={handleNavigateStudent}>View Profile</div>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.inner_box}`} >
                    <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", color: "rgba(66, 77, 182, 1)" }} >Inputs by Parent and Student</h4>
                    <div style={{
                        borderBottom: "1px solid #d9d9d9",
                        paddingBottom: "30px"
                    }}>
                        <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500", }}>Student Instruction</h6>
                        {data?.classDetails?.student_instructions ? 
                        <>                        <p style={{ fontSize: "14px", color: "#898989" }}>{data?.classDetails?.student_instructions}</p>
                        {data?.classDetails?.student_instruction_document_url && <div className={classes.btns}>
                            <button onClick={() => downloadFile(data?.classDetails?.student_instruction_document_url, data?.classDetails?.student_instruction_document)}>Student instruction.pdf <FiDownload />
                            </button>
                        </div>}
                        </> : "no data found!" }

                    </div>


                    <div>
                        <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500" }}>Parent Instruction</h6>
                        {data?.classDetails?.parent_instructions ?
                            <>
                                <p style={{ fontSize: "14px", color: "#898989" }}>{data?.classDetails?.parent_instructions}</p>
                                {data?.classDetails?.parent_instruction_document_url && <div className={classes.btns}>
                                    <button onClick={() => downloadFile(data?.classDetails?.parent_instruction_document_url, data?.classDetails?.parent_instruction_document)}>Parent instruction.pdf <FiDownload />
                                    </button>
                                </div>}
                            </>
                            : "no data found!"}


                        {/* <div className={classes.btns}>
                            <button>Parent instruction.pdf <FiDownload />
                            </button>
                        </div> */}
                    </div>
                </Container>
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading} style={{ color: "rgba(66, 77, 182, 1)", fontSize:"16px" }}>Teacher’s Instructions</h4>
                    {data?.classDetails?.notes ? <p style={{color:"rgb(137, 137, 137)", fontSize:"14px"}}>{data?.classDetails?.notes} </p>: <div className={classes.teach_img}><img className={classes.my_img} src={img} alt="" />
                        <p className={`${classes.page_para} ${classes.text_center}`}>No Information available from Teacher</p></div>}
                </Container>
                {/* <div className={`${classes.inner_box} ${classes.my_upcoming_classes}`}>
                    <h4 className={classes.secondary_heading}>My Upcoming Classes</h4>
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                    <UpcomingClassCard />
                </div> */}
                {data?.classDetails?.materials_url.length > 0 && <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Class Resources</h4>
                    {data?.classDetails?.materials_url.map((item, index) => (
                        <DownloadPdf item={item} />
                    ))}
                </Container>}

            </div>
            {popup && <RescheduleClasses isPopup={popup} popupFunc={setPop} func={getUpcomingData} data1={data} />}
        </React.Fragment>
    )
}

export default UpcomingClassDetail
