import React from 'react'
import { formatTimestamp } from '@/utils/format';

const MessageView = ({user, message}) => {  
  return (
    <div className={"message-container-self"}>
        <div className="message-content">
            <h4>{message.content}</h4>
            
            <div className="meta">
              <p className="timestamp">{user.addr == message.sender ? "You" : message.sender} sent @ {formatTimestamp(message.timestamp)}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageView;