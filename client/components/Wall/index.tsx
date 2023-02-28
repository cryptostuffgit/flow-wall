import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { postWall, getWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import WallAdmin from '@/components/WallAdmin';
import CreateWall from '@/components/CreateWall';

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

const Wall = ({ wallExists, needsMigrate, isYou, user, address, admin }) => {
  const [wall, setWall] = useState<Wall | any>({});
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (wallExists[0]) {
      (async () => {
        const fcl_wall = await getWall(fcl, address);
        setWall(fcl_wall);
        let fcl_messages = fcl_wall.messages;
        fcl_messages = fcl_messages.sort((a, b) => b.timestamp - a.timestamp);
        setMessages(fcl_messages);
      })();
    }
  }, [address, wallExists]);

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
      <h1 className={'heading' + (admin ? ' admin' : '')}>
        <p>
          {isYou && wallExists[0] ? (
            <>Your Wall</>
          ) : address && wallExists[0] ? (
            <>{address}'s Wall</>
          ) : address && !wallExists[0] ? (
            <>{address} has no wall!</>
          ) : (
            <>Search for an Address</>
          )}
        </p>
        {user.addr && isYou && !wallExists[0] ? (
          <CreateWall user={user} address={address} isYou={isYou} />
        ) : user.addr && !isYou && !wallExists[0] ? (
          <CreateWall user={user} address={address} isYou={isYou} />
        ) : (
          <></>
        )}
        {wallExists[0] && admin && <WallAdmin needsMigrate={!wallExists[1]} />}
      </h1>
      {wallExists[0] && (
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
      )}
    </>
  );
};

export default Wall;
