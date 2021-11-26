import { useEffect, useState } from 'react';

type TThemeType = 'light' | 'dark';

export const useDarkMode = () => {
  const [themeType, setThemeType] = useState<TThemeType>(
    (window.localStorage.getItem('theme') || 'light') as TThemeType
  );
  const toggleTheme = () => {
    if (themeType === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setThemeType('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setThemeType('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    localTheme && setThemeType(localTheme as TThemeType);
  }, []);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme
      ? setThemeType(`dark`)
      : localTheme
      ? setThemeType(localTheme as TThemeType)
      : setThemeType('light');
  }, []);

  return [themeType, toggleTheme];
};
