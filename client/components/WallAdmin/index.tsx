import React, { useEffect, useState, useCallback, useContext } from 'react';
import * as fcl from '@onflow/fcl';
import { createWall, updateWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';
import UserContext from '@/utils/UserContext';

const WallAdmin = ({ causeRefresh, refresh, needsMigrate }) => {
  const [migrated, setMigrated] = useState(false);
  const { user } = useContext(UserContext);

  const editBio = useCallback(() => {
    (async () => {
      const bio = 'b';
      await updateWall(fcl, user, '', bio);
      causeRefresh(!refresh);
    })();
  }, [causeRefresh, refresh, user]);

  const editAvatar = useCallback(() => {
    (async () => {
      const avatar = 'a';
      await updateWall(fcl, user, avatar, '');
      causeRefresh(!refresh);
    })();
  }, [causeRefresh, refresh, user]);

  const migrate = useCallback(() => {
    (async () => {
      await createWall(fcl);
      setMigrated(true);
    })();
  }, []);

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
