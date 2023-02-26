import React, { useEffect, useState } from 'react';
import TextInput from '../text-input';

const MainView = ({user, userWall}) => {
  useEffect(() => {
    
  }, [userWall])

  return (
    <div className="text-container">
      <h1 className="heading">
        {userWall ? <>{userWall}'s Wall</> : <>Search for an Address</>}
      </h1>
      <TextInput />
    </div>
  );
};

export default MainView;
