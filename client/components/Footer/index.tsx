import { useState, useCallback, useEffect } from 'react';
import { createWall, wallExists } from '../../utils/transactions.tsx';

function Footer({ user, fcl }) {
  const [localWallExists, setWallExists] = useState(false);

  useEffect(() => {
    if (user.loggedIn === true) {
      (async () => {
        setWallExists(await wallExists(fcl, user));
      })();
    }
  }, [user]);

  const createWallCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        console.log('creating wall', user, fcl);
        createWall(fcl);
      })();
    }
  }, [user]);

  return (
    <div className="footer">
      {!localWallExists && (
        <button
          onClick={() => {
            !localWallExists && createWallCB();
          }}
        >
          Create Wall
        </button>
      )}
      <div className="name">FlowWall</div>
    </div>
  );
}

export default Footer;
