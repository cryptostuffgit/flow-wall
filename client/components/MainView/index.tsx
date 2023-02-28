import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import Wall from '@/components/Wall';
import CreateWall from '@/components/CreateWall';

const MainView = ({ page, hidden, user, userAddress }) => {
  return (
    <div
      className={'text-container main-container' + (hidden ? ' hidden' : '')}
    >
      <ToastContainer />
      <Wall page={page} user={user} address={userAddress} />
    </div>
  );
};

export default MainView;
