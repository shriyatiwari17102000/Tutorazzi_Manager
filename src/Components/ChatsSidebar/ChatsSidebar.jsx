import React from 'react'
import Container from '../../UI/Container/Container'
import classes from './ChatsSidebar.module.css'
import SearchBar from '../SearchBar/SearchBar'
import ChatDp from '../ChatDp/ChatDp'
import ChatBox from '../ChatBox/ChatBox'

const ChatsSidebar = (props) => {
  return (
    <Container cls={classes.sidebar}>
      <SearchBar cls={classes.sb} />
      <div className={classes.active_box}>
        <h3 className={classes.sidebar_heading}>Active</h3>
        <div className={classes.ab_container}>
          <ChatDp />
          <ChatDp />
          <ChatDp />
          <ChatDp />
          <ChatDp />
          <ChatDp />
          <ChatDp />
        </div>
      </div>
      <div className={classes.sidebar_body}>
        <h3 className={classes.sidebar_heading}>Messages <span>40</span></h3>
        <div className={classes.sb_container}>
          <ChatBox activeFnc={props.Func} val={props.value} />
          <ChatBox activeFnc={props.Func} val={props.value} />
          <ChatBox activeFnc={props.Func} val={props.value} />
          <ChatBox activeFnc={props.Func} val={props.value} />
          <ChatBox activeFnc={props.Func} val={props.value} />
          <ChatBox activeFnc={props.Func} val={props.value} />
          <ChatBox activeFnc={props.Func} val={props.value} />
        </div>
      </div>
    </Container>
  )
}

export default ChatsSidebar