import { useEffect, useState, useContext } from 'react';
import UserContext from '@/utils/UserContext';
import { useWallHeader } from '@/utils/transactions';
import * as fcl from '@onflow/fcl';

const Profile = ({ address, setUserAddress, setPage }) => {
  const [header, setHeader] = useState<any>({});

  const { setSearchAddress } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const headerData = await useWallHeader(fcl, address);
      console.log(headerData);
      setHeader(headerData);
    })();
  }, []);

  const onClick = () => {
    setSearchAddress(address);
    setPage('messages');
  };

  return (
    <div onClick={onClick} className="wall">
      {address}'s Wall
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
