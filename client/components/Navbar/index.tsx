import React from 'react';
import * as fcl from '@onflow/fcl';
import { useEffect, useCallback, useState, useContext } from 'react';
import { toast } from 'react-nextjs-toast';
import UserContext from '@/utils/UserContext';

function Navbar({ page, setPage }) {
  const [address, setAddress] = useState('');
  const { user, setSearchAddress } = useContext(UserContext);

  const AuthedState = () => {
    return (
      <div>
        <button className={'authButton'} onClick={fcl.unauthenticate}>
          {user.addr.substr(0, 4)}
          {'...'}
          {user.addr.split('').reverse().join('').substr(0, 4)}
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
  };

  const onKeyUp = async (event) => {
    if (event.key === 'Enter' || address.length === 18) {
      try {
        const account = await fcl.account(address);
        setUserAddress(`0x${account.address}`);
      } catch (e: any) {
        console.log(e);
        toast.notify('Invalid account', {
          type: 'error',
        });
        setUserAddress(user.addr);
      }
    }
  };

  return (
    <div className="nav">
      <div>
        <div className="left-side">
          <div
            className={page == 'canvas' ? 'selected page' : 'page'}
            onClick={() => setPage('canvas')}
          >
            Canvas
          </div>
          <div
            className={page == 'messages' ? 'selected page' : 'page'}
            onClick={() => setPage('messages')}
          >
            Messages
          </div>
          <div
            className={page == 'browse' ? 'selected page' : 'page'}
            onClick={() => setPage('browse')}
          >
            Browse
          </div>
          <div className="search">
            <input
              onChange={onChange}
              onKeyUp={onKeyUp}
              type="text"
              className="searchTerm"
              placeholder="Find Wallet"
            />
          </div>
        </div>
      </div>
      <div>{user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}</div>
    </div>
  );
}

export default Navbar;
