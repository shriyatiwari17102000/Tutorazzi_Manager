import React, { Fragment, useEffect, useState } from 'react'
import Heading from '../../../Components/Heading/Heading'
import classes from './StudentDetails.module.css'
import Container from '../../../UI/Container/Container'
import UserDiv from '../../../Components/UserDiv/UserDiv'
import LabelledInput from '../../../Components/LabelledInput/LabelledInput'
import BlackButton from '../../../Components/BlackButton/BlackButton'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'



  const curruiculam_info  = [
    {
        label:'Curriculum',
        id:'Curriculum',
        value:'Curriculum'
    },
    {
        label:'Grade',
        id:'Grade',
        value:'Grade'
    },
    {
        label:'Subject 1',
        id:'Subject 1',
        value:'Subject 1'
    },
    {
        label:'Subject 2',
        id:'Subject 2',
        value:'Subject 2'
    },
    {
        label:'Subject 3',
        id:'Subject 3',
        value:'Subject 3'
    },
    {
        label:'Subject 4',
        id:'Subject 4',
        value:'Subject 4'
    },
  ]

  const class_info  = [
    {
        label:'Class Name',
        id:'classname',
        value:'Science'
    },
    {
        label:'Class Per Hour',
        id:'cph',
        value:'2'
    },
    {
        label:'Teacher Name',
        id:'tn',
        value:'Puneet Shrivastav'
    },
    {
        label:'No of Hours',
        id:'noh',
        value:'1'
    },
    {
        label:'Start Date',
        id:'sd',
        value:'20/8/2023'
    },
]

const StudentDetails = () => {
    const[data, setData] = useState([])
    const {id} = useParams()

    const perosnal_info = [
        {
          label: "First Name",
          id: 'fn',
          value: 'Puneet'
        },
        {
          label: "Last Name",
          id: 'ln',
          value: 'Shrivastav'
        },
        {
          label: "Email",
          id: 'em',
          value: 'psri@gmail.com'
        },
        {
          label: "Mobile",
          id: 'mob',
          value: '9311676139'
        },
        {
          label: "Parent Email id",
          id: 'em2',
          value: 'Shrivastav@gmail.com'
        },
        {
          label: "Parent Phone Number",
          id: 'mob2',
          value: '12329293993'
        },
        {
          label: "Grade",
          id: 'gr',
          value: 'A'
        },
        {
          label: "City",
          id: 'city',
          value: 'New Delhi'
        },
        {
          label: "Standard",
          id: 'standard',
          value: '12th'
        },
        {
          label: "Address",
          id: 's1',
          value: 'CA 76 D Hari Nagar New Delhi'
        }
      ]
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token
  
    const getData = async () => {
    
      let register = `${BASE_URL}/student-by-id?student_id=${id}`
      console.log(register)
      let res = await axios.get(register, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data.data)
      setData(res.data.data)
    }
    useEffect(() => {
      getData()
    }, [])
    return (
        <Fragment>
            <Heading heading={'Student Profile'} p={'Porem ipsum dolor sit amet, consectetur adipiscing elit.'} />
            <div className={classes.grid}>
                <Container cls={classes.inner_box_1}>
                    <UserDiv data={data} />
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>36</h1>
                        <p>Classes Pending</p>
                    </div>
                </Container>
                <Container cls={classes.inner_box_1}>
                    <div className={classes.det_box}>
                        <h1>36</h1>
                        <p>Classes Completed</p>
                    </div>
                </Container>
                <Container cls={`${classes.inner_box_1} ${classes.red_box}`}>
                    <div className={classes.red_square}>!</div>
                    <div className={classes.red_box_details}>
                        <h4>Class Subscription is about to end</h4>
                        <p>End Date  : 20/8/2023</p>
                    </div>
                </Container>
                <Container cls={classes.inner_box_2} >
                    <h4 className={classes.heading}>Personal Info</h4>
                    {
                        perosnal_info.map((element,index)=>(
                            <LabelledInput key={index} data={element} />
                        ))
                    }
                </Container>
                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Curriculum Info</h4>
                    {
                        curruiculam_info.map((element,index)=>(
                            <LabelledInput key={index} data={element} />
                        ))
                    }
                </Container>
                <Container cls={classes.inner_box_3} >
                    <h4 className={classes.heading}>Class Info</h4>
                    {
                        class_info.map((element,index)=>(
                            <LabelledInput key={index} data={element} />
                        ))
                    }
                    <div className={classes.button_con}>
                        <button>Add Quote</button>
                        <BlackButton>Add Extra Class</BlackButton>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

export default StudentDetails
