import React, { useState } from 'react'
import classes from './Login.module.css'
import Heading from '../../Components/Heading/Heading'
import LabelledInput from '../../Components/LabelledInput/LabelledInput'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ToasterUpdate from '../../Components/Toaster/ToasterUpdate'
import { BASE_URL } from '../../Apis/BaseUrl'
import Cookies from 'js-cookie'
import axios from 'axios'
import animation from "../../assets/animation.png"
import { FiUpload } from "react-icons/fi";

const CompletePage = () => {
    // Form States
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [curriculum, setCurriculum] = useState("");
    const [subject, setSubject] = useState("");
    const [isLoading, setLoading] = useState(false)

    const data = [
        {
            id: "1",
            // ph: "First Name",
            setFunc: setCurriculum,
            setVal: curriculum,
            type: "text",
            label: "Select Curriculum in which you have expertise"
        },
        {
            id: "2",
            // ph: "Last Name",
            setFunc: setSubject,
            setVal: subject,
            type: "text",
            label: "Select Subject in which you have expertise"
        },

    ];

    // console.log(BASE_URL, "pppp")
    const send = async (e) => {
        e.preventDefault();
        const myToast = toast.loading('Please Wait...')
        try {
            let apiKey = {
                first_name: firstName,
                last_name: lastName,
                curriculum,
                subject,
            };
            if (phone.length !== 10) {
                throw new Error('Phone Number must be 10 digits long')
            }
            const register = `${BASE_URL}/auth/register`;
            let response = await axios
                .post(register, apiKey, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            Cookies.set("tutorazzi_token", JSON.stringify(response.data.data), {
                expires: 1,
            });

            navigate("/auth-individual");
            ToasterUpdate(myToast, response.data.message, "success")
            setFirstName("");
            setLastName("");
            setCurriculum("");
            setSubject("");

        } catch (error) {
            console.log(error)
            ToasterUpdate(myToast, error.message, "error")
        }

        finally {

            setLoading(false)
        }
    };
    const handleUploadClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <>
            <div className={classes.nav}>

                <Link className={classes.toggle_btn} to={'/'}>Login</Link>
            </div>
            <div className={classes.popup_main}>
                <div className={classes.right}>
                    <Heading heading={'Let us know more about you'} p={'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'} cls={classes.reversed} />

                    <div className={classes.style_div}>
                        <div className={classes.inn_div}>   <p className={classes.style_div_p}>1 </p> <span>Basic Details</span> </div>

                        <img src={animation} className={classes.img1} />

                        <div className={classes.inn_div}>      <p className={` ${classes.style_div_p}`}>2</p> <span>Video And Testimonials</span></div>
                    </div>
                    <form onSubmit={send} className={classes.form}>
                        <label htmlFor="upload" className={classes.label1}>Video Testimonial</label>
                        <div className={`${classes.upload_box}`} onClick={handleUploadClick}>
                            <FiUpload />
                            <a className={classes.res_a}>Upload video Or Mp4 Format File here only</a>
                            <input type="file" id="fileInput" style={{ display: "none" }} />
                        </div>
                        <div>

                            <label htmlFor="upload" className={classes.label1} style={{ margin: "20px 0" }}>Videos</label>
                            <div className={`${classes.upload_box}`} onClick={handleUploadClick}>
                                <FiUpload />
                                <a className={classes.res_a}>Upload video Or Mp4 Format File here only</a>
                                <input type="file" id="fileInput" style={{ display: "none" }} />
                            </div>
                        </div>


                        <button disabled={isLoading} type='submit' className={classes.button}>Continue</button>
                    </form>
                    <p className={classes.p}>

                        By signing up , you agree to our <a href="#!">Terms</a>. See how we use your data in our <a href="#!">Privacy Policy</a>. We Never Post to Facebook.
                    </p>
                </div>
            </div>
        </>
    )
}

export default CompletePage
