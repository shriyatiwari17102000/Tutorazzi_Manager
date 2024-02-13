import React from 'react'
import classes from './LabelledInput.module.css'

const LabelledInput = (props) => {

  const { data } = props
  console.log(props)

  return (
    <div className={`${classes.input_div} ${props.cls}`}>
      {props?.label && <label htmlFor={props?.id}>{props?.label}</label>}
      {!props.in_d && <input value={props?.value} readOnly={props?.ro} type={props?.type ? props?.type : 'text'} id={props?.id} placeholder={props?.ph}  onChange={(e) => props.func(e.target.value)}/>}
      {props.in_d && <input value={props?.data?.value} readOnly={props?.data?.ro} type={props?.data?.type ? props?.data?.type : 'text'} id={props?.data?.id} placeholder={props?.data?.ph}  onChange={(e) => props.func(e.target.value)}/>}
    </div>
  )
}

export default LabelledInput