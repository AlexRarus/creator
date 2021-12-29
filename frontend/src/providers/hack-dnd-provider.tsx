import React, { useState, createContext, useContext } from 'react';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const HackDndProvider = ({ children }: any) => {
  const [isDragging, setDragging] = useState<boolean>(false);

  return <Provider value={{ isDragging, setDragging }}>{children}</Provider>;
};

export const useHackDndContext = () => useContext(Context);
