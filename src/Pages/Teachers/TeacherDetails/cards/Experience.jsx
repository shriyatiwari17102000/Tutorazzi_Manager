import React from 'react'
import classes from "./Profiles.module.css"
import Moment from 'react-moment'
import { FiDownload } from 'react-icons/fi'

const Experience = (props) => {
    let data = props?.data
    console.log(data)
    const downloadFile = (
      filePath, name
    ) => {
      let fileName = filePath
      console.log(fileName)
    
      fetch(`${filePath}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(new Blob([blob]));
  
          const link = document.createElement('a');
          link.href = url;
          link.download = name;
  
          document.body.appendChild(link);
  
          link.click();
  
          link.parentNode.removeChild(link);
        });
    };
  return (
    <div className={`${classes.main_div} ${classes.main_div2}`}>
      <h3 style={{marginBottom:"10px"}}>{`${data?.curriculum} Curriculum,${data?.subject} `}</h3>
            <p>{data?.exp} Year Experience</p>
           
        
        {/* <p>{data?.subject_curriculum}</p> */}
    
     <button className={classes.exp_btn} onClick={() => downloadFile(data?.resume_url, data?.resume)}>Resume <FiDownload /></button>
    </div>
  )
}

export default Experience