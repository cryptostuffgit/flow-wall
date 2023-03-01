import React, { useEffect, useState, useCallback, useContext } from 'react';
import * as fcl from '@onflow/fcl';
import { createWall, updateWall } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';
import UserContext from '@/utils/UserContext';
import LoadingContext from '@/utils/LoadingContext';

const WallAdmin = ({ causeRefresh, refresh, needsMigrate }) => {
  const [migrated, setMigrated] = useState(false);
  const { user } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);

  const editBio = useCallback(() => {
    (async () => {
      try {
        setLoading(true);
        const bio = 'b';
        await updateWall(fcl, user, '', bio);
        causeRefresh(!refresh);
      } catch (e: any) {
        throw e;
      } finally {
        setLoading(false);
      }
    })();
  }, [causeRefresh, refresh, user]);

  const editAvatar = useCallback(() => {
    (async () => {
      try {
        setLoading(true);
        const avatar = 'a';
        await updateWall(fcl, user, avatar, '');
        causeRefresh(!refresh);
      } catch (e: any) {
        throw e;
      } finally {
        setLoading(false);
      }
    })();
  }, [causeRefresh, refresh, user]);

  const migrate = useCallback(() => {
    (async () => {
      try {
        setLoading(true);
        await createWall(fcl);
        setMigrated(true);
      } catch (e: any) {
        throw e;
      } finally {
        setLoading(false);
      }
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
