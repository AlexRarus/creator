import React, { useState, useEffect, createContext, useContext } from 'react';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const VirtualKeyboardProvider = ({ children }: any) => {
  const [lockHtmlScroll, setLockHtmlScroll] = useState<boolean>(false);
  const [isOpenKeyboard, setOpenKeyboard] = useState<boolean>(false);

  useEffect(() => {
    setOpenKeyboard(document?.activeElement?.tagName === 'INPUT');

    function detectBlur() {
      setOpenKeyboard(false);
      setLockHtmlScroll(false);
    }

    function detectFocus() {
      if (
        document?.activeElement?.tagName === 'INPUT' ||
        document?.activeElement?.tagName === 'TEXTAREA'
      ) {
        setOpenKeyboard(true);
        setLockHtmlScroll(true);
      } else {
        setLockHtmlScroll(false);
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

  useEffect(() => {
    const preventDefaultScroll = (e: any) => {
      window.scrollTo(0, 0);
      e.preventDefault();
    };
    if (lockHtmlScroll) {
      // блокируем скролл до черного блока под клавиатурой
      window.addEventListener('touchmove', preventDefaultScroll); // mobile
    }
    return () => window.removeEventListener('touchmove', preventDefaultScroll); // mobile
  }, [lockHtmlScroll]);

  return (
    <Provider value={{ isOpenKeyboard, setLockHtmlScroll, lockHtmlScroll }}>{children}</Provider>
  );
};

export const useVirtualKeyboardContext = () => useContext(Context);
