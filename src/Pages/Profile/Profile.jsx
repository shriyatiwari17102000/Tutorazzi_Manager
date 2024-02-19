import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import Heading from '../../Components/Heading/Heading'
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'
import Container from '../../UI/Container/Container'
import LabelledInput from '../../Components/LabelledInput/LabelledInput'
import LabelledTextarea from '../../Components/LabelledTextarea/LabelledTextarea'
import PagePath from '../../Components/PagePath/PagePath'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../Apis/BaseUrl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import RightSidebar from './RightSidebar'



const data2 = [

]



const td1 = [
    {
        h5: 'Total Received amount',
        h1: '₹34,000',
        p: 'See here your total amount received from admin side against for sessions'
    }
]

// Tile Data 2
const td2 = [
    {
        h5: 'Total Received amount',
        h1: '₹34,000',
        p: 'See here your total amount received from admin side against for sessions'
    },
    {
        h5: 'Total Received amount',
        h1: '₹34,000',
        p: 'See here your total amount received from admin side against for sessions'
    }
]

const Profile = () => {
    const [degreeDetail, setDegreeDetails] = useState([])
   
    const [basicDetail, setBasicDetail] = useState({})
    const [subjectCurriculums, setSubjectCurriculums] = useState([])
    const [bankDetails, setBankDetails] = useState([])
    const [profileImg, setProfileImage] = useState("")

    const data = [
        {
            label: "Name",
            id: 'fn',
            value: basicDetail.preferred_name
        },
        {
            label: "Email ID",
            id: 'em',
            value: basicDetail?.user_id?.email
        },
        {
            label: "Phone",
            id: 'mob',
            value: basicDetail?.user_id?.mobile_number
        },
        {
            label: "Gender",
            id: 'gender',
            value: basicDetail?.gender
        },
        {
            label: "Date Of Birth",
            id: 'dob',
            value: basicDetail?.dob
        },
    ]
    const data3 = [
        {
            label: 'City',
            id: 'city',
            value: "New Delhi"
        },
        {
            label: 'State',
            id: 'state',
            value: "Delhi"
        },
        {
            label: 'Country',
            id: 'country',
            value: "India"
        },
    ]

    const tutToken = Cookies.get("tutorazzi_token")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getData = async () => {
        let register = `${BASE_URL}/profile`
        //   console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setProfileImage(res.data.data?.profile_image)
        setDegreeDetails(res.data.data.education_details)
        setExperienceDetail(res.data.data.experience_details)
        // setTestimonialData(res.data.data?.testimonialResponse)
        setBasicDetail(res.data.data?.teacherPersonalDetails)
        setSubjectCurriculums(res.data.data?.subject_curriculums)
        setBankDetails(res.data.data?.bank_details)
        // console.log(res.data.data?.testimonialResponse)
    }

    useEffect(() => {
        getData()
    }, [])
    const navigate = useNavigate()
    const handleNavigate = () => {
        console.log("hhhhhhhhhh")
        navigate('edit')
    }


    
    return (
        <React.Fragment>
            {/* <PagePath /> */}

           <div style={{display:"flex", gap:"2%"}}>
            <div style={{width:"69%"}}>
            <div style={{
                display: "flex", justifyContent: "space-between"
            }}>
                <Heading cls={classes.my_page_heading} heading={'Profile Details'} p='Here you can see your Profile ' />
                <button className={classes.edit_btn} onClick={handleNavigate} style={{
                    background: "black", color: "white", padding: "0px 15px", height: "45px",
                    border: "none",
                    borderRadius: "5px"
                }}>Edit Profile</button>
            </div>
            <ProfileHeader user_info={basicDetail} profileUpdater={profileImg} />

            <Container cls={classes.flex}>
                <div className={`${classes.flex2} `} style={{ border: "none", padding: "0" }}>

                    {data.map((element, index) => (
                        <LabelledInput key={index} id={element.id} ro={true} label={element.label} value={element.value} />
                    ))}
                </div>


                <LabelledTextarea id={'ta'} value={basicDetail?.bio} label={'Address'} ro={true} />


                <div className={`${classes.border_box} ${classes.flex2}`}>
                    
                    {data3.map((element, index) => (
                        <LabelledInput key={index} id={element.id} ro={true} label={element.label} value={element.value} />
                    ))}
                </div>




            </Container>
            </div>
            <div style={{width:"29%"}}>
                <RightSidebar />
            </div>
           </div>

        </React.Fragment>
    )
}

export default Profile