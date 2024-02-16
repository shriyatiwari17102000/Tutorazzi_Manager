import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import classes from "./ClassesDetail.module.css"

const RatingCard = (props) => {
  console.log(props)
    // const [rating, setRating] = useState('')
    // console.log(props.data.ratings.rating)
    let rating = props?.data
  return (
    <>
    <div>
        {/* <h5>Rate this Class</h5> */}
        <p className={classes.para}>{props.p}</p>
    </div>
    <Rating
    className={classes.stars_con}
    // onClick={rate => setRating(rate)}
    size={30}
    initialValue={rating}
    readonly={props.readonly}
  />
  </>
  )
}

export default RatingCard