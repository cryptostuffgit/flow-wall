import React, { useEffect, useState, useCallback, useContext } from 'react';
import UserContext from '@/utils/UserContext';
import { createdWalls } from '@/utils/transactions';
import Profile from '@/components/Profile';
import * as fcl from '@onflow/fcl';
import LoadingContext from '@/utils/LoadingContext';

const BrowseView = ({ hidden, setPage }) => {
  const [walls, setWalls] = useState<any>({});
  const { setLoading } = useContext(LoadingContext);

  const { user, searchAddress } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setWalls(await createdWalls(fcl));
      } catch (e: any) {
        throw e;
      } finally {
        setLoading(false);
      }
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
