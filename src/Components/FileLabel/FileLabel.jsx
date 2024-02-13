import React, { useState } from 'react'
import classes from './FileLabel.module.css'

const FileLabel = (props) => {

  const [data,setData] = useState('') 

  const fileHandler = e => {
    props.setter(e)
    setData(e.target.value)

  }

  return (
    <div className={classes.input_container}>
        <input onChange={fileHandler} value={data} type="file" id={props.id} />
        <label htmlFor={props.id}>{props.label ? props.label : 'Upload'}</label>
        <div>{data}</div>
    </div>
  )
}

export default FileLabel