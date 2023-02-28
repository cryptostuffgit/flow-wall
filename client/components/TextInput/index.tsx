import { on } from 'events';
import React, { useState } from 'react';

function TextInput({ onClick }) {
  const [text, setText] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick(text);
    }
  };

  return (
    <div className="form__group field">
      <input
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        type="input"
        className="form__field"
        placeholder="Name"
        name="name"
        id="name"
        autocomplete="off"
      />
      <label htmlFor="name" className="form__label">
        Post
      </label>
    </div>
  );
}

export default TextInput;
