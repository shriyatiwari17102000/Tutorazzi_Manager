import React, { useState } from 'react'
import classes from './Calendar.module.css'
import './Calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import img from '../../assets/dp1.png'
import CalendarModal from '../AllModals/CalendarModal/CalendarModal'





const Calendar = () => {

  const [popup,setPopup] = useState(false)
  const [data,setData] = useState({title:'num'})

  const showPopup = (data) => {
    setData({title:data.event.title})
    setPopup(true)
  }


  function renderEventContent(eventInfo) {
    return (
      <>
        <div className={classes.event} onClick={()=>showPopup(eventInfo)} >
          <img src={img} alt="Person" />
          <span>{eventInfo.event.title}</span>
        </div>
      </>
    )
  }


  return (
    <div>
      <CalendarModal data={data} isPopup={popup} popupFunc={setPopup}  />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        events={[
          { title: 'event 1', date: '2023-07-01',bg:'0013qefs' },
          { title: 'event 2', date: '2023-07-02',bg:'33fkmwkm' }
        ]}
        
      />
    </div>
  )
}

export default Calendar