import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import Wall from '@/components/Wall';
import CreateWall from '@/components/CreateWall';

const MainView = ({ user, userAddress }) => {
  return (
    <div className="text-container main-container">
      <ToastContainer />
      <Wall user={user} address={userAddress} />
    </div>
  );
};

export default MainView;
