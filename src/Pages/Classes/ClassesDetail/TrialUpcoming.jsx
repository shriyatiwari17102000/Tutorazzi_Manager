import React, { useEffect, useState } from 'react'
import classes from './ClassesDetail.module.css'
import Container from '../../../UI/Container/Container'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Moment from 'react-moment'
import { toast } from 'react-toastify'
import { FiDownload } from 'react-icons/fi'
import { BASE_URL } from '../../../Apis/BaseUrl'
import Heading from '../../../Components/Heading/Heading'
import SlotModal from '../../../Components/SlotModal/SlotModal'
import RescheduleClasses from '../../../Components/AllModals/RescheduleModal copy/RescheduleClasses'


const TrialUpcoming = () => {
    const [popup, setPop] = useState(false)
    const [popup2, setPop2] = useState(false)
    const [popup1, setPop1] = useState(false)
    const [data, setData] = useState([])
    const[loading, setLoading] = useState(false)
    const {id} = useParams()
    // console.log(id)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getUpcomingData = async() => {
        let register = `${BASE_URL}/trial-class-details?class_id=${id}`
        let res = await axios.get(register, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          console.log(res.data.data)
          setData(res.data.data)
    }

    useEffect(()=>{
        getUpcomingData()
    },[])
    const popupHandler = () => {
        setPop(!popup) 
    }
    const popupHandler2 = () => {
        setPop2(!popup2) 
    }
    const handleOpen = () => setPop1(true)
    console.log(data?.classDetails)

    const navigate = useNavigate()


    const startMeet = async() => {
        let register = `${BASE_URL}/join-class`
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
       try {
        let res = await axios.post(register, {class_id : id}, {
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
        navigate(`/auth-meet/${token1}`);
        ToasterUpdate(myToast, res.data.message, "success")
       } catch (error) {
        console.log(error)
        ToasterUpdate(myToast, error.message, "error")
       }
       finally{
        setLoading(false)
       }
      };

      const downloadFile = (
        filePath
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
            link.download = fileName;
    
            document.body.appendChild(link);
    
            link.click();
    
            link.parentNode.removeChild(link);
          });
      };

    return (
        
        <React.Fragment>
            <Heading heading={'Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} btn={data?.classDetails?.class_status == "Pending" ? 'Show all Slots' : "Reschedule"} btnFunction={data?.classDetails?.class_status == "Pending" ? popupHandler : popupHandler2} btnValue={data?.classDetails?.class_status == "Pending" ? popup : popup2}/>
            <div className={classes.box}>
                <Container cls={classes.header}>
                    <div className={classes.header_right}>
                        <div className={classes.header_right_profile}>{data?.classDetails?.subject?.name.slice(0, 1).toUpperCase()}</div>
                        <div className={classes.header_right_inner}>
                            <h4 className={classes.secondary_heading}>{data?.classDetails?.subject?.name} Class</h4>
                            {console.log(data.status)}
                            {data?.classDetails?.class_status != "Pending" && <>
                            <h5><Moment format="hh:mm A" >{data?.classDetails?.start_time}</Moment> & <Moment format="hh:mm A" >{data?.classDetails?.end_time}</Moment></h5>
                            <h5><Moment format="DD/MM/YYYY"  >{data?.classDetails?.start_time}</Moment></h5></>}
                        </div>
                    </div>
                  {data?.status == "Scheduled" &&   <button className={classes.header_btn} onClick={startMeet}>Join class</button>}
                </Container>
                {/* <Container cls={classes.inner_box}>
                    <h4 className={classes.secondary_heading}>Description</h4>
                    <p className={classes.page_para}>
                    {data?.classDetails?.details ? data?.classDetails?.details : "No description found..." }
                       
                    </p>
                   
                </Container> */}
                     <Container cls={`${classes.inner_box}`} >
                    <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", color: "rgba(66, 77, 182, 1)" }} >Inputs by Parent and Student</h4>
                    <div style={{
                        borderBottom: "1px solid #d9d9d9",
                        paddingBottom: "30px"
                    }}>
                        <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500", }}>Student Instruction</h6>
                        <p style={{ fontSize: "14px", color: "#898989" }}>{data?.classDetails?.student_instructions  || "no instruction found!"}</p>
                        {data?.classDetails?.student_instruction_document_url &&   <div className={classes.btns}>
                      <button  onClick={()=> downloadFile(data?.classDetails?.student_instruction_document_url, data?.classDetails?.student_instructions_document)}>Student instruction.pdf <FiDownload />
                            </button>
                        </div>}
                       
                    </div>

                    <div>
                        <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500" }}>Parent Instruction</h6>
                        <p style={{ fontSize: "14px", color: "#898989" }}>{data.classDetails?.parent_instructions || "no instruction found!"}</p>
                        {data?.classDetails?.parent_instruction_document_url &&   <div className={classes.btns}>
                      <button  onClick={()=> downloadFile(data?.classDetails?.parent_instruction_document_url, data?.classDetails?.parent_instructions_document)}>Parent instruction.pdf <FiDownload />
                            </button>
                        </div>}
                       
                    </div>
                </Container>
                {/* <Container cls={`${classes.inner_box}`}>
                    <h4 className={classes.secondary_heading}>Teacher’s Instructions</h4>
                   {data?.classDetails?.notes ? data?.classDetails?.notes : (
                    <>
                     <button className={classes.my_img} onClick={handleOpen}>+</button>
                    <p className={`${classes.page_para} ${classes.text_center}`}>Add teacher’s Note</p></>
                   )}
                </Container> */}
                {/* <BottomButtons /> */}
            </div>
             {/* {popup1 && <InstructionModal isPopup={popup1} popupFunc={setPop1} func={getUpcomingData} data1={data} />} */}
             {popup && <SlotModal isPopup={popup} popupFunc={setPop} func={getUpcomingData} data1={data} />}
             {popup2 && <RescheduleClasses isPopup={popup2} popupFunc={setPop2} func={getUpcomingData} data1={data} />}
        </React.Fragment>
    )
}

export default TrialUpcoming


// import React, { useEffect, useState } from 'react'
// import Heading from '../../../Components/Heading/Heading'
// import classes from './ClassesDetail.module.css'
// import Container from '../../../UI/Container/Container'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import BottomButtons from '../../../Components/BottomButtons/BottomButtons'
// import { BASE_URL } from '../../../Apis/BaseUrl'
// import axios from 'axios'
// import Cookies from 'js-cookie'
// import RescheduleClasses from '../../../Components/AllModals/RescheduleModal/RescheduleClasses'
// import InstructionModal from '../../../Components/AllModals/TeacherInstructionModal/InstructionModal'
// import Moment from 'react-moment'
// import ToasterUpdate from '../../../Components/Toaster/ToasterUpdate'
// import { toast } from 'react-toastify'
// import { FiDownload } from 'react-icons/fi'


// const TrialUpcoming = () => {
//     const [popup, setPop] = useState(false)
//     const [popup1, setPop1] = useState(false)
//     const [data, setData] = useState([])
//     const[loading, setLoading] = useState(false)
//     const [popup2, setPop2] = useState(false)
//     const {id} = useParams()
//     // console.log(id)


//         const popupHandler2 = () => {
//         setPop2(!popup2) 
//     }
//     const tutToken = Cookies.get("tutorazzi_token")
//     const getTutToken = JSON.parse(tutToken)
//     const token = getTutToken.access_token

//     const getUpcomingData = async() => {
//         let register = `${BASE_URL}/upcoming-class-details?class_id=${id}`
//         let res = await axios.get(register, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`
//             }
//           })
//           console.log(res.data.data)
//           setData(res.data.data)
//     }

//     useEffect(()=>{
//         getUpcomingData()
//     },[])
//     const popupHandler = () => {
//         setPop(!popup) 
//     }
//     const handleOpen = () => setPop1(true)
//     console.log(data?.classDetails)

//     const navigate = useNavigate()


//     const startMeet = async() => {
//         let register = `${BASE_URL}/join-class`
//         const myToast = toast.loading('Please Wait...')
//         setLoading(true)
//        try {
//         let res = await axios.post(register, {class_id : id}, {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`
//             }
//           })
//           if (!res.data.success) {
//                     ToasterUpdate(myToast, res.data.message, "error")
//                     return
//                 }
//           console.log(res)
//           let token1 = res.data.data.tokenData.token
       
//         navigate(`/auth-meet/${token1}`);
//         ToasterUpdate(myToast, res.data.message, "success")
//        } catch (error) {
//         console.log(error)
//         ToasterUpdate(myToast, error.message, "error")
//        }
//        finally{
//         setLoading(false)
//        }
//       };

//       const downloadFile = (
//         filePath
//       ) => {
//         let fileName = filePath
//         console.log(fileName)
      
//         fetch(`${filePath}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/pdf',
//           },
//         })
//           .then(response => response.blob())
//           .then(blob => {
//             const url = window.URL.createObjectURL(new Blob([blob]));
    
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = fileName;
    
//             document.body.appendChild(link);
    
//             link.click();
    
//             link.parentNode.removeChild(link);
//           });
//       };

      

//     return (
        
//         <React.Fragment>
//             <Heading heading={'Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} btn={data?.classDetails?.class_status == "Pending" ? 'Show all Slots' : "Reschedule"} btnFunction={data?.classDetails?.class_status == "Pending" ? popupHandler : popupHandler2} btnValue={data?.classDetails?.class_status == "Pending" ? popup : popup2}/>
//             {/* <Heading heading={'Trial Class Details'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} btn={'Reschedule'} btnFunction={popupHandler} btnValue={popup}/> */}
//             <div className={classes.box}>
//                 <Container cls={classes.header}>
//                     <div className={classes.header_right}>
//                         <div className={classes.header_right_profile}>{data?.classDetails?.subject?.name.slice(0, 1).toUpperCase()}</div>
//                         <div className={classes.header_right_inner}>
//                             <h4 className={classes.secondary_heading}>{data?.classDetails?.subject?.name} Class</h4>
//                             <h5><Moment format="hh:mm A" utc>{data?.classDetails?.start_time}</Moment> & <Moment format="hh:mm A" utc>{data?.classDetails?.end_time}</Moment></h5>
//                             <h5><Moment format="DD/MM/YYYY" utc >{data?.classDetails?.start_time}</Moment></h5>
//                         </div>
//                     </div>
//                     <button className={classes.header_btn} onClick={startMeet}>Join Class</button>
//                 </Container>
//                 {/* <Container cls={classes.inner_box}>
//                     <h4 className={classes.secondary_heading}>Description</h4>
//                     <p className={classes.page_para}>
//                     {data?.classDetails?.details ? data?.classDetails?.details : "No description found..." }
                       
//                     </p>
                   
//                 </Container> */}
//                 <Container cls={`${classes.inner_box}`} >
//                     <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", color: "rgba(66, 77, 182, 1)" }} >Inputs by Parent and Student</h4>
//                     <div style={{
//                         borderBottom: "1px solid #d9d9d9",
//                         paddingBottom: "30px"
//                     }}>
//                         <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500", }}>Student Instruction</h6>
//                         <p style={{ fontSize: "14px", color: "#898989" }}>{data?.classDetails?.student_instructions  || "no instruction found!"}</p>
//                         {data?.classDetails?.student_instruction_document_url &&   <div className={classes.btns}>
//                       <button  onClick={()=> downloadFile(data?.classDetails?.student_instruction_document_url)}>Student instruction.pdf <FiDownload />
//                             </button>
//                         </div>}
                       
//                     </div>

//                     <div>
//                         <h6 style={{ fontSize: "15px", marginBlock: "15px", fontWeight: "500" }}>Parent Instruction</h6>
//                         <p style={{ fontSize: "14px", color: "#898989" }}>{data?.classDetails?.parent_instructions || "no instruction found!"}</p>
//                         {data?.classDetails?.parent_instruction_document_url &&   <div className={classes.btns}>
//                       <button  onClick={()=> downloadFile(data?.classDetails?.parent_instruction_document_url)}>Parent instruction.pdf <FiDownload />
//                             </button>
//                         </div>}
                       
//                     </div>
//                 </Container>
//                 <Container cls={`${classes.inner_box}`}>
//                     <h4 className={classes.secondary_heading} style={{ color: "rgba(66, 77, 182, 1)"}}>Teacher’s Instructions</h4>
//                    {data?.classDetails?.notes ? data?.classDetails?.notes : (
//                     <>
//                      <button className={classes.my_img} onClick={handleOpen}>+</button>
//                     {/* <img className={classes.my_img} src={img} alt="" /> */}
//                     <p className={`${classes.page_para} ${classes.text_center}`}>Add teacher’s Note</p></>
//                    )}
//                 </Container>
//                 {/* <BottomButtons /> */}
//             </div>
//              {popup1 && <InstructionModal isPopup={popup1} popupFunc={setPop1} func={getUpcomingData} data1={data} />}
//              {popup && <RescheduleClasses isPopup={popup} popupFunc={setPop} func={getUpcomingData} data1={data} />}
//              {popup2 && <RescheduleClasses isPopup={popup2} popupFunc={setPop2} func={getUpcomingData} data1={data} />}
//         </React.Fragment>
//     )
// }

// export default TrialUpcoming
