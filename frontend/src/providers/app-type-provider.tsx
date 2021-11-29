import React, { useState, createContext, useContext } from 'react';

const Context = createContext<any>({});
const Provider = Context.Provider;

type TApp = 'web' | 'app';

export const AppTypeProvider = ({ children }: any) => {
  const [appType, setAppType] = useState<TApp>('web');
  const toggleAppType = () => {
    if (appType === 'web') {
      setAppType('app');
    } else {
      setAppType('web');
    }
  };

  return <Provider value={{ appType, toggleAppType, setAppType }}>{children}</Provider>;
};

export const useAppTypeContext = () => useContext(Context);
