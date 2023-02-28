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
  }, [user]);

  const createWallOtherCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        await createWallOther(fcl, address);
        causeRefresh(!refresh);
      })();
    }
  }, [user, address]);

  return (
    <>
      <button
        onClick={() => {
          isYou ? createWallCB() : createWallOtherCB();
        }}
      >
        Create Wall
      </button>
    </>
  );
};

export default CreateWall;
