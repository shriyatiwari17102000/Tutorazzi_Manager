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
import LabelledSignInInput from '../LabelledInput/LabelledSignInInput'


const SignUpLayout = () => {
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
    // const send = async (e) => {
    //     e.preventDefault();
    //     const myToast = toast.loading('Please Wait...')
    //     try {
    //         let apiKey = {
    //             first_name: firstName,
    //             last_name: lastName,
    //            curriculum,
    //            subject
    //         };
           
    //         const register = `${BASE_URL}/auth/register`;
    //         let response = await axios
    //             .post(register, apiKey, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             })
    //         if (!response.data.success) {
    //             throw new Error(response.data.message)
    //         }
    //         Cookies.set("tutorazzi_token", JSON.stringify(response.data.data), {
    //             expires: 1,
    //         });

    //         navigate("/auth-individual");
    //         ToasterUpdate(myToast, response.data.message, "success")
    //         setFirstName("");
    //         setLastName("");
    //         setCurriculum("");
    //         setSubject("");
    //         // setPassword("");
    //     } catch (error) {
    //         console.log(error)
    //         ToasterUpdate(myToast, error.message, "error")
    //     }

    //     finally {
    //         setLoading(false)
    //     }
    // };

    const send = (e) => {
        e.preventDefault()
    }

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

                        <div className={classes.inn_div}>      <p className={`${classes.p2} ${classes.style_div_p}`}>2</p> <span>Video And Testimonials</span></div>
                    </div>
                    <form
                     onSubmit={send}
                      className={classes.form}>

                        <div style={{ display: "flex", width: "100%", gap: "20px" }}>

                            <LabelledInput cls={classes.div_gap} value={firstName} func={setFirstName} label={"First Name"} />
                            <LabelledInput cls={classes.div_gap} value={lastName} func={setLastName} label={"Last Name"} />
                        </div>
                        {data.map((item, index) => (
                            <LabelledSignInInput cls={classes.width_ele} key={index} plceholder={item.ph} func={item.setFunc} label={item.label} value={item.setVal} ph={item.ph} id={item.id} type={item.type} />
                        ))}


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

export default SignUpLayout


// import React, { useState } from 'react'

// const SignUpLayout = () => {
//     const [selectedPrice, setSelectedPrice] = useState('')
//     const prices = [100, 200, 500, 1000, 2000];

//     const handlePriceSelection = (price) => {
//         setSelectedPrice(price);
//         // setModalIsOpen(false); // Close modal after price selection
//       };

//   return (
//     <div>
//    <h2>Select Price</h2>
//         <input
//           type="text"
//           value={selectedPrice}
//           onChange={(e) => setSelectedPrice(e.target.value)}
//           placeholder="Enter custom price"
//         />
//         <div className="price-tags">
//           {prices.map((price, index) => (
//             <div key={index} className="price-tag" onClick={() => handlePriceSelection(price)}>
//               {price}
//             </div>
//           ))}
//         </div>
//     </div>
//   )
// }

// export default SignUpLayout
