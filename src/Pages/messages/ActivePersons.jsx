import React from "react";

const ActivePersons = (props) => {
  return (
    <div className="text-center">
      <img src={props.img} className="userChatImg me-0" />
      <p className="m-0 chats_msg_span name">{props.name}</p>
    </div>
  );
};

export default ActivePersons;
