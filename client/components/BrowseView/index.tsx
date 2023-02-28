import React, { useEffect, useState, useCallback, useContext } from 'react';
import UserContext from '@/utils/UserContext';
import { useCreatedWalls } from '@/utils/transactions';
import Profile from '@/components/Profile';
import * as fcl from '@onflow/fcl';

const BrowseView = ({ hidden }) => {
  const [walls, setWalls] = useState<any>({});

  const { user, searchAddress } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const createdWalls = await useCreatedWalls(fcl);
      setWalls(createdWalls);
    })();
  }, [searchAddress]);

  return (
    <div
      className={
        'text-container main-container browse-walls ' +
        (hidden ? ' hidden' : '')
      }
    >
      <h1>
        <p>Visit a Wall</p>
      </h1>
      <div className="created-walls">
        {walls &&
          Object.keys(walls).map((wall) => {
            return <Profile address={wall} />;
          })}
      </div>
    </div>
  );
};
export default BrowseView;
