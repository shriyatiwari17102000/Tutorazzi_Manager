import React, { useEffect, useState } from 'react'
import classes from './Login.module.css'
import Heading from '../../Components/Heading/Heading'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ToasterUpdate from '../../Components/Toaster/ToasterUpdate'
import { BASE_URL } from '../../Apis/BaseUrl'
import Cookies from 'js-cookie'
import axios from 'axios'
import LabelledInput from '../LabelledInput/LabelledInput'
import LabelInput from '../LabelledInput/LabelInput'

const SignInPage = () => {
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    {
      id: "2",
      ph: "Password",
      setFunc: setPassword,
      setVal: password,
      type: "password"
    },
  ];


  const send = async (e) => {
    e.preventDefault();
    const myToast = toast.loading('Please Wait...')
    setLoading(true)
    try {
      let apiKey = {
        email,
        password,
      };
      console.log(apiKey, "apikry");
      const register = `${BASE_URL}/SignIn`;
      const res = await axios
        .post(register, apiKey, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        console.log(res)
      if (!res.data.success) {
        throw new Error(res.data.message)
      }
      Cookies.set("tutorazzi_academic", JSON.stringify(res.data.data), {
        expires: 1,
      });
      // Cookies.set("profile-data", JSON.stringify(res.data.data?.is_complete));
      ToasterUpdate(myToast, res.data.message, "success")

      // if (!res.data.data.is_complete) {
      //   return navigate("/auth-complete");
      // }

      //   if (!res.data.data.is_testimonial) {
      //     return navigate("/auth-upload");
      //   }
      navigate("/dashboard");
    }
    catch (error) {
      ToasterUpdate(myToast, error.message, "error")
    }
    finally {
      setEmail("");
      setPassword("")
      setLoading(false)
    }
  };

  useEffect(() => {
    let auth = Cookies.get("tutorazzi_academic")
    if (auth) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <>
      <div className={classes.nav}>

        {/* <Link className={classes.toggle_btn} to={'/'}>Login</Link> */}
      </div>
      <div className={classes.popup_main}>

        <div className={`${classes.right}`}>
          <Heading heading={'We’re glad you’re back!'} p={'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'} cls={classes.reversed} />


          <form style={{ width: "50%" }}
            onSubmit={send}
            className={classes.form}>
            {data.map((item, index) => (
              <LabelInput required={true} cls={classes.width_ele} key={index} plceholder={item.ph} name={item.label} func={item.setFunc} value={item.setVal} ph={item.ph} id={item.id} type={item.type} />
            ))}
            <p>Don't Remeber Password ? <Link to={'/auth-reset'}>Forget Password</Link></p>
            <button disabled={isLoading} type='submit' className={classes.button}>Login In</button>

          </form>
          <p className={classes.p}>

            By signing up , you agree to our <a href="#!">Terms</a>. See how we use your data in our <a href="#!">Privacy Policy</a>. We Never Post to Facebook.
          </p>
        </div>
      </div>
    </>
  )
}

export default SignInPage
