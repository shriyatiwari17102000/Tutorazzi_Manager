import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import classes from './PagePath.module.css'
import cr from '../../assets/cr.png'
const PagePath = () => {


    const navigate = useNavigate()
    const param = useParams()
    const location = useLocation();
    const path = location.pathname;

    const newPath = path.split('/')
    newPath.splice(0, 1)[0]

    const newArr = newPath.filter((element)=>(
        element !== param.id
    ))

    const goTo = (num) => {
        if (num == newArr.length-1) {
            return 
        }
        navigate(num-1)
    }

    return (
        <div className={classes.path}>
            {newArr.map((element, index) => (
                <span className={`${classes.path_span} ${index === newArr.length - 1 ? classes.active_span : ''}`} key={index} onClick={() => goTo(index)}>
                    {element}
                    {index === newArr.length - 1 ? '' : <img src={cr} alt="" />}
                </span>
            ))}
        </div>
    )
}

export default PagePath