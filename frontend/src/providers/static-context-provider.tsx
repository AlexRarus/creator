import React, { createContext, useContext } from 'react';

const Context = createContext<any>({});
const Provider = Context.Provider;

interface IProps {
  children: any;
  context: any;
}

export const StaticContextProvider = (props: IProps) => {
  const { context, children } = props;

  return <Provider value={context}>{children}</Provider>;
};

export const useStaticContext = () => useContext(Context);
