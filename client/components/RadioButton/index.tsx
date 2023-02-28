import React, { useState } from 'react';

const RadioButton = ({ buttonClicked }) => {
  const [contentType, setContentType] = useState('text');

  const handleOptionChange = (changeEvent) => {
    setContentType(changeEvent.target.value);
    buttonClicked(changeEvent.target.value);
  };

  return (
    <div className="wrapper">
      <input
        type="radio"
        id="text"
        name="select"
        value="text"
        checked={contentType == 'text'}
        onChange={handleOptionChange}
      />
      <input
        type="radio"
        id="image"
        name="select"
        value="image"
        checked={contentType == 'image'}
        onChange={handleOptionChange}
      />
      <input
        type="radio"
        id="gif"
        name="select"
        value="gif"
        checked={contentType == 'gif'}
        onChange={handleOptionChange}
      />

      <label htmlFor="text" className="option text">
        <div className="dot"></div>
        <span>Text</span>
      </label>
      <label htmlFor="image" className="option image">
        <div className="dot"></div>
        <span>Image</span>
      </label>
      <label htmlFor="gif" className="option gif">
        <div className="dot"></div>
        <span>GIF</span>
      </label>
    </div>
  );
};

export default RadioButton;
