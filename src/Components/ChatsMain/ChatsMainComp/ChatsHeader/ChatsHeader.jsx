import React, { useState } from 'react'
import classes from '../../ChatsMain.module.css'

import ChatDp from '../../../ChatDp/ChatDp'
import search from '../../../../assets/search-02.png'
import adduser from '../../../../assets/user-profile-add.png'
import help from '../../../../assets/help.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchBar from '../../../SearchBar/SearchBar'

const ChatsHeader = () => {


  const [menu,setMenu] = useState(false)
  const [sb,setSb] = useState(false)

  return (
    <div className={classes.header}>
    <div>
      <ChatDp />
      <div>
        <h3>Puneet Shrivastav Group</h3>
        <p>@pueeetsrivastav</p>
      </div>
    </div>
    <div className={`${classes.menu} ${menu===true?classes.menu_active:''}`}>
      <button onClick={()=>setSb(!sb)}><img src={search} alt="" /></button>
      <button><img src={adduser} alt="" /></button>
      <button><img src={help} alt="" /></button>
    </div>
    <button onClick={()=>{setMenu(!menu)}} className={classes.menu_btn}><BsThreeDotsVertical /></button>
    {sb && <SearchBar cls={classes.search_bar} /> }
  </div>
  )
}

export default ChatsHeader