import React, { useEffect, useState } from 'react'
import classes from './EditStu.module.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import ToasterUpdate from '../../../Components/Toaster/ToasterUpdate'
import Heading from '../../../Components/Heading/Heading'
import Modal from '../../../Components/Modal/Modal'
import BlackButton from '../../../Components/BlackButton/BlackButton'


const AcademicModal = ({ popupFunc, isPopup, getData, id }) => {
    // console.log(popupFunc)
    const [currData, setCurrData] = useState([])
    const [subData, setSubData] = useState([])
    const [curriculum, setCurriculum] = useState("")
    const [subject, setSubject] = useState("")
    const [isLoading, setLoading] = useState(false)

    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;

    const getAllCurriculum = async () => {
        const register = `${BASE_URL}/curriculums`;

        const response = await axios.get(register, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response.data.data)
        setCurriculum(response.data.data[0].name)
        setCurrData(response.data.data)

        // getAllSubject()
    }
    useEffect(() => {
        getAllCurriculum()
    }, [])

    const getAllSubject = async () => {
        const register = `${BASE_URL}/subject-by-curriculum?curriculum=${curriculum}`;

        const response = await axios.get(register, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response.data.data)
        setSubData(response.data.data)
        setSubject(response.data.data[0])
    }
    useEffect(() => {
        getAllSubject()
    }, [curriculum])

    const handleAddExperience = async () => {
        const myToast = toast.loading('Please Wait...')
        let experienceData = {
            curriculum: curriculum,
            subject: subject,
            student_id : id
        }
        setLoading(true)
        try {
            const register = `${BASE_URL}/subject-curriculum`;

            const response = await axios.post(register, experienceData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { data } = response;
            if (!data.success) {
                ToasterUpdate(myToast, data.message, "error")
                return
            }
            ToasterUpdate(myToast, response.data.message, "success")
            // console.log(data, "oooooo");
            getData()
        } catch (error) {
            // console.log(error)
            ToasterUpdate(myToast, error.message, "error")
        } finally {
            setLoading(false)
            setSubject("")
            popupFunc(!isPopup)
            const dismiss = () => toast.dismiss(myToast);
            setTimeout(() => {
                dismiss()
            }, 1000);
        }
    };
    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Add Subjects & Curriculum'} p={''} />
            </div>

            <div className={classes.body} style={{ width: "100%" }}>
                {/* <div className={classes.select_div}> */}
                <label htmlFor="curriculum" className={classes.select_label}>Curriculum</label>
                <select className={classes.select_input} value={curriculum} onChange={(e) => setCurriculum(e.target.value)}>
                    {currData && currData?.map((element, index) => (<option key={index} value={element.name}>{element.name}</option>))}
                </select>

                <label htmlFor="subject" className={classes.select_label}>Subject</label>
                <select className={classes.select_input} value={subject} onChange={(e) => setSubject(e.target.value)}>
                    {subData.length > 0 ? subData?.map((element, index) => (<option key={index} selected value={element}>{element}</option>)) : <option selected value={""}>no subject available!</option>}
                </select>
                {/* </div> */}
                {/* 
                <LabelledInput  cls={classes.wd} func={setStartYear} value={subject} id={'subject'} label={'Subject'} /> */}
                {/* <LabelledInput  cls={classes.wd} func={setEndYear} value={endYear} id={'curriculum'} label={'Curriculum'} /> */}

            </div>

            <div className={classes.bottom} style={{width:"100%"}}>
                <button type='submit' style={{width:"50%"}} onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <BlackButton cls={classes.wdd} disabled={isLoading} func={handleAddExperience}>Add Curriculum</BlackButton>
            </div>
        </Modal>
    )
}

export default AcademicModal