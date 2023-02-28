import { useEffect, useState } from 'react';
import { useCreatedWalls } from '@/utils/transactions';
import Profile from '@/components/Profile';
import * as fcl from '@onflow/fcl';

const BrowseView = ({ hidden, page, setPage }) => {
  const [walls, setWalls] = useState<any>({});

  useEffect(() => {
    (async () => {
      const createdWalls = await useCreatedWalls(fcl);
      setWalls(createdWalls);
    })();
  }, [page]);

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
            return <Profile address={wall} setPage={setPage} />;
          })}
      </div>
    </div>
  );
};
export default BrowseView;
