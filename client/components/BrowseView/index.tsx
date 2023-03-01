import { useEffect, useState } from 'react';
import { useCreatedWalls } from '@/utils/transactions';
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
    <div className="browse-walls">
      <h1>Visit a Wall</h1>
      <div className="created-walls">
        {walls &&
          Object.keys(walls).map((wall) => {
            return (
              <Profile
                address={wall}
                setUserAddress={setUserAddress}
                setPage={setPage}
              />
            );
          })}
      </div>
    </div>
  );
};
export default BrowseView;
