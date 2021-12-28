import React, { createContext, useContext } from 'react';
import { ITheme } from 'src/dal/themes/interfaces';

const Context = createContext<any>({});
const Provider = Context.Provider;

interface IProps {
  children: any;
  selectedTheme?: ITheme | null;
}

/**
 * Закидываем в провайдер нужную пользовательскую тему и она будет доступна везде в атрибуте selectedTheme
 * @param props
 * @constructor
 */
export const SelectedThemeProvider = (props: IProps) => {
  const { children, selectedTheme } = props;

  return <Provider value={{ selectedTheme }}>{children}</Provider>;
};

export const useSelectedThemeContext = () => useContext(Context);
