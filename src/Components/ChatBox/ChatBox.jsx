import React from 'react'
import classes from './ChatBox.module.css'
import ChatDp from '../ChatDp/ChatDp'

const ChatBox = (props) => {
    return (
        <div onClick={()=>props.activeFnc(!props.val)} className={classes.chatbox}>
            <div className={classes.chatbox_top}>
                <ChatDp />
                <ChatDp />
            </div>
            <div className={classes.chatbox_bottom}>
                <div>
                    <h4>Puneet's Group</h4>
                    <p>5 min</p>
                </div>
                <p>3 Messages</p>
            </div>
        </div>
    )
}

export default ChatBox