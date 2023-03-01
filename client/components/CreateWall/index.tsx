import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { createWall, createWallOther } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';

const CreateWall = ({ refresh, causeRefresh, user, isYou, address }) => {
  const createWallCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        await createWall(fcl);
        causeRefresh(!refresh);
      })();
    }
  }, [causeRefresh, refresh, user]);

  const createWallOtherCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        await createWallOther(fcl, address);
        causeRefresh(!refresh);
      })();
    }
  }, [causeRefresh, refresh, user, address]);

  return (
    <div className='new-wall-button'>
      <button
        onClick={() => {
          isYou ? createWallCB() : createWallOtherCB();
        }}
       className="new-wall"
       style={{marginLeft: "20px !important"}}>
        <span className="material-symbols-outlined">
        new_window
        </span>
      </button>
    </div>
  );
};

export default CreateWall;
