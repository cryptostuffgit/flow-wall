import React, { useEffect, useState, useCallback } from 'react';
import { createWall, useWallExists } from '../../utils/transactions';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import Wall from '@/components/Wall';

const MainView = ({ user, userAddress }) => {
  const [wallExists, setWallExists] = useState(false);

  useEffect(() => {
    (async () => {
      setWallExists(await useWallExists(fcl, user, userAddress));
    })();
  }, [userAddress]);

  const isYou = user.addr === userAddress;
  const isAdmin = isYou && wallExists;

  const createWallCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        createWall(fcl);
      })();
    }
  }, [user]);

  return (
    <div className="text-container main-container">
      <ToastContainer />
      <h1 className="heading">
        {isYou && wallExists ? (
          <>Your Wall</>
        ) : user.addr && isYou && !wallExists ? (
          <>
            <button
              onClick={() => {
                createWallCB();
              }}
            >
              Create Wall
            </button>
          </>
        ) : userAddress && wallExists ? (
          <>{userAddress}'s Wall</>
        ) : userAddress && !wallExists ? (
          <>{userAddress} has no wall!</>
        ) : (
          <>Search for an Address</>
        )}
      </h1>
      {wallExists && <Wall user={user} address={userAddress} admin={isAdmin} />}
    </div>
  );
};

export default MainView;
