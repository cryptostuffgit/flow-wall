import React, { useEffect, useState } from 'react';
import TextInput from '../text-input';

const MainView = () => {

  return (
    <div className="text-container">
      <h1 className="heading">
        Flow Wall<br></br>Built on Flow
      </h1>
      <TextInput />
    </div>
  );
};

export default MainView;
