import React, { useEffect, useState } from 'react'
import Modal from '../../Modal/Modal'
import Heading from '../../Heading/Heading'
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'
import moment from 'moment'
import ToasterUpdate from '../../Toaster/ToasterUpdate'
import { BASE_URL } from '../../../Apis/BaseUrl'
import classes from "./Quote.module.css"
import LabelledInput from '../../LabelledInput/LabelledInput'

const TransferModal = ({ id, popupFunc, isPopup, func, setShow, show, data1, getData }) => {
    // console.log(data1)
    console.log("fhjfgfgfggfh")
    const [query, setQuery] = useState('')
    const [price, setPrice] = useState('')
    const [classCount, setClassCount] = useState('')
    const [classNames, setClassNames] = useState('')
    const [teacher, setTeacher] = useState('')
    const [teacherData, setTeacherData] = useState('')
    const [isLoading, setLoading] = useState(false)


    console.log(data1)

    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token

    const getTeacher = async () => {
        const register = `${BASE_URL}/all-teachers?subject=${data1?.subject}&curriculum=${data1?.curriculum}&teacher_id=${data1?.teacher_id}`
        let response = await axios.get(register, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `,
            },
        })

        console.log(response.data.data?.docs)
        setTeacherData(response.data.data?.docs)
        setTeacher(response.data.data.docs[0]?.user_id)
    }

    useEffect(() => {
        getTeacher()
    }, [])

    // console.log(sub)

    const handleDataUpload = async () => {
        const register = `${BASE_URL}/transfer-Class-Bundle/${data1?._id}`

        let bdy = {
            teacher_id: teacher

        }
        console.log(bdy)
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
            let response = await axios.patch(register, bdy, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token} `,
                },
            })

            console.log(response)
            ToasterUpdate(myToast, response.data.message, "success")
            func && func()
            getData()
            setShow && setShow(!show)
        } catch (error) {
            ToasterUpdate(myToast, error.message, "error")
        }
        finally {
            popupFunc(!isPopup)
            setLoading(false)

        }
    }


    return (
        <Modal cls={`${classes.popup}`} value={isPopup} Func={popupFunc}>
            <div className={classes.top}>
                <Heading heading={'Transfer Classes'} p={''} />
            </div>

            <div className={classes.body}>

                <div style={{ width: "100%" }}>
                    <label className={classes.label1} >Select Teacher</label>
                    <select name="" id="" className={classes.selecttag} value={teacher} onChange={(e) => setTeacher(e.target.value)}>

                        {teacherData && teacherData?.map((element, index) => (<option key={index} selected value={element.user_id}>{element.preferred_name}</option>))}

                    </select>


                </div>


            </div>

            <div className={classes.bottom}>
                <button type='submit' onClick={() => { popupFunc(!isPopup) }}>Cancel</button>
                <button style={{ background: "black", color: "white" }} disabled={isLoading}
                onClick={handleDataUpload}
                >Transfer Classes</button>
            </div>
        </Modal>
    )
}

export default TransferModal