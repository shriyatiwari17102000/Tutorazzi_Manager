import React from 'react'
import classes from './Chatbox.module.css'
import Container from '../../../UI/Container/Container'
import ChatTextarea from '../ChatTextarea/ChatTextarea'
import ChatMessage from '../ChatMessage/ChatMessage'
import { useRef } from 'react'
import { useEffect } from 'react'

const Chatbox = ({ myChat, setMyChat, data, url , reqData}) => {


  const myDivRef = useRef(null);

  const scrollToBottom = () => {
    if (myDivRef.current) {
      myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  const props = { myChat, setMyChat, data, url, reqData, scrollToBottom }

  return (
    <Container cls={classes.container}>
      <div ref={myDivRef} style={data.status == 'closed' ? { height: '100%' } : {}} className={classes.chats_container}>
        {myChat?.map((element, index) => (
          <ChatMessage key={index} data={element} />
        ))}
      </div>
      {data.status !== 'closed' &&
        <ChatTextarea {...props} />}
    </Container>
  )
}

export default Chatbox
