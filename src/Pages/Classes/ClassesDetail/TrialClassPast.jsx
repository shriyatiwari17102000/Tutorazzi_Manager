import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import classes from './ClassesDetail.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DownloadPdf from '../../../Components/DownloadPdf/DownloadPdf'
import UpcomingClassCard from '../../../Components/UpcomingClassCard/UpcomingClassCard'
import HomeworkDiv from '../../Overview/Components/HomeworkDiv'
// import TaskFoldMap from '../../../MappableDivs/TaskFoldMap/TaskFoldMap'
import TasksMap from '../../../MappableDivs/TasksMap'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Moment from 'react-moment'
import RatingCard from './RatingCard'
import QuoteModal from '../../../Components/AllModals/Quote/QuoteModal'
import { LuPlus } from "react-icons/lu";
import { FaPlus } from 'react-icons/fa'
import NewPagination from '../../../Components/NewPagination/NewPagination'
import { BiDislike } from 'react-icons/bi'
import { FcLike } from 'react-icons/fc'
import TaskModal from './PastModal/TaskModal'
import {FiDownload} from "react-icons/fi"

const TrialClassPast = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState({})
    const [quote, setQuote] = useState([])
    const [limit, setLimit] = useState(3)
    const [page, setPage] = useState(1)
    const [pageInfo, setPageInfo] = useState({}) 
      const [openModal, setOpenModal] = useState(false)
    const[ID, setID] = useState('')
 

    const handleOpenModal = (id) => {
        setOpenModal(true)
        setID(id)
    }

    const popupHandler = () => {
        setShow(!show)
    }
    const { id } = useParams()
    // console.log(id)
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getUpcomingData = async () => {
        // console.log("hhhhhhhhhhh")
        let register = `${BASE_URL}/trial-class-details?class_id=${id}`
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setData(res.data.data)
        // setQuote(res.data.data?.quotes)
    }



    let teacherId = data?.teacherDetails?.user_id?._id
    let studentId = data?.studentDetails?.user_id
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/teacher/details/${teacherId}`)
    }
    const handleNavigate1 = () => {
        navigate(`/student/details/${studentId}`)
    }

    useEffect(() => {
        getUpcomingData()
    }, [])
    // console.log(quote)

    const getPricingData = async () => {
        // console.log("hhhhhhhhhhh")
        let register = `${BASE_URL}/quotes?class_id=${id}&page=${page}&limit=${limit}`
        // console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data?.result?.docs)
        // setData(res.data.data)
        setPageInfo({ ...res.data.data?.result, docs: null })
        setQuote(res.data.data.result?.docs)
    }

    useEffect(() => {
        getPricingData()
    }, [limit, page])

    const paginationProps = {
        setPage,
        pageInfo
    }

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


    // console.log(data?.studentDetails)

    return (
        <React.Fragment>
            <Heading heading={'Past Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} >
                <BlackButton func={popupHandler} funcVal={show} cls={classes.btn}>Add Quote</BlackButton>
            </Heading>
            <div className={classes.box}>
                <Container cls={classes.header}>
                    <div className={classes.header_right}>
                        <div className={classes.header_right_profile}>  {data && data?.classDetails?.subject?.name?.slice(0, 1).toUpperCase()}</div>
                        <div className={classes.header_right_inner}>
                            <h4 className={classes.secondary_heading}>{data?.classDetails?.subject?.name} Class</h4>
                            {data?.classDetails?.start_time && <>
                             <h5><Moment format="hh:mm A" utc>{data?.classDetails?.start_time}</Moment> & <Moment format="hh:mm A" utc>{data?.classDetails?.end_time}</Moment></h5>
                            <h5><Moment format="DD/MM/YYYY" utc >{data?.classDetails?.start_time}</Moment></h5>
                            </>
                            }
                        </div>
                    </div>
                    <button className={classes.header_btn}>View Recording</button>
                </Container>
                {/* <Container cls={classes.inner_box}>
                    <h4 className={classes.secondary_heading}>Description</h4>
                    <p className={classes.page_para}>
                        {data?.classDetails?.details ? data?.classDetails?.details : "No description found..."}
                    </p>
                </Container> */}
             <div style={{display:"flex", gap:"20px", width:"100%"}}>
             <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher's Details</h4>
                    <UserDiv data={data?.teacherDetails}>
                        <div style={{cursor:"pointer"}} className={classes.link} onClick={handleNavigate} >View Profile</div>
                    </UserDiv>
                </Container>
                <Container cls={`${classes.inner_box}`}>
                    <h4   className={classes.secondary_heading}> Student's Details</h4>
                    <UserDiv data={data?.classDetails?.student_id}>
                        <div style={{cursor:"pointer"}} className={classes.link} onClick={handleNavigate1} >View Profile</div>
                    </UserDiv>
                </Container>
             </div>
               
                <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher’s Instructions</h4>
                    <p className={`${classes.instruction}`}>
                        {data?.classDetails?.notes || "no data found!"}
                    </p>
                </Container>


                {/* Homework and IDk */}
                <HomeworkDiv cls={classes.small_box} data={data?.homeworkResponse} func={getUpcomingData} id={id} />
                <Container cls={`${classes.inner_box} ${classes.small_box} ${data?.doubtResponse?.length > 0 ? classes.my_tamy_task_containersks : classes.my_tasks2}`}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                           <h4 className={`${classes.secondary_heading} w-auto`} style={{width:"auto", color: "rgba(66, 77, 182, 1)"}} >Urgent Doubt Solving</h4>
                           <h4 className={`${classes.secondary_heading} w-auto`} style={{width:"auto", textDecoration:"underline", fontSize:"13px", cursor : "pointer"}}  onClick={handleOpenModal} >See All</h4>
                           </div>
                    <TasksMap cls={classes.my_tasks} data={data?.doubtResponse} func={getUpcomingData} />
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
                      <button  onClick={()=> downloadFile(data?.classDetails?.parent_instruction_document_url, data?.classDetails?.parent_instruction_document)}>Parent instruction.pdf <FiDownload />
                            </button>
                        </div>}
                        {/* <div className={classes.btns}>
                            <button>Parent instruction.pdf <FiDownload />
                            </button>
                        </div> */}
                    </div>
                </Container>
                {/* <HomeworkDiv cls={classes.small_box} data={data?.homeworkResponse} />
                <Container cls={`${classes.inner_box} ${classes.small_box} ${classes.my_task_container}`}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                           <h4 className={`${classes.secondary_heading} w-auto`} style={{width:"auto"}} >Task Information</h4>
                           <h4 className={`${classes.secondary_heading} w-auto`} style={{width:"auto", textDecoration:"underline", fontSize:"13px", cursor : "pointer"}}  onClick={handleOpenModal} >See All</h4>
                           </div>
                    <TasksMap cls={classes.my_tasks} data={data?.taskResponse} func={getUpcomingData} />
                </Container> */}
                {/* <Container cls={`${classes.inner_box}  ${classes.widthh}`} >
                    <div>
                    <h4 className={classes.secondary_heading}>Rate Your Teacher</h4>
                    <RatingCard data={data?.teacherRatings} readonly={true} p={'Rate Teacher By Selecting From 1 to 5 Stars To Express your Views'} />
                    </div>
                  <div>
                  <h4 className={classes.secondary_heading}>Rate this Class</h4>
                    <RatingCard data={data?.ratingsResponse} readonly={true} p={'Rate This Class By Selecting From 1 to 5 Stars To Express your Views'}/>
                  </div>
                </Container> */}

<Container cls={`${classes.inner_box1}`}>
                    <h4 className={classes.secondary_heading}>Class Resources</h4>
                    {data?.classDetails?.materials_url.map((item, index) => (
                        <DownloadPdf item={item} />
                    ))}
                    {/* <DownloadPdf />
                    <DownloadPdf />        
                    <DownloadPdf />
                    <DownloadPdf /> */}
                </Container>

                <div className={`${classes.inner_box}`} style={{padding:"0"}}>
                    <h4 className={classes.secondary_heading} style={{marginTop:"30px"}}>Pricing Section</h4>
                    {quote?.length > 0 ? <div  className={classes.top_quote}>
                        <div className={classes.inn_quote}>
                            {
                                quote?.map((item, index) => (
                                    // console.log(item)
                                    <div key={index} className={classes.most_inn_quote} >
                                        <UpcomingClassCard
                                        cls={classes.new_cls}
                                        func={getPricingData} data={item} id={data?.studentDetails?.user_id} />
                                    </div>
                                ))}
                        </div>
                        <NewPagination {...paginationProps} />
                    </div> : "no data found!"}
                   
                </div>
                <Container cls={`${classes.inner_box}`}>
                <div> <div className={classes.trial_css}>
                        <h4 className={classes.secondary_heading}>Class Status</h4><span  >{data?.classDetails?.response === "Disliked" ? <span className={classes.class_status}>Didn't Like <BiDislike /> </span> : <span className={classes.class_status1}> Liked <FcLike /> </span>}</span></div>
                        {data?.classDetails?.reason_disliking &&  <>         <p className={classes.trial_css_p}>Reason why student didn’t like Trial Class</p> <span className={classes.trial_css_span}>{data?.classDetails?.reason_disliking}</span> </>}
               
                    </div>
                  
                </Container>

            </div>
            {show && <QuoteModal teacher_name={data?.teacherDetails} isPopup={show} popupFunc={setShow} func={getPricingData} data1={data} />}
            {openModal && <TaskModal isPopup={openModal} func={getUpcomingData}  popupFunc={setOpenModal}  data={data} id={ID} />}
        </React.Fragment>
    )
}

export default TrialClassPast
