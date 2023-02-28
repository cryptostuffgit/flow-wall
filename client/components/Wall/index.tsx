import React, { useEffect, useState, useCallback, useContext } from 'react';
import * as fcl from '@onflow/fcl';
import { postWall, getWall, useWallExists } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import WallAdmin from '@/components/WallAdmin';
import CreateWall from '@/components/CreateWall';
import UserContext from '@/utils/UserContext';

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

const Wall = ({ page, needsMigrate }) => {
  const [wall, setWall] = useState<Wall | any>({});
  const [refresh, causeRefresh] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [wallExists, setWallExists] = useState([false, false]);

  const { user, searchAddress } = useContext(UserContext);

  const address = searchAddress;

  useEffect(() => {
    (async () => {
      setWallExists([false, false]);
      await setWallExists(await useWallExists(fcl, user, address));
    })();
  }, [address, refresh]);

  const isYou = user.addr === address;
  const admin = isYou && wallExists[0];

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
  }, [page, address, wallExists, refresh]);

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
            <>{address} - Wall</>
          ) : address && !wallExists[0] ? (
            <>{address} has no wall!</>
          ) : (
            <>Search for an Address</>
          )}
        </p>
        {user.addr && isYou && !wallExists[0] ? (
          <CreateWall
            causeRefresh={causeRefresh}
            refresh={refresh}
            user={user}
            address={address}
            isYou={isYou}
          />
        ) : user.addr && !isYou && !wallExists[0] ? (
          <CreateWall
            causeRefresh={causeRefresh}
            refresh={refresh}
            user={user}
            address={address}
            isYou={isYou}
          />
        ) : (
          <></>
        )}
        {wallExists[0] && admin && (
          <WallAdmin
            causeRefresh={causeRefresh}
            refresh={refresh}
            needsMigrate={!wallExists[1]}
          />
        )}
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
