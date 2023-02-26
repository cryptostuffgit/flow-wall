import React from 'react';
import * as fcl from '@onflow/fcl';
import { useEffect, useCallback, useState } from 'react';
import { toast } from 'react-nextjs-toast';

function Navbar({ user, setUserAddress }) {
  const [address, setAddress] = useState('');

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

  const onChange = (event) => {
    setAddress(event.target.value);
    //setUserAddress(event.target.value);
  };

  const onClick = async (_event) => {
    try {
      console.log(address);
      const account = await fcl.account(address);
      setUserAddress(`0x${account.address}`);
    } catch (e: any) {
      console.log(e);
      toast.notify('Invalid account', {
        type: 'error',
      });
      setUserAddress(user.addr);
    }
  };

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
          <button onClick={onClick} type="submit" className="searchButton">
            Find
          </button>
        </div>
      </div>
      <div>{user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}</div>
    </div>
  );
}

export default Navbar;
