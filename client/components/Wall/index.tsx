import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { postWall, getWallMessages } from '../../utils/transactions';
import TextInput from '../text-input';
import MessageView from '../Message'

type Message = {
  sender: String;
  content: String;
  timestamp: Number | String;
};

const Wall = ({ user, address, admin }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      let fcl_messages = await getWallMessages(fcl, address);
      setMessages(fcl_messages);
    })();
  }, [address]);

  const postMessage = (mesageText) => {
    postWall(fcl, mesageText, address);
    const allMessages = [...messages, {sender: user.addr, content: mesageText, timestamp: "now"}]
    setMessages(allMessages)
  };

  return (
    <>
      <div className="wall">
        <div className="writer">
          {user && <TextInput onClick={postMessage} />}
        </div>
        <div className="messages">
          {messages.map((msg, i) => {
            return (
              <div className="message" key={i}>
                <MessageView user={admin} sender={msg.sender} content={msg.content} timestamp={msg.timestamp} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Wall;
