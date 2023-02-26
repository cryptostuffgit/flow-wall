import React from 'react'
import { formatTimestamp } from '@/utils/format';

const MessageView = ({user, message}) => {  
  return (
    <div className={"message-container-self"}>
        <div className={user.addr == message.sender ? "iSend base-styles" : "uSend base-styles"}>
            <h4>{message.content}</h4>
        </div>
        <div className="meta">
            <p>{user.addr == message.sender ? "You" : message.sender} sent @ {formatTimestamp(message.timestamp)}</p>
        </div>
    </div>
  )
}

export default MessageView;