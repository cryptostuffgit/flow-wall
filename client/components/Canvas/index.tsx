import React, { useEffect, useState, useCallback, useContext } from 'react';
import * as fcl from '@onflow/fcl';
import { postContent, getWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import RadioButton from '../RadioButton';
import MessageView from '../Message';
import LoadingContext from '@/utils/LoadingContext';

type CanvasItem = {
  type: String;
  content: String;
  timestamp: Number | String;
};

type Canvas = {
  address: String;
  avatar: String;
  bio: String;
  content: CanvasItem[];
};

const Canvas = ({ user, address, admin }) => {
  const [canvas, setCanvas] = useState<Canvas | any>({});
  const [content, setContent] = useState<CanvasItem[]>([]);
  const [contentType, setType] = useState('text');
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const fcl_wall = await getWall(fcl, address);
        setCanvas(fcl_wall);
        let fcl_content = fcl_wall.canvasItems;
        fcl_content = fcl_content.sort((a, b) => b.timestamp - a.timestamp);
        setContent(fcl_content);
      } catch (e: any) {
        throw e;
      } finally {
        setLoading(false);
      }
    })();
  }, [address]);

  const postContentFun = (mesageText) => {
    setLoading(true);
    postContent(fcl, mesageText, address, contentType)
      .then(() => {
        const allContent = [
          { type: contentType, content: mesageText, timestamp: 'now' },
          ...content,
        ];
        setContent(allContent);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const buttonClick = (value) => {
    setType(value);
    console.log(value);
  };

  return (
    <>
      <div className="wall">
        <div className="wall_props">
          <div className="avatar">
            <img src={canvas.avatar} />
          </div>
          <div className="bio">{canvas.bio}</div>
        </div>
        <div className="writer">
          {user.addr && admin ? <TextInput onClick={postContentFun} /> : <></>}
          {user.addr && admin ? (
            <RadioButton buttonClicked={buttonClick} />
          ) : (
            <></>
          )}
        </div>
        <div className="messages">
          {content.map((msg, i) => {
            return (
              <div className="message" key={i}>
                {msg.type == 'text' ? (
                  <MessageView user={user} message={msg} />
                ) : (
                  <img className="imageDisplay" src={msg.content as string} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Canvas;
