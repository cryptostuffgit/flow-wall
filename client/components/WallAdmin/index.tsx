import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { updateWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';

const WallAdmin = ({ user, address, admin }) => {
  const editBio = useCallback(() => {
    (async () => {
      const bio = 'new test bio!';
      await updateWall(fcl, user, '', bio);
      //
    })();
  }, [admin]);

  const editAvatar = useCallback(() => {
    (async () => {
      const avatar = 'test avtar';
      await updateWall(fcl, user, avatar, '');
      //
    })();
  }, [admin]);

  return (
    <div className="flex">
      <Icon name="edit" tooltip="Change Bio" onClick={editBio} />
      <Icon name="avatar" tooltip="Change Avatar" onClick={editAvatar} />
    </div>
  );
};

export default WallAdmin;
