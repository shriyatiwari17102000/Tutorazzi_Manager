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


const ForgotPassword = () => {
    // Form States
    const [email, setEmail] = useState("");
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    const data = [
   
        {
            id: "1",
            ph: "Enter Email",
            setFunc: setEmail,
            setVal: email,
            type: "email"
        },
       
    ];


    const send = async (e) => {
        e.preventDefault();
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
          let apiKey = {
            email,
          };
          console.log(apiKey, "apikry");
          const register = `${BASE_URL}/verify-Email`;
          const res = await axios
            .post(register, apiKey, {
              headers: {
                "Content-Type": "application/json",
              },
            })
          if (!res.data.success) {
            throw new Error(res.data.message)
          }
          // Cookies.set("tutorazzi_token", JSON.stringify(res.data.data), {
          //   expires: 1,
          // });
        //   Cookies.set("profile-data", JSON.stringify(res.data.data?.eligibility));
    
          ToasterUpdate(myToast, res.data.message, "success")
    
        //   if (!res.data.data.eligibility.isCompleted) {
        //     return navigate("/auth-individual");
        //   }
    
        //   if (!res.data.data.eligibility.isApproved) {
        //     return navigate("/auth-process");
        //   }
          // navigate("/dashboard");
        }
        catch (error) {   
          ToasterUpdate(myToast, error.message , "error")
        }
        finally {
          setEmail("");
          // setPassword("")
          setLoading(false)
        }
      };

    return (
        <>
            <div className={classes.nav}>

                <Link className={classes.toggle_btn} to={'/'}>Login</Link>
            </div>
            <div className={classes.popup_main}>

                <div className={`${classes.right}`}>
                    <Heading heading={'Forget Password ? Let Us Help You'} p={'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'} cls={classes.reversed} />

                   
                    <form style={{width:"50%"}}
                        onSubmit={send}
                        className={classes.form}>
                        {data.map((item, index) => (
                            <LabelledInput cls={classes.width_ele} key={index}  plceholder={item.ph} name={item.label} func={item.setFunc} value={item.setVal} ph={item.ph} id={item.id} type={item.type} />
                        ))}
                        <button disabled={isLoading} type='submit' className={classes.button}>Get Reset Link</button>
                    </form>
                    <p className={classes.p}>

                        By signing up , you agree to our <a href="#!">Terms</a>. See how we use your data in our <a href="#!">Privacy Policy</a>. We Never Post to Facebook.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
