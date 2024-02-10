import React from 'react'
import classes from './Chats.module.css'
import PagePath from '../../Components/PagePath/PagePath'
import Heading from '../../Components/Heading/Heading'
import ChatsLayout from '../../UI/ChatsLayout/ChatsLayout'

const Chats = () => {
  return (
    <React.Fragment>
        <PagePath />
        <Heading heading={'Chats'} p={'You can see your schedule here and know your classes'} />
        <ChatsLayout />
    </React.Fragment>
  )
}

export default Chats