import React, { useState } from 'react'
import Container from '../../../UI/Container/Container'
import classes from './OComp.module.css'
import HomeworkFold from '../../../Components/AllFolds/Homework/HomeworkFold'
import HomeWorkModal from '../../Classes/ClassesDetail/PastModal/HomeWorkModal'

const HomeworkDiv = props => {
  const [openHomeModal, setOpenHomeModal] = useState(false)
  const handleOpenHomeModal = () => {
    setOpenHomeModal(true)
  }
  let getData = props.func
  // console.log(props?.data)
  const { data } = props

  let classData = data?.length > 0 ? classes.homework_div : classes.no_data
  return (
    <>
      <Container cls={`${classData} ${props.cls}`}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", color: "rgba(66, 77, 182, 1)" }} >Home Work</h4>
          <h4 className={`${classes.secondary_heading} w-auto`} style={{ width: "auto", textDecoration: "underline", fontSize: "13px", cursor: "pointer" }} onClick={handleOpenHomeModal} >See All</h4>
        </div>
        <div >
          {data?.length > 0 ? data?.slice().reverse().slice(0, 2).map((item, index) => (
            <HomeworkFold data={item} open={true} cls={classes.homework_fold_container} func={props?.func} />
          )) :  <p style={{fontSize:"14px", color:"#989898"}}>no data found!</p>}
         
        </div>
      </Container>
      {openHomeModal && <HomeWorkModal isPopup={openHomeModal} func={getData} popupFunc={setOpenHomeModal} data={data} id={props?.id} />}
    </>
  )
}

export default HomeworkDiv
