// import React from 'react'
// import classes from './UpcomingClassCard.module.css'
// import Container from '../../UI/Container/Container'
// import BlackButton from '../BlackButton/BlackButton'

// const UpcomingClassCard = () => {
//   return (
//     <Container cls={classes.card}>
//         <h4 className={classes.card_title}>Mathematics Chapter 01: Algebra</h4>
//         <div className={classes.card_tags}>
//             <span>Science</span>
//             <span>By Sharad</span>
//         </div>
//         <div className={classes.row}>
//             <p>Date : 24/07/2023</p>
//             <p>8:00 Am to 10:00 Am</p>
//         </div>
//         <p className={classes.agenda}>Agenda : Algebra chapter 01.... more</p>
//         <div className={classes.btns}>
//             <button className={classes.cancel_btn}>Join Class</button>
//             <BlackButton cls={classes.bb}>Details</BlackButton>
//         </div>
//     </Container>
//   )
// }

// export default UpcomingClassCard
import React, { useState } from 'react'
import classes from './UpcomingClassCard.module.css'
import Container from '../../UI/Container/Container'
import BlackButton from '../BlackButton/BlackButton'
import FallbackImage from '../FallbackImgae/FallbackImage'
import AddExtraClass from '../AllModals/Quote/AddExtraClass'
import ViewProfileModal from '../AllModals/StuProfile/ViewProfileModal'
import EditQuote from '../AllModals/Quote/EditQuote'

const UpcomingClassCard = ({ data, func, id }) => {
  const [show, setShow] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const [show1, setShow1] = useState(false)
  const popupHandler = () => setShow(!show)
  const popupHandler1 = () => setShow1(!show)
  console.log(data)

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
let des = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore nobis vitae ratione repudiandae ipsam sunt impedit, ducimus eveniet ea asperiores ut odit nesciunt illum incidunt consectetur dicta recusandae laboriosam odio dolorum obcaecati optio. Voluptate cupiditate sed numquam hic aperiam, alias dolores, modi enim dolore ex perspiciatis nihil asperiores. Ab tenetur officiis corrupti ea recusandae facere!"
  return (
    <>
      <Container cls={classes.card}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #d9d9d9" }}>
          <div>
            {data?.subject_name && <h4 className={classes.card_title}>{data?.subject_name} Class Pricing</h4>}
            {data?.class_count && <span style={{ fontSize: "13px" }}>{data?.class_count} Classes</span>}
          </div>
          <div className={classes.card_tags}>
            <span>₹{data?.amount}</span>
          </div>
        </div>

        {/* <div className={classes.row}>
            <p>Date : 24/07/2023</p>
            <p>8:00 Am to 10:00 Am</p>
        </div> */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FallbackImage cls={classes.fb_img} src={""} />
          <p style={{ fontSize: "14px", fontWeight: "500", }}>{data?.teacher_id?.name}</p>
        </div>
        {/* {data?.description ?   <p className={classes.agenda}>{data?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptas alias ullam amet animi quidem minima obcaecati provident quos. Harum, quos inventore voluptas modi incidunt asperiores! Voluptatem aliquam facilis atque voluptas explicabo ipsum rerum quisquam, eos, non magni amet! Nostrum possimus atque nihil non!</p> : <p className={classes.agenda}>no description!</p>} */}
        {isExpanded ? <p className={classes.agenda}>{data?.description} </p> : <p className={classes.agenda}>{data?.description?.slice(0, 50)}</p>}

        {data?.description?.length > 50 && (
          <button className={classes.readmore} onClick={toggleExpansion}>
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}

        {data.status === "Pending" ? <button className={classes.pen_btn}>{data?.status}</button> : <button className={classes.pen_btn} style={{ color: "#04B90B", background: "#D5ffD7" }}>{data?.status}</button>}

        <div className={classes.btns}>
          <button className={classes.cancel_btn} onClick={popupHandler1}>Edit</button>
          <BlackButton cls={classes.bb} func={popupHandler} funcVal={show} > Add Extra Class</BlackButton>
        </div>
      </Container>
      {show && <AddExtraClass id={id} isPopup={show} popupFunc={setShow} data1={data} func={func} />}
      {show1 && <EditQuote isPopup={show1} popupFunc={setShow1} data1={data} func={func} />}
    </>
  )
}

export default UpcomingClassCard
