import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { postWall, getWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';

type Message = {
  sender: String;
  content: String;
  timestamp: Number | String;
};

type Wall = {
  address: String;
  avatar: String;
  bio: String;
  messages: Message[];
  banned: String[];
};

const Wall = ({ user, address, admin }) => {
  const [wall, setWall] = useState<Wall | any>({});
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      const fcl_wall = await getWall(fcl, address);
      setWall(fcl_wall);
      let fcl_messages = fcl_wall.messages;
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
            <img src={wall.avatar} />
          </div>
          <div className="bio">{wall.bio}</div>
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
