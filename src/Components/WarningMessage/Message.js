import React from "react";
import "./message.css";

const Message = ({ message = "File format is not correct!" }) => {
  return (
    <div className={"container"}>
      <div className={"message"}>{message}</div>
    </div>
  );
};

export default Message;
