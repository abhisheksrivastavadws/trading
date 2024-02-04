import React from "react";
import { auth } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  function formatDateTime(input){
    // console.log("date input",input)
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(input));
    var date = epoch.toLocaleString();
    date = date.replace('T', ' ');
    date = date.replace('.000Z', '')
    return date
};


// console.log("date", Date(message.createdAt))
// console.log(message)
  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        <p className="user-message">{formatDateTime(message.createdAt/1000)}</p>
        
      </div>
    </div>
  );
};

export default Message;
