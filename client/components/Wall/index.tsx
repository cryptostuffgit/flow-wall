import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { getWallMessages } from '../../utils/transactions';

type Message = {
  sender: String;
  content: String;
  timestamp: Number;
};

const Wall = ({ address, admin }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      let fcl_messages = await getWallMessages(fcl, address);

      fcl_messages.push({
        sender: 'your friend',
        content: 'fuck test message',
        timestamp: 0,
      });

      setMessages(fcl_messages);
    })();
  }, [address]);

  return (
    <>
      <div className="wall">
        <div className="writer">
          <textarea />
          <button>Send</button>
        </div>
        <div className="messages">
          {messages.map((msg, i) => {
            return (
              <div className="message" key={i}>
                {msg.sender}: {msg.content} @ {msg.timestamp}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Wall;
