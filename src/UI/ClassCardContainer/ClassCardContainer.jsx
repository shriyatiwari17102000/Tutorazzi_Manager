import React, { useState } from 'react'
import classes from './ClassCardContainer.module.css'
import ClassCard from '../../Components/ClassCard/ClassCard'
import SidebarOverlay from '../../Components/SidebarOverlay/SidebarOverlay'
import ClassesModals from '../../Components/SidebarModals/ClassesModals'

const ClassCardContainer = (props) => {

  const [viewSidebar, setSidebar] = useState(false)

  return (
    <>
      <SidebarOverlay b2={'Accept Class'} heading={'Class Details'} sb_value={viewSidebar} sb_func={setSidebar} >
        <ClassesModals />
      </SidebarOverlay>
      <div className={`${classes.container} ${props.cls}`}>
        {props.data.map((element, index) => (
          <ClassCard Func={setSidebar} Val={viewSidebar} cls={props.cls_child} data={element} />
        ))}
      </div>
    </>
  )
}

export default ClassCardContainer