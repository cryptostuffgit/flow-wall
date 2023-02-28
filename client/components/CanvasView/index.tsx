import React, { useEffect, useState, useCallback } from 'react';
import { useWallExists } from '../../utils/transactions';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import CreateWall from '../CreateWall';
import Canvas from '../Canvas';


const CanvasView = ({ user, userAddress }) => {
  const [canvasExists, setCanvasExists] = useState([false, false]);

  useEffect(() => {
    (async () => {
      setCanvasExists(await useWallExists(fcl, user, userAddress));
    })();
  }, [userAddress]);

  const isYou = user.addr === userAddress;
  const isAdmin = isYou && canvasExists[0];

  return (
    <div className="text-container main-container">
      <ToastContainer />
      <h1 className={'heading' + (isAdmin ? ' admin' : '')}>
        <p>
          {isYou && canvasExists[0] ? (
            <>Your Canvas</>
          ) : userAddress && canvasExists[0] ? (
            <>{userAddress}'s Canvas</>
          ) : userAddress && !CanvasView[0] ? (
            <>{userAddress} has no Canvas!</>
          ) : (
            <>Search for an Address</>
          )}
        </p>
        {user.addr && isYou && !canvasExists[0] ? (
          <CreateWall user={user} address={userAddress} isYou={isYou} />
        ) : (
          <></>
        )}
      </h1>
      {canvasExists[0] && (
        <Canvas user={user} address={userAddress} admin={isAdmin} />
      )}
    </div>
  );
};

export default CanvasView;
