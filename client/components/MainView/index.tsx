import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import Wall from '@/components/Wall';
import CreateWall from '@/components/CreateWall';

const MainView = ({ hidden }) => {
  return (
    <div
      className={'text-container main-container' + (hidden ? ' hidden' : '')}
    >
      <ToastContainer />
      <Wall />
    </div>
  );
};

export default MainView;
