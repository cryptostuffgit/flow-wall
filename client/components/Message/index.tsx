import React from 'react'

const MessageView = ({user,sender, content, timestamp}) => {
  return (
    <div className={"message-container-self"}>
        <div className={user.addr == sender ? "iSend" : "uSend"}>
            <h4>{content}</h4>
        </div>
        <div className="meta">
            <p>{sender} sent</p>
            <p>@{timestamp}</p>
        </div>
    </div>
  )
}

export default MessageView;