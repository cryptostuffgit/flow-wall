import React, { useEffect, useState } from 'react';

const MainView = ({user, userWall}) => {
  useEffect(() => {
    
  }, [userWall])

  return (
    <div className="main-container">
      <h1 className="heading">
        {userWall ? <>{userWall}'s Wall</> : <>Search for an Address</>}
      </h1>
    </div>
  );
};

export default MainView;
