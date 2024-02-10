import React, { useState } from 'react'
import classes from './ChatsLayout.module.css'
import ChatsSidebar from '../../Components/ChatsSidebar/ChatsSidebar'
import ChatsMain from '../../Components/ChatsMain/ChatsMain'

const ChatsLayout = () => {

  const [isActive,setActive] = useState(false)

  return (
    <div className={classes.container}>
        <ChatsSidebar Func={setActive} value={isActive} />
        <ChatsMain value={isActive} />
    </div>
  )
}

export default ChatsLayout