import React, { useState } from 'react'
import classes from './DragDrop.module.css'
import cloud from '../../assets/cloud.png'

const DragDrop = () => {

  const [files, setFiles] = useState([])

  const handleDrag = (e) => {
    e.preventDefault()
    console.log('Your drag event', e);
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setFiles(e.dataTransfer.files)
    console.log('Your drop event', e.dataTransfer.files, typeof (e.dataTransfer.files));
  }

  const values = Object.values(files);

  return (
    <div className={classes.container}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {files.length === 0?
        <>
          <img src={cloud} alt="Cloud Image" />
          <input hidden type="file" id='fileInp' />

          <p><label htmlFor="fileInp">Click to upload</label> or drag and drop file here</p>
          <p>Max file size 50 MB</p>
        </>
        :
        values.map((element, index) => (
          <p>{element.name}</p>
        ))



      }
    </div>
  )
}

export default DragDrop