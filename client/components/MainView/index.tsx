import React, { useEffect, useState } from 'react';
import TextInput from '../text-input';
import { postWall } from '@/utils/transactions';
import * as fcl from "@onflow/fcl";

const MainView = ({user, userWall}) => {
  useEffect(() => {
    
  }, [userWall])


  const postMessage = (mesageText) => {
    postWall(fcl, mesageText, userWall)
  }


  return (
    <div className="text-container">
      <h1 className="heading">
        {userWall ? <>{userWall}'s Wall</> : <>Search for an Address</>}
      </h1>
      <TextInput onClick={postMessage}/>
    </div>
  );
};

export default MainView;
