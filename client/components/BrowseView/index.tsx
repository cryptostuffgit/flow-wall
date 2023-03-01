import React, { useEffect, useState, useCallback, useContext } from 'react';
import UserContext from '@/utils/UserContext';
import { createdWalls } from '@/utils/transactions';
import Profile from '@/components/Profile';
import * as fcl from '@onflow/fcl';

const BrowseView = ({ hidden, setPage }) => {
  const [walls, setWalls] = useState<any>({});

  const { user, searchAddress } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setWalls(await createdWalls(fcl));
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
          Object.keys(walls).map((wall, i) => {
            return <Profile key={i} address={wall} setPage={setPage} />;
          })}
      </div>
    </div>
  );
};
export default BrowseView;
