import React from 'react'
import plus from '../../../../assets/plus-01.png'
import img from '../../../../assets/image-add.png'
import smile from '../../../../assets/smiley-happy-plus.png'
import send from '../../../../assets/send-01.png'
import classes from '../../ChatsMain.module.css'

const ChatsFooter = () => {
  return (
    <div className={classes.footer}>
        <div className={classes.textarea}>
          <input type="text" />
          <div>
            <button><img src={plus} alt="" /></button>
            <button><img src={img} alt="" /></button>
            <button><img src={smile} alt="" /></button>
          </div>
        </div>
        <button>
          <img src={send} alt="" />
        </button>
      </div>
  )
}

export default ChatsFooter