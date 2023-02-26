import React, { useEffect, useState, useCallback } from 'react';
import { createWall, useWallExists } from '../../utils/transactions.tsx';
import * as fcl from '@onflow/fcl';

const MainView = ({ user, userAddress }) => {
  const [wallExists, setWallExists] = useState(false);

  useEffect(() => {
    (async () => {
      setWallExists(await useWallExists(fcl, user, userAddress));
    })();
  }, [userAddress]);

  const isYou = user.addr === userAddress;

  const createWallCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        createWall(fcl);
      })();
    }
  }, [user]);

  return (
    <div className="main-container">
      <h1 className="heading">
        {isYou && wallExists ? (
          <>Your Wall</>
        ) : isYou && !wallExists ? (
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
          <>{userAddress}'s has no wall!</>
        ) : (
          <>Search for an Address</>
        )}
      </h1>
    </div>
  );
};

export default MainView;
