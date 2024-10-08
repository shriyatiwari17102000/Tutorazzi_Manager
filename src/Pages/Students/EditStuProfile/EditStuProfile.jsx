import React, { useEffect, useState } from 'react'
import classes from './EditStu.module.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../../Apis/BaseUrl'
import Heading from '../../../Components/Heading/Heading'
import Container from '../../../UI/Container/Container'
import LabelledInput from '../../../Components/LabelledInput/LabelledInput'
import AcademicModal from './AcademicModal'
import ToasterUpdate from '../../../Components/Toaster/ToasterUpdate'
import ProfileStu from '../../../Components/ProfileDiv/ProfileStu'


const EditStuProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [DOB, setDOB] = useState('')
    const [age, setAge] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [grade, setGrade] = useState('')
    const [school, setSchool] = useState('')
    const [altPhone, setAltPhone] = useState('')
    const [parentEmail, setParentEmail] = useState('')
    const [parentName, setParentName] = useState('')
    const [parentPhone, setParentPhone] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [countryData, setCountryData] = useState([])
    const [loading, setLoading] = useState(false)
    const [basicDetail, setBasicDetail] = useState({})
    const [curriculum, setCurriculum] = useState('Curriculum 1');
    const [language, setLanguage] = useState('')
    const [languageData, setLanguageData] = useState([])
    const [subCurr, setSubCurr] = useState([])
    const [subject, setSubject] = useState('Subject 1');
    const [open, setOpen] = useState(false)

    const { id } = useParams()
    console.log(id)

    const handleOpen = () => setOpen(true)

    const data = [
        {
            label: "Name",
            id: 'fn',
            value: name,
            func: setName,
            ro: false
        },
        {
            label: "Email ID",
            id: 'em',
            value: email,
            func: setEmail,
            ro: true
        },
        {
            label: "Phone",
            id: 'mub',
            value: phone,
            func: setPhone,
            // ro: true,
            type: "Number"
        },
        // {
        //     label: "Date Of Birth",
        //     id: 'dob',
        //     value: DOB,
        //     func: setDOB,
        //     ro: false
        // },

    ]

    const data3 = [
        {
            label: "Age",
            id: 'age',
            value: age,
            func: setAge,
            ro: false
        },
        {
            label: "School",
            id: 'school',
            value: school,
            func: setSchool,
            ro: false
        },
        // {
        //     label: "Grade",
        //     id: 'grade',
        //     value: grade,
        //     func: setGrade,
        //     ro: false
        // },
        {
            label: 'City',
            id: 'city',
            value: city,
            func: setCity,
            ro: false
        },
        {
            label: 'State',
            id: 'state',
            value: state,
            func: setState,
            ro: false
        },

    ]

    const parentData = [
        {
            label: 'Parent Name',
            id: 'prnmae',
            value: parentName,
            func: setParentName,
            ro: false
        },
        {
            label: 'Phone Number',
            id: 'phn',
            value: parentPhone,
            func: setParentPhone,
            ro: false,
            type: "Number"
        },
        {
            label: 'Email Id',
            id: 'pmail',
            value: parentEmail,
            func: setParentEmail,
            ro: false
        },
        // {
        //     label: 'Alternate Phone Number',
        //     id: 'alphn',
        //     value: altPhone,
        //     func: setAltPhone,
        //     ro: false
        // },
    ]
    useEffect(() => {
        (async () => {
            let res = await fetch('https://restcountries.com/v3.1/all')
            let result = await res.json()
            let data = result.map(element => element.name.common)
            setCountryData(data)

        })()
    }, [])
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getData = async () => {
        let register = `${BASE_URL}/student-details?student_id=${id}`
        //   console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data?.studentDetails?.user_id?.profile_image_url)
        setName(res.data.data.studentDetails.preferred_name)
        setAge(res.data.data.studentDetails.age)
        setCity(res.data.data.studentDetails.city)
        setGender(res.data.data.studentDetails.gender)
        setSchool(res.data.data.studentDetails.school)
        // setGrade(res.data.data.studentDetails.grade_name)
        setState(res.data.data.studentDetails.state)
        // setCountry(res.data.data.profileDetails.country)
        // setAddress(res.data.data.profileDetails.address)
        // setGender(res.data.data.profileDetails.gender)
        setEmail(res.data.data.studentDetails?.user_id?.email)
        setPhone(res.data.data.studentDetails?.user_id?.mobile_number)
        setParentEmail(res.data.data?.studentDetails?.parent_id?.email)
        setParentName(res.data.data?.studentDetails?.parent_id?.name)
        setParentPhone(res.data.data?.studentDetails?.parent_id?.mobile_number)
        setSubCurr(res.data.data?.studentDetails?.subject_curriculum)
        await setProfileImg(res.data.data?.studentDetails?.user_id?.profile_img_url)
        setBasicDetail(res.data.data?.studentDetails)

        // console.log(res.data.data?.testimonialResponse)
    }

    useEffect(() => {
        getData()
    }, [])
    const navigate = useNavigate()

    const handleEdit = async (e) => {
        e.preventDefault();
        let bdy = {
            name, age, city, state, school,
            //  grade,
            gender,
            mobile_number: phone, parent_name: parentName,  language, parent_mobile_number: parentPhone
        }


        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
            const register = `${BASE_URL}/student/${id}`;
            const response = await axios
                .patch(register, bdy, {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                })

            const { data } = response;
            if (!data.success) {
                ToasterUpdate(myToast, data.message, "error")
                return
            }
            // navigate("/auth-upload");
            ToasterUpdate(myToast, response.data.message, "success")
            console.log(data, "oooooo");
            navigate(`/student/details/${id}`)

        } catch (error) {
            console.log(error)
            ToasterUpdate(myToast, error.message, "error")
        }

        finally {

            setLoading(false)

            const dismiss = () => toast.dismiss(myToast);

            setTimeout(() => {
                dismiss()
            }, 1000);
        }

    };

    const getLanguage = async () => {


        let register = `${BASE_URL}/list`
        // console.log(register)
        let res = await axios.get(register, {
          headers: {
            "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
          }
        })
        console.log(res.data.data)
        // setNationalityData(res.data.data.nationality)
        setLanguageData(res.data.data?.language)
    
    
      }
      useEffect(() => {
        getLanguage()
      }, [])
    console.log(profileImg)
    return (
        <React.Fragment>
            {/* <PagePath /> */}


            <div style={{
                display: "flex", justifyContent: "space-between"
            }}>
                <Heading cls={classes.my_page_heading} heading={'Profile Details'} p='Here you can see your Profile ' />

            </div>
            <ProfileStu data={basicDetail} profileUpdater={profileImg} icon={true} getData={getData} id={id} />

            <Container cls={classes.flex}>
                <div className={`${classes.flex2}`} style={{ border: "none", padding: "0" }}>

                    {data.map((element, index) => (
                        <LabelledInput type={element.type} key={index} id={element.id} ro={element.ro} label={element.label} func={element.func} value={element.value} />
                    ))}

                    <div className={classes.select_div}>
                        <label htmlFor="gender" className={classes.select_label}>Gender</label>
                        <select value={gender} className={classes.select_input} onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className={classes.select_div}>
                        <label htmlFor="gender" className={classes.select_label}>Languages</label>
                        <select value={language} className={classes.select_input} onChange={(e) => setLanguage(e.target.value)}>
                           
                            {languageData?.map((data, index) => <option key={index} value={data}>{data}</option>)}

                        </select>
                    </div>
                    {data3.map((element, index) => (
                        <LabelledInput key={index} id={element.id} ro={element.ro} label={element.label} func={element.func} value={element.value} />
                    ))}
                </div>


                {/* <LabelledTextarea id={'ta'} func={setAddress} label={'Address'} value={address} ro={false} /> */}


                <div style={{ width: "100%" }}>
                    <h4>Parent Detail</h4>
                    <div className={` ${classes.flex2}`}>
                        {parentData.map((element, index) => (
                            <LabelledInput type={element.type} key={index} id={element.id} ro={element.ro} label={element.label} func={element.func} value={element.value} />
                        ))}
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <h4 style={{ marginBottom: "30px" }}>Academic Detail</h4>
                    {subCurr?.map((item) => <>
                        <div className={`${classes.border_box}`}>

                            <h4>{item.subject}</h4>
                            <p>{item.curriculum}</p>
                            {/* <input
                                className={classes.input_di}
                                type="text"
                                value={item.curriculum}
                                readOnly
                            />
                            <input
                                className={classes.input_di}
                                type="text"
                                value={item.subject}
                                readOnly
                            /> */}
                        </div>
                    </>)}


                    <button className={classes.add_aca} onClick={handleOpen}>
                        Add curriculum and Subject  <span style={{ fontSize: "20px" }}>+</span>
                    </button>
                </div>



                <div className={classes.bottom}>
                    <button >Cancel</button>
                    <button onClick={handleEdit} disabled={loading}>Edit Student Profile</button>
                </div>

            </Container>
            {open && <AcademicModal isPopup={open} popupFunc={setOpen} id={id} getData={getData} />}

        </React.Fragment>
    )
}

export default EditStuProfile