import React from 'react';
import { formatTimestamp } from '@/utils/format';

const MessageView = ({ user, message }) => {
  return (
    <div className={'message-container-self'}>
      <div className="card message-content">
        <p>{message.content}</p>

        <div className="meta">
          <p className="timestamp">
            {user.addr == message.sender ? 'You' : message.sender} sent @{' '}
            {formatTimestamp(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
