import React, { useState, useEffect, createContext, useContext } from 'react';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const VirtualKeyboardProvider = ({ children }: any) => {
  const [isOpenKeyboard, setOpenKeyboard] = useState<boolean>(false);

  useEffect(() => {
    setOpenKeyboard(document?.activeElement?.tagName === 'INPUT');

    function detectBlur() {
      setOpenKeyboard(false);
    }

    function detectFocus() {
      if (
        document?.activeElement?.tagName === 'INPUT' ||
        document?.activeElement?.tagName === 'TEXTAREA'
      ) {
        setOpenKeyboard(true);
      } else {
        setOpenKeyboard(false);
      }
    }

    window.addEventListener('focus', detectFocus, true);
    window.addEventListener('blur', detectBlur, true);

    return () => {
      window.removeEventListener('focus', detectFocus, true);
      window.removeEventListener('blur', detectBlur, true);
    };
  }, []);

  return <Provider value={{ isOpenKeyboard }}>{children}</Provider>;
};

export const useVirtualKeyboardContext = () => useContext(Context);
