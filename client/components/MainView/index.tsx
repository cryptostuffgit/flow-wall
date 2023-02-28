import React, { useEffect, useState, useCallback } from 'react';
import { useWallExists } from '../../utils/transactions';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import Wall from '@/components/Wall';
import WallAdmin from '@/components/WallAdmin';
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
  const needsMigrate = wallExists[0] && !wallExists[1];

  return (
    <div className="text-container main-container">
      <ToastContainer />
      <h1 className={'heading' + (isAdmin ? ' admin' : '')}>
        <p>
          {isYou && wallExists[0] ? (
            <>Your Wall</>
          ) : userAddress && wallExists[0] ? (
            <>{userAddress}'s Wall</>
          ) : userAddress && !wallExists[0] ? (
            <>{userAddress} has no wall!</>
          ) : (
            <>Search for an Address</>
          )}
        </p>
        {user.addr && isYou && !wallExists[0] ? (
          <CreateWall user={user} address={userAddress} isYou={isYou} />
        ) : user.addr && !isYou && !wallExists[0] ? (
          <CreateWall user={user} address={userAddress} isYou={isYou} />
        ) : (
          <></>
        )}
        {wallExists[0] && isAdmin && <WallAdmin />}
      </h1>
      {wallExists[0] && (
        <Wall user={user} address={userAddress} admin={isAdmin} />
      )}
    </div>
  );
};

export default MainView;
