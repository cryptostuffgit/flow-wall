import React from 'react';
import * as fcl from '@onflow/fcl';
import { useEffect, useCallback, useState } from 'react';

function Navbar({ user, setUserAddress }) {
  const AuthedState = () => {
    return (
      <div>
        <button className={'authButton'} onClick={fcl.unauthenticate}>
          Log Out
        </button>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div>
        <button className={'authButton'} onClick={fcl.logIn}>
          Log In
        </button>
      </div>
    );
  };

  const [address, setAddress] = useState('');

  const onChange = useCallback((event) => {
    setAddress(event.target.value);
  }, []);

  const onClick = useCallback(
    (_event) => {
      (async () => {
        try {
          const account = await fcl.account('' + address);
          setUserAddress(`0x${account.address}`);
        } catch (e: any) {
          toast.notify('Invalid account', {
            type: 'error',
          });
          setUserAddress(user.addr);
        }
      })();
    },
    [address],
  );

  return (
    <div className="nav">
      <div>Your Address: {user?.addr ?? 'None'}</div>
      <div>
        <div className="search">
          <input
            onChange={onChange}
            type="text"
            className="searchTerm"
            placeholder="Enter Address"
          />
          <button type="submit" className="searchButton" onClick={onClick}>
            Find
          </button>
        </div>
      </div>
      <div>{user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}</div>
    </div>
  );
}

export default Navbar;
