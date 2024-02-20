import React from 'react';
import userImg from "../../assets/userImg.jpg"

const FallbackImage = (props) => {
  // console.log(props.imgData)
  let img = props?.imgData ? props?.imgData : " "
  const handleImageError = (event) => {
    event.target.src = userImg // Replace 'fallback-image.jpg' with your fallback image URL
  };

  return (
    <img
      src={img}// Replace 'original-image.jpg' with your original image URL
      alt="My Image"
      onError={handleImageError}
      className={props.cls}
    />
  );
};

export default FallbackImage;
