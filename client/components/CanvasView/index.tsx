import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useWallExists } from '../../utils/transactions';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';
import CreateWall from '../CreateWall';
import Canvas from '../Canvas';
import UserContext from '@/utils/UserContext';

const CanvasView = ({ hidden }) => {
  const [canvasExists, setCanvasExists] = useState([false, false]);
  const { user, searchAddress } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setCanvasExists(await useWallExists(fcl, user, searchAddress));
    })();
  }, [searchAddress]);

  const isYou = user.addr === searchAddress;
  const isAdmin = isYou && canvasExists[0];

  return (
    <div
      className={'text-container main-container' + (hidden ? ' hidden' : '')}
    >
      <ToastContainer />
      <h1 className={'heading' + (isAdmin ? ' admin' : '')}>
        <p>
          {isYou && canvasExists[0] ? (
            <>Your Canvas</>
          ) : searchAddress && canvasExists[0] ? (
            <>{searchAddress}'s Canvas</>
          ) : searchAddress && !CanvasView[0] ? (
            <>{searchAddress} has no Canvas!</>
          ) : (
            <>Search for an Address</>
          )}
        </p>
        {user.addr && isYou && !canvasExists[0] ? (
          <CreateWall user={user} address={searchAddress} isYou={isYou} />
        ) : (
          <></>
        )}
      </h1>
      {canvasExists[0] && (
        <Canvas user={user} address={searchAddress} admin={isAdmin} />
      )}
    </div>
  );
};

export default CanvasView;
