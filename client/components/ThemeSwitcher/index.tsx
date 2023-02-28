import React, { useState } from 'react';
import Icon from '../Icon';

function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    const theme = document.querySelector('body').classList.contains('light')
      ? 'light'
      : 'dark';

    let add = 'light',
      remove = 'dark';

    if (theme === 'light') {
      remove = 'light';
      add = 'dark';
    }
    document.querySelector('body').classList.remove(remove);
    document.querySelector('body').classList.add(add);

    setTheme(add);
  }

  return (
    <Icon
      name={theme === 'light' ? 'theme' : 'theme-d'}
      color={theme === 'light' ? 'black' : 'white'}
      onClick={toggleTheme}
    />
  );
}

export default ThemeSwitcher;
