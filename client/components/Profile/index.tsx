import { useEffect, useState, useContext } from 'react';
import UserContext from '@/utils/UserContext';
import { wallHeader } from '@/utils/transactions';
import * as fcl from '@onflow/fcl';
import LoadingContext from '@/utils/LoadingContext';

const Profile = ({ address, setPage }) => {
  const [header, setHeader] = useState<any>({});
  const { setLoading } = useContext(LoadingContext);

  const { setSearchAddress } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const headerData = await wallHeader(fcl, address);
        setHeader(headerData);
      } catch (e: any) {
        throw e;
      } finally {
        setLoading(false);
      }
    })();
  }, [address]);

  const onClick = () => {
    setSearchAddress(address);
    setPage('messages');
  };

  return (
    <div onClick={onClick} className="wall card">
      {address + "'"}s Wall
      {header && (
        <>
          <div>{header.avatar}</div>
          <div>{header.bio}</div>
        </>
      )}
    </div>
  );
};
export default Profile;
