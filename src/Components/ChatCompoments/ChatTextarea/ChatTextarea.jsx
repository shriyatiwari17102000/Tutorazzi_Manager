// import React, { useState } from 'react'
// import classes from './ChatTextarea.module.css'
// import { IoSendSharp } from 'react-icons/io5'
// import { MdAdd } from 'react-icons/md'
// import BlackButton from '../../BlackButton/BlackButton'
// import { toast } from 'react-toastify'
// import Cookies from 'js-cookie'

// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { BASE_URL } from '../../../Apis/BaseUrl'

// const ChatTextarea = ({ reqData }) => {
//     const [myMessage, setMyMessage] = useState('')
//     const [newMessage, setNewMessage] = useState("")
//     const [attachment, setAttachment] = useState(null) // Initialize attachment state with null
//     const [loading, setLoading] = useState(null)

//     let profileTokenJson = Cookies.get("tutorazzi_academic");
//     let profileToken = JSON.parse(profileTokenJson);
//     let token = profileToken.access_token;
//     const { id } = useParams()

//     const sendData = async (e) => {
//         e.preventDefault()

//         const formData = new FormData();
//         if (!newMessage && !attachment) {
//             return toast.error('Either select a file or send a message')
//         }
//         formData.append('response', newMessage);
//         formData.append('support_id', id);
//         formData.append('attachment', attachment);

//         setLoading(true)
//         try {
//             const response = await axios.post(`${BASE_URL}/save-response`, formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             })

//             reqData()
//         } catch (error) {
//             console.error('Error while uploading data:', error);
//         }
//         finally {
//             setNewMessage("")
//             setAttachment(null)
//             setLoading(false)
//         }
//     };

//     // Function to handle file input change
//     const handleFileChange = (e) => {
//         setAttachment(e.target.files[0]); // Set the selected file to the state
//     };

//     return (
//         <form onSubmit={sendData} className={classes.my_form}>
//             <div className={classes.input_container}>
//                 <input
//                     value={newMessage}
//                     onChange={e => setNewMessage(e.target.value)}
//                     type="text"
//                     placeholder={!attachment ? 'message...' : ''}
//                 />
//                   {/* Display file name if attachment is selected */}
//                   {attachment && <span className={classes.attach1}>{attachment.name}</span>}
//             </div>
//             <div className={classes.icon_btn}>
//                 <input
//                     type="file"
//                     onChange={handleFileChange} // Call handleFileChange on file input change
//                     style={{ display: "none" }}
//                     id="file"
//                 />
//                 <label htmlFor="file">
//                     <MdAdd style={{ cursor: "pointer", position: "absolute" }} />
//                 </label>
              
//             </div>
//             <BlackButton type='submit' cls={`${classes.my_btn}`}><IoSendSharp /></BlackButton>
//         </form>
//     )
// }

// export default ChatTextarea

import React, { useState } from 'react'
import classes from './ChatTextarea.module.css'
import { IoSendSharp } from 'react-icons/io5'
import { MdAdd, MdOutlineAddReaction } from 'react-icons/md'
import BlackButton from '../../BlackButton/BlackButton'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../Apis/BaseUrl'
import Container from '../../../UI/Container/Container'
import { RxCross2 } from 'react-icons/rx'

const ChatTextarea = ({ reqData }) => {
    const [myMessage, setMyMessage] = useState('')
    const [newMessage, setNewMessage] = useState("")
    const [attachment, setAttachment] = useState("")
    const[loading, setLoading] = useState(null)
    const [filename, setFileName] = useState(null);
    const [file, setFile] = useState(null);

    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    // console.log(profileToken.access_token)
    let token = profileToken.access_token;
    const { id } = useParams()
    // console.log(id)

    const resetFunc = () => {
        setFileName(null)
        setFile(null)
      }
      const handleInputChange = (e) => {
        setNewMessage(e.target.value);
      };

      const handleFileChange = (e) => {
        const file2 = e.target.files[0];
        setFile(file2)
        if (file2) {
          const fileType = file2.type;
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setFileName(e.target.result)
          };
          reader.readAsDataURL(file2);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };

    const sendData = async (e) => {
        e.preventDefault()
        console.log(file)
        const formData = new FormData();
        if (!newMessage && !file) {
            return toast.error('Either select a file or send a message')
        }
        formData.append('response', newMessage);
        formData.append('support_id', id);
        formData.append('attachment', file);
        console.log(attachment)
        const register = `${BASE_URL}/save-response`
           setLoading(true)
        try {
            const response = await axios.post(register, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(response, "pppppppp")
          
            reqData()
        } catch (error) {
           
            console.error('Error while uploading data:', error);
          
        }
        finally {
            setNewMessage("")
            setFile(null)
            setLoading(false)
        }
    };
    console.log(filename)

    const isImage = file && file.type.startsWith('image/');


    return (
        <form
            onSubmit={sendData}
            className={classes.my_form}>
            {/* <div className={classes.input_container}>
                <input value={newMessage} onChange={e => setNewMessage(e.target.value)} type="text"    placeholder={!attachment ? 'message...' : ''} />
                {attachment && <span className={classes.attach1}>{attachment.name}</span>}
            </div>
            <div className={classes.icon_btn}>
                <input type="file" onChange={(e)=>setAttachment(e.target.files[0])} style={{ display: "none" }} id="file" />
                
                <label htmlFor="file">
                  <MdAdd  style={{ cursor: "pointer" }} />
                </label>
               
              </div> */}
               <div className="inputWrapper">

<Container cls="d-flex flex-column row-gap-1 px-3 py-1">
  <input
    type="text"
    className="chat_input"
    value={newMessage}
    onChange={handleInputChange}
    placeholder="Message ..."
    style={{ border: "none", background: "none", outline: "none" }}
  />
  {/* {file &&
    <div className={classes.render_img}>
      <img src={filename} alt="" />
      <button type='button' onClick={resetFunc} className={classes.del_btn}><RxCross2 style={{ color: "white" }} /></button>
    </div>
  } */}


             {isImage && (
                <div className={classes.render_img}>
                    <img src={URL.createObjectURL(file)} alt="preview" className={classes.render_img} />
                    <button type='button' onClick={resetFunc} className={classes.del_btn}><RxCross2 style={{ color: "white" }} /></button>
                </div>
            )}
            {!isImage && file && (
                <div className={classes.render_pdf}>
                    <p>{file.name}</p>
                    <button type='button' onClick={resetFunc} className={classes.del_btn}><RxCross2 style={{ color: "white" }} /></button>
                </div>
            )}

  <div className="chat_send gap-2" style={{ cursor: "pointer" }}>

    <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="file" />
    <label htmlFor="file">
      <MdAdd style={{ cursor: "pointer" }} />
    </label>

    {/* <MdOutlineAddReaction onClick={() => setShowEmojiPicker(!showEmojiPicker)} /> */}
    {/* <div className="chat_send1">
      {showEmojiPicker && (
        <Picker data={data} onEmojiSelect={handleEmojiClick} />
      )}
    </div> */}
  </div>
</Container>


</div>
            <BlackButton type='submit' cls={`${classes.my_btn}`}><IoSendSharp /></BlackButton>
        </form>
    )
}

export default ChatTextarea

