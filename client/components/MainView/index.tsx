import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-nextjs-toast'
import * as fcl from "@onflow/fcl";
import {wallExists} from "@/utils/transactions"

const MainView = ({user, userWall}) => {
  useEffect(() => {
    
  }, [userWall])

  return (
    <div className="main-container">
      <ToastContainer />
      <h1 className="heading">
        {userWall ? <>{userWall}'s Wall</> : <>Search for an Address</>}
      </h1>
    </div>
  );
};

export default MainView;
