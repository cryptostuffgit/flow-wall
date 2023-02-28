import React, { useEffect, useState, useCallback } from 'react';
import { useWallExists } from '../../utils/transactions';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import Wall from '@/components/Wall';
import CreateWall from '@/components/CreateWall';

const MainView = ({ user, userAddress }) => {
  const [wallExists, setWallExists] = useState([false, false]);

  useEffect(() => {
    (async () => {
      setWallExists(await useWallExists(fcl, user, userAddress));
    })();
  }, [userAddress]);

  const isYou = user.addr === userAddress;
  const isAdmin = isYou && wallExists[0];

  return (
    <div className="text-container main-container">
      <ToastContainer />
      <Wall
        wallExists={wallExists}
        isYou={isYou}
        user={user}
        address={userAddress}
        admin={isAdmin}
      />
    </div>
  );
};

export default MainView;
