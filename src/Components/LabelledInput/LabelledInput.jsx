import React from 'react'
import classes from './LabelledInput.module.css'

const LabelledInput = (props) => {

  const {data} = props
  console.log(props)

  return (
    <div className={`${classes.input_div} ${props.cls}`}>
        {props?.label && <label htmlFor={props?.id}>{props?.label}</label>}
        <input value={props?.value} readOnly={props?.ro} type={props?.type ? props?.type:'text'} id={props?.id} placeholder={props?.ph}  />
    </div>
  )
}

export default LabelledInput