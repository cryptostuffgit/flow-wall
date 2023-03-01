import { useEffect, useState, useContext } from 'react';
import UserContext from '@/utils/UserContext';
import { wallHeader } from '@/utils/transactions';
import * as fcl from '@onflow/fcl';

const Profile = ({ address, setPage }) => {
  const [header, setHeader] = useState<any>({});

  const { setSearchAddress } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const headerData = await wallHeader(fcl, address);
      setHeader(headerData);
    })();
  }, []);

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
