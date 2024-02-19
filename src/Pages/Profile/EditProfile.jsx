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
import { toast } from 'react-toastify'
import ToasterUpdate from '../../Components/Toaster/ToasterUpdate'


const EditProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [DOB, setDOB] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [countryData, setCountryData] = useState([])
const[loading, setLoading] = useState(false)
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
            id: 'mob',
            value: phone,
            func: setPhone,
            ro: false
        },
        {
            label: "Date Of Birth",
            id: 'dob',
            value: DOB,
            func: setDOB,
            ro: false
        },
    ]
    const data3 = [
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
        let register = `${BASE_URL}/profile`
        //   console.log(register)
        let res = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data.data)
        setName(res.data.data.profileDetails.preferred_name)
        setDOB(res.data.data.profileDetails.dob)
        setCity(res.data.data.profileDetails.city)
        setState(res.data.data.profileDetails.state)
        setCountry(res.data.data.profileDetails.country)
        setAddress(res.data.data.profileDetails.address)
        setGender(res.data.data.profileDetails.gender)
        setEmail(res.data.data.userDetails.email)
        setPhone(res.data.data.userDetails.mobile_number)
        setProfileImg(res.data.data.userDetails?.profile_img_url)
        // console.log(res.data.data?.testimonialResponse)
    }

    useEffect(() => {
        getData()
    }, [])
    const navigate = useNavigate()

    const handleEdit = async (e) => {
        e.preventDefault();
        let bdy = {
            name, email, city, state, country, gender,
            address, dob: DOB, mobile_number: phone,
        }


        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
            const register = `${BASE_URL}/profile`;
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
            navigate('/profile')

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

    return (
        <React.Fragment>
            {/* <PagePath /> */}


            <div style={{
                display: "flex", justifyContent: "space-between"
            }}>
                <Heading cls={classes.my_page_heading} heading={'Profile Details'} p='Here you can see your Profile ' />

            </div>
            <ProfileHeader profileUpdater={profileImg} icon={true} getData={getData} />

            <Container cls={classes.flex}>
                <div className={`${classes.flex2} `} style={{ border: "none", padding: "0" }}>

                    {data.map((element, index) => (
                        <LabelledInput key={index} id={element.id} ro={element.ro} label={element.label} func={element.func} value={element.value} />
                    ))}
                    <div className={classes.select_div}>
                        <label htmlFor="gender" className={classes.select_label}>Gender</label>
                        <select value={gender} className={classes.select_input} onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>


                <LabelledTextarea id={'ta'} func={setAddress} label={'Address'} value={address} ro={false} />


                <div className={`${classes.border_box} ${classes.flex2}`}>

                    {data3.map((element, index) => (
                        <LabelledInput key={index} id={element.id} ro={element.ro} label={element.label} func={element.func} value={element.value} />
                    ))}
                    <div className={classes.select_div}>
                        <label htmlFor="gender" className={classes.select_label}>Country of Origin</label>
                        <select className={classes.select_input} value={country} onChange={(e) => setCountry(e.target.value)}>
                            {countryData && countryData?.map((element, index) => (<option key={index} value={element}>{element}</option>))}
                        </select>
                    </div>

                </div>


                <div className={classes.bottom}>
                    <button >Cancel</button>
                    <button onClick={handleEdit} disabled={loading}>Add Class</button>
                </div>

            </Container>

        </React.Fragment>
    )
}

export default EditProfile