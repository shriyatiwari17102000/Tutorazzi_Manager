import React, { useEffect, useRef, useState } from 'react'
import classes from './SupportDetails.module.css'
import PagePath from '../../../Components/PagePath/PagePath'
import Container from '../../../UI/Container/Container'
import ChatsFooter from '../../../Components/ChatsMain/ChatsMainComp/ChatsFooter/ChatsFooter'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ToasterUpdate from '../../../Components/Toaster/ToasterUpdate'
import { BASE_URL } from '../../../Apis/BaseUrl'
import axios from 'axios'
import Cookies from 'js-cookie'
import ChatTextarea from '../../../Components/ChatCompoments/ChatTextarea/ChatTextarea'
import ChatMessage from '../../../Components/ChatCompoments/ChatMessage/ChatMessage'
import Moment from 'react-moment'

const SupportDetails = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [myChat, setMyChat] = useState([])


    const { id } = useParams()
    console.log(id)
    const tutToken = Cookies.get("tutorazzi_academic")
    const getTutToken = JSON.parse(tutToken)
    const token = getTutToken.access_token


    const reqData = () => {
        const register = `${BASE_URL}/ticket-details?ticket_id=${id}`;
        axios.get(register, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },
        })
          .then((res) => {
            setData(res.data.data)
            console.log(res.data.data)
            setMyChat(res.data.data.responses)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
      useEffect(() => {
        reqData()
      }, [])

    const closeChat = async () => {
        const register = `${BASE_URL}/resolve-ticket/${id}`
        const myToast = toast.loading('Please Wait...')
        setLoading(true)
        try {
            const response = await axios.patch(register, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            console.log(response, "pppppppp")
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            ToasterUpdate(myToast, response.data.message, "success")
            reqData()
        } catch (error) {
            console.error('Error while uploading data:', error);
            ToasterUpdate(myToast, error.message, "error")
        }
        finally {
            setLoading(false)
        }
    };

    const myDivRef = useRef(null);

    const scrollToBottom = () => {
      if (myDivRef.current) {
        myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
      }
    };
  
    useEffect(() => {
      scrollToBottom();
    });
    const props = {
      setMyChat,
      myChat,
      data,
      reqData,
      url: 'ticket'
    }
    // console.log(data?.ticketDetails?.status)
    return (
        <React.Fragment>
            <PagePath />
            <Container cls={classes.container}>
                <div className={classes.header}>
                    <div>
                        <h3>Ticket Details</h3>
                        <span># {data?.ticketDetails?.ticket_id}</span>
                    </div>
                    <button className={classes.close_btn} disabled={data?.ticketDetails?.status === 'Resolved'} click={true} onClick={closeChat}>{data?.ticketDetail?.status === 'Resolved' ? 'Chat Already Closed' : 'Close Chat'}</button>
                    {/* <select>
                    <option value="1">Mark 1</option>
                    <option value="2">Mark 2</option>
                    <option value="3">Mark 3</option>
                </select> */}
                </div>
                <div className={classes.middle}>
                    <div className={classes.row}>
                        <p>Subject</p>
                        <span>{data?.ticketDetails?.subject}</span>
                    </div>
                    <div className={classes.row}>
                        <p>Date Created</p>
                        <span><Moment format="DD/MM/YYYY">{data?.ticketDetails?.createdAt}</Moment></span>
                    </div>
                    <div className={classes.row}>
                        <p>Description</p>
                        <span>{data?.ticketDetails?.description}</span>
                    </div>
                </div>
                <Container cls={classes.container_css}>
      <div ref={myDivRef} style={data?.ticketDetails?.status == 'Resolved' ? { height: '100%' } : {}} className={classes.chats_container}>
        {myChat?.map((element, index) => (
          <ChatMessage key={index} data={element} />
        ))}
      </div>
      {data?.ticketDetails?.status !== 'Resolved' &&
        <ChatTextarea {...props} />}
    </Container>
                 {/*
                <Container cls={classes.container2}>
                    <div className={classes.innter_top}>
                        <div className={classes.response}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>
                        <div className={classes.reply}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>
                        <div className={classes.response}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>

                      
                         <div className={classes.reply}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>
                        <div className={classes.response}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>
                        <div className={classes.reply}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>
                        <div className={classes.response}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>
                        <div className={classes.reply}>
                            <Container cls={classes.con}>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga perspiciatis vel porro, dolore harum et. Ipsa error qui, repudiandae minus laboriosam veritatis!</p>
                            </Container>
                            <div className={classes.message_footer}>
                                <span>20/13/23</span>
                                <span>21/13/23</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.innter_bottom}>
                        <ChatsFooter />
                    </div>
        </Container> */}
            </Container>
        </React.Fragment>
    )
}

export default SupportDetails