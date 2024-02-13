import React from 'react'

const Iframe1 = ({src}) => {
  return (
    <iframe
    width="100%"
    height="300"
    // src={"https://www.youtube.com/embed/W9JVb3IrJQ8?si=FdxMsaai14lgNIsC"}
    frameBorder="0"
    style={{ borderRadius: "5px" }}
    className="mx-2"
    allowFullScreen
></iframe>

  )
}

export default Iframe1