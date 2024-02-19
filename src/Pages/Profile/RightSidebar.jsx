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


const RightSidebar = () => {
  
    return (
        <React.Fragment>

            <Container cls={classes.cont_main}>

                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>
                <h1>1</h1>

            </Container>

        </React.Fragment>
    )
}

export default RightSidebar