import React, { createContext, useContext } from 'react';

const Context = createContext<any>({});
const Provider = Context.Provider;

interface IProps {
  children: any;
  access: string | null;
}

/**
 * Закидываем в провайдер нужную пользовательскую тему и она будет доступна везде в атрибуте selectedTheme
 * @param props
 * @constructor
 */
export const HasAuthProvider = (props: IProps) => {
  const { access, children } = props;

  return <Provider value={{ access }}>{children}</Provider>;
};

export const useHasAuth = () => useContext(Context);
