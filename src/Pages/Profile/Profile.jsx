import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import Heading from '../../Components/Heading/Heading'
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'
import Container from '../../UI/Container/Container'
import LabelledInput from '../../Components/LabelledInput/LabelledInput'
import LabelledTextarea from '../../Components/LabelledTextarea/LabelledTextarea'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../Apis/BaseUrl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import RightSidebar from './RightSidebar'

const Profile = () => {
    const [dob, setDob] = useState("")
   
    const [basicDetail, setBasicDetail] = useState({})
    const [allData, setAllData] = useState({})
    const [bankDetails, setBankDetails] = useState([])
    const [profileImg, setProfileImage] = useState("")
    const[teacherList, setTeacherList] = useState([])
    const[studentList, setStudentList] = useState([])




    const data = [
        {
            label: "Name",
            id: 'fn',
            value: basicDetail.preferred_name
        },
        {
            label: "Email ID",
            id: 'em',
            value: allData?.email
        },
        {
            label: "Phone",
            id: 'mob',
            value: allData?.mobile_number
        },
        {
            label: "Gender",
            id: 'gender',
            value: basicDetail?.gender
        },
        {
            label: "Date Of Birth",
            id: 'dob',
            value: dob
        },
    ]
  
    const data3 = [
        {
            label: 'City',
            id: 'city',
            value: basicDetail?.city
        },
        {
            label: 'State',
            id: 'state',
            value: basicDetail?.state
        },
        {
            label: 'Country',
            id: 'country',
            value: basicDetail?.country
        },
    ]

    const tutToken = Cookies.get("tutorazzi_academic")
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
        setProfileImage(res.data.data?.userDetails?.profile_image_url)
       setAllData(res.data.data?.userDetails)
        setBasicDetail(res.data.data?.profileDetails)
        setDob(res.data.data?.profileDetails?.dob)
        setTeacherList(res.data.data?.teachersDetails)
        setStudentList(res.data.data?.studentsDetails)
        setProfileImage(res.data.data.userDetails?.profile_img_url)
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


                <LabelledTextarea id={'ta'} value={basicDetail?.address} label={'Address'} ro={true} />


                <div className={`${classes.border_box} ${classes.flex2}`}>
                    
                    {data3.map((element, index) => (
                        <LabelledInput key={index} id={element.id} ro={true} label={element.label} value={element.value} />
                    ))}
                </div>




            </Container>
            </div>
            <div style={{width:"29%"}}>
                <RightSidebar stuData={studentList} teacData={teacherList} />
            </div>
           </div>

        </React.Fragment>
    )
}

export default Profile