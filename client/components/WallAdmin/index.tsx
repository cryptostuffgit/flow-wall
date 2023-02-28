import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { createWall, updateWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';

const WallAdmin = ({ user, address, admin, needsMigrate }) => {
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

  const migrate = useCallback(() => {
    //
    (async () => {
      await createWall(fcl, user);
      //
    })();
  }, [needsMigrate]);

  return (
    <div className="flex">
      {needsMigrate && <Icon name="edit" tooltip="Migrate" onClick={migrate} />}
      <Icon name="edit" tooltip="Change Bio" onClick={editBio} />
      <Icon name="avatar" tooltip="Change Avatar" onClick={editAvatar} />
    </div>
  );
};

export default WallAdmin;
