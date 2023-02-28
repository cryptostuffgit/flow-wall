import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { createWall, updateWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';

const WallAdmin = ({
  user,
  causeRefresh,
  refresh,
  address,
  admin,
  needsMigrate,
}) => {
  const [migrated, setMigrated] = useState(false);

  const editBio = useCallback(() => {
    (async () => {
      const bio = 'b';
      await updateWall(fcl, user, '', bio);
      causeRefresh(!refresh);
    })();
  }, [admin]);

  const editAvatar = useCallback(() => {
    (async () => {
      const avatar = 'a';
      await updateWall(fcl, user, avatar, '');
      causeRefresh(!refresh);
    })();
  }, [admin]);

  const migrate = useCallback(() => {
    (async () => {
      await createWall(fcl, user);
      setMigrated(true);
    })();
  }, [needsMigrate]);

  return (
    <div className="flex">
      {needsMigrate && !migrated && (
        <Icon name="edit" tooltip="Migrate" onClick={migrate} />
      )}
      <Icon name="edit" tooltip="Change Bio" onClick={editBio} />
      <Icon name="avatar" tooltip="Change Avatar" onClick={editAvatar} />
    </div>
  );
};

export default WallAdmin;
