import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { createWall, createWallOther } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';

const CreateWall = ({ user, isYou, address }) => {
  const createWallCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        createWall(fcl);
      })();
    }
  }, [user]);

  const createWallOtherCB = useCallback(() => {
    if (user.loggedIn === true) {
      (async () => {
        createWallOther(fcl, address);
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
