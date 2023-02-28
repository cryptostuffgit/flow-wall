import UserContext from './UserContext';
import * as fcl from '@onflow/fcl';
import { useState, useEffect, useCallback } from 'react';

function UserProvider(props) {
  const [user, setUser] = useState({ loggedIn: null, addr: null });
  const [searchAddress, setSearchAddress] = useState(null);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  useEffect(() => {
    setSearchAddress(user.addr);
  }, [user.addr]);

  return (
    <UserContext.Provider
      value={{ user, setUser, searchAddress, setSearchAddress }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
