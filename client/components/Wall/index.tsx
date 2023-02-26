import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { postWall, getWallMessages } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';

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
      fcl_messages = fcl_messages.sort((a, b) => b.timestamp - a.timestamp);
      setMessages(fcl_messages);
    })();
  }, [address]);

  const postMessage = (mesageText) => {
    postWall(fcl, mesageText, address).then(() => {
      const allMessages = [
        { sender: user.addr, content: mesageText, timestamp: 'now' },
        ...messages,
      ];
      setMessages(allMessages);
    });
  };

  return (
    <>
      <div className="wall">
        <div className="wall_props">
          <div className="avatar">
            <img src="https://localhost:3000/public/test.png" />
          </div>
          <div className="bio">Hey, I'm Alex.</div>
        </div>
        <div className="writer">
          {user.addr && <TextInput onClick={postMessage} />}
        </div>
        <div className="messages">
          {messages.map((msg, i) => {
            return (
              <div className="message" key={i}>
                <MessageView user={user} message={msg} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Wall;
