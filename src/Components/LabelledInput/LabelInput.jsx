import React, { useState } from 'react'
import classes from './LabelledInput.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LabelInput = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const readOnly = props.readOnly ? true : false;

const togglePasswordVisibility = () => {
  setIsPasswordVisible(!isPasswordVisible);
};
  return (
    <div className={`${classes.input_div} ${props.cls}`} style={{position:"relative"}}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        value={props.value}
        onChange={(e) => props.func(e.target.value)}
        readOnly={props.ro}
        // type={props.type ? props.type : 'text'}
        type={isPasswordVisible ? "text" : props.type}
        id={props.id}
        placeholder={props.ph} />
          {props.type === "password" && (
          <span
            className={classes.password_toggle_icon}
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
    </div>
  )
}

export default LabelInput