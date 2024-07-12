import React from 'react';
import doc from "../../assets/doc.webp"

const FallDoc = (props) => {
  // console.log(props.imgData)
  let img = props?.imgData ? props?.imgData : " "
  const handleImageError = (event) => {
    event.target.src = doc // Replace 'fallback-image.jpg' with your fallback image URL
  };

  return (  
    <img
      src={img}// Replace 'original-image.jpg' with your original image URL
    
      onError={handleImageError}
      className={props.cls}
    />
  ); 
};

export default FallDoc;
