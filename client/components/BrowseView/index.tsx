import { useEffect, useState } from 'react';
import { useCreatedWalls } from '@/utils/transactions';
import Profile from '@/components/Profile';
import * as fcl from '@onflow/fcl';

const BrowseView = ({ hidden, setPage }) => {
  const [walls, setWalls] = useState<any>({});

  useEffect(() => {
    (async () => {
      const createdWalls = await useCreatedWalls(fcl);
      setWalls(createdWalls);
    })();
  }, []);

  return (
    <div className={'browse-walls ' + (hidden ? ' hidden' : '')}>
      <h1>Visit a Wall</h1>
      <div className="created-walls">
        {walls &&
          Object.keys(walls).map((wall) => {
            return <Profile address={wall} setPage={setPage} />;
          })}
      </div>
    </div>
  );
};
export default BrowseView;
