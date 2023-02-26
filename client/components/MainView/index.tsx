import React, { useEffect, useState, useCallback } from 'react';
import { createWall, useWallExists } from '../../utils/transactions';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';

const MainView = ({ user, userAddress }) => {
  // const wallExists = await useWallExists(fcl, user, userAddress);
  const wallExists = true;

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
      <ToastContainer />
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
        ) : userAddress ? (
          <>{userAddress}'s Wall</>
        ) : (
          <>Search for an Address</>
        )}
      </h1>
    </div>
  );
};

export default MainView;
