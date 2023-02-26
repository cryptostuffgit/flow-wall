import React, { useEffect, useState, useCallback } from 'react';
import * as fcl from '@onflow/fcl';
import { postWall, getWallMessages } from '../../utils/transactions';
import TextInput from '../TextInput';
import MessageView from '../Message';
import Icon from '../Icon';

const WallAdmin = ({ user, address, admin }) => {
  return (
    <div className="flex">
      <Icon name="edit" tooltip="Change Bio" />
      <Icon name="avatar" tooltip="Change Avatar" />
    </div>
  );
};

export default WallAdmin;
