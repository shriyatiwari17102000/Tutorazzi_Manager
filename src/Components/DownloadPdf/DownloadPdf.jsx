// import React from 'react'
// import classes from './DownloadPdf.module.css'
// import { IoDocumentOutline } from "react-icons/io5";
// import { MdOutlineFileDownload } from "react-icons/md";
// import Container from '../../UI/Container/Container';


// const DownloadPdf = () => {
//   return (
//     <div className={classes.row}>
//       <div className={classes.row_inner}>
//         <Container cls={classes.row_span}><IoDocumentOutline /></Container>
//         Lorem, ipsum dolor.
//       </div>
//       <MdOutlineFileDownload />
//     </div>
//   )
// }

// export default DownloadPdf
import React from 'react'
import classes from './DownloadPdf.module.css'
import { IoDocumentOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import Container from '../../UI/Container/Container';
import { FaDownload } from 'react-icons/fa';


const DownloadPdf = (props) => {
  let data = props?.item
  // console.log(data)

  const downloadFile = (
    filePath
  ) => {
    let fileName = filePath
  
    fetch(`https://tutorrazzi-prvx.onrender.com/${filePath}`, {
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
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      });
  };
  return (
    <div className={classes.row}>
      <div className={classes.row_inner}>
        <Container cls={classes.row_span}><IoDocumentOutline /></Container>
       <p style={{fontSize:"14px"}}> {data?.name}</p>
      </div>
      <span onClick={() => downloadFile(data?.name)}>
        <a

          style={{ color: "black", textAlign: "center", fontSize: "20px", cursor: "pointer" }}
        >
          <MdOutlineFileDownload  />
        </a>
      </span>
    </div>
  )
}

export default DownloadPdf
