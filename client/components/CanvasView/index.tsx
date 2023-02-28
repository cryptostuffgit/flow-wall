import React, { useEffect, useState, useCallback } from 'react';
import { useWallExists } from '../../utils/transactions';
import { ToastContainer } from 'react-nextjs-toast';
import * as fcl from '@onflow/fcl';


const MainView = ({ user, userAddress }) => {
  const [canvas, setCanvas] = useState([false, false]);

  useEffect(() => {
    (async () => {
      setWallExists(await useWallExists(fcl, user, userAddress));
    })();
  }, [userAddress]);

  return (
    <>
    </>
  );
};

export default MainView;
