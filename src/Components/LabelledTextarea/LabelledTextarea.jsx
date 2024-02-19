import React from 'react'
import classes from './LabelledTextarea.module.css'

const LabelledTextarea = (props) => {
    // console.log(props.value)
    let data = props?.value
    return (
        <div className={classes.input_div}>
            <label htmlFor={props.id}>{props.label}</label>
            {/* <textarea readOnly={props.ro} id={props.id}>
                {data} 
            </textarea> */}
             <textarea  value={props.value}
          readOnly={props.ro}
          id={props.id}
          rows={3}
          style={{overflow:"hidden"}}
          placeholder={props.plceholder}
          onChange={(e) => props.func(e.target.value)}>
                {props.value}
            </textarea>
        </div>
    )
}

export default LabelledTextarea