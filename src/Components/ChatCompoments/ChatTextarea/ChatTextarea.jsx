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
//     const [attachment, setAttachment] = useState("")
//     const[loading, setLoading] = useState(null)

//     let profileTokenJson = Cookies.get("tutorazzi_academic");
//     let profileToken = JSON.parse(profileTokenJson);
//     // console.log(profileToken.access_token)
//     let token = profileToken.access_token;
//     const { id } = useParams()
//     console.log(id)
// // console.log(newMessage)
//     const sendData = async (e) => {
//         e.preventDefault()
//         console.log("ghgfvghf")
//         const formData = new FormData();
//         formData.append('response', newMessage);
//         formData.append('support_id', id);
//         formData.append('attachment', attachment);
//         console.log(attachment)
//         const register = `${BASE_URL}/save-response`
//            setLoading(true)
//         try {
//             const response = await axios.post(register, formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             })
//             console.log(response, "pppppppp")
          
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

//     return (
//         <form
//             onSubmit={sendData}
//             className={classes.my_form}>
//             <div className={classes.input_container}>
//                 <input value={newMessage} onChange={e => setNewMessage(e.target.value)} type="text" placeholder='message...' />
//             </div>
//             <div className={classes.icon_btn}>
//                 {/* <MySVG1 src={input_add_icon} /> */}
//                 <input type="file" onChange={(e)=>setAttachment(e.target.files[0])} style={{ display: "none" }} id="file" />
//                 <label htmlFor="file">
//                   <MdAdd  style={{ cursor: "pointer", position:"absolute" }} />
//                 </label>
               
//               </div>
//             <BlackButton type='submit' cls={`${classes.my_btn}`}><IoSendSharp /></BlackButton>
//         </form>
//     )
// }

// export default ChatTextarea

import React, { useState } from 'react'
import classes from './ChatTextarea.module.css'
import { IoSendSharp } from 'react-icons/io5'
import { MdAdd } from 'react-icons/md'
import BlackButton from '../../BlackButton/BlackButton'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../Apis/BaseUrl'

const ChatTextarea = ({ reqData }) => {
    const [myMessage, setMyMessage] = useState('')
    const [newMessage, setNewMessage] = useState("")
    const [attachment, setAttachment] = useState(null) // Initialize attachment state with null
    const [loading, setLoading] = useState(null)

    let profileTokenJson = Cookies.get("tutorazzi_academic");
    let profileToken = JSON.parse(profileTokenJson);
    let token = profileToken.access_token;
    const { id } = useParams()

    const sendData = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('response', newMessage);
        formData.append('support_id', id);
        formData.append('attachment', attachment);

        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/save-response`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            reqData()
        } catch (error) {
            console.error('Error while uploading data:', error);
        }
        finally {
            setNewMessage("")
            setAttachment(null)
            setLoading(false)
        }
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]); // Set the selected file to the state
    };

    return (
        <form onSubmit={sendData} className={classes.my_form}>
            <div className={classes.input_container}>
                <input
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    type="text"
                    placeholder={!attachment ? 'message...' : ''}
                />
                  {/* Display file name if attachment is selected */}
                  {attachment && <span className={classes.attach1}>{attachment.name}</span>}
            </div>
            <div className={classes.icon_btn}>
                <input
                    type="file"
                    onChange={handleFileChange} // Call handleFileChange on file input change
                    style={{ display: "none" }}
                    id="file"
                />
                <label htmlFor="file">
                    <MdAdd style={{ cursor: "pointer", position: "absolute" }} />
                </label>
              
            </div>
            <BlackButton type='submit' cls={`${classes.my_btn}`}><IoSendSharp /></BlackButton>
        </form>
    )
}

export default ChatTextarea

