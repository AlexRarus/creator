import { useEffect, useState } from 'react';
import { isBrowser } from 'src/utils/detectEnvironment';

type TThemeType = 'light' | 'dark';

interface IThemeItem {
  type: TThemeType;
}

const initialThemesList: IThemeItem[] = [{ type: 'light' }, { type: 'dark' }];

let defaultTheme = 'light';
// todo ssr костыль
if (isBrowser) {
  defaultTheme = window.localStorage.getItem('theme') || 'light';
}

export const useThemeMode = () => {
  const [themeType, setThemeType] = useState<TThemeType>(defaultTheme as TThemeType);
  const toggleTheme = (type: TThemeType) => {
    setThemeType(type);
    window.localStorage.setItem('theme', type);
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

  return [themeType, toggleTheme, initialThemesList];
};
