import React from 'react';
import * as fcl from '@onflow/fcl';
import { useEffect, useCallback, useState } from 'react';
import { toast } from 'react-nextjs-toast';

function Navbar({ user, setUserAddress, page, setPage}) {
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
  };

  const onClick = async (_event) => {
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
  };

  return (
    <div className="nav">
      <div>
        <div className='left-side'>
          <div className={page == 'canvas' ? 'selected page' : 'page'} onClick={() => setPage("canvas")}>
            Canvas
          </div>
          <div className={page == 'messages' ? 'selected page' : 'page'} onClick={() => setPage("messages")}>
            Messages
          </div>
          <div className={page == 'browse' ? 'selected page' : 'page'} onClick={() => setPage("browse")}>
            Browse
          </div>
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
      </div>
      <div>{user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}</div>
    </div>
  );
}

export default Navbar;
