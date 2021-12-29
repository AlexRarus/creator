import React, { useState, useEffect, createContext, useContext } from 'react';
import { useThemeContext } from 'src/providers/dark-theme-provider';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const VirtualKeyboardProvider = ({ children }: any) => {
  const [isOpenKeyboard, setOpenKeyboard] = useState<boolean>(false);
  const { DEVICE_THEME } = useThemeContext();

  useEffect(() => {
    setOpenKeyboard(
      document?.activeElement?.tagName === 'INPUT' ||
        document?.activeElement?.tagName === 'TEXTAREA'
    );

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

  useEffect(() => {
    const hideKeyboardOnScroll = (e: any) => {
      if (isOpenKeyboard && DEVICE_THEME?.isMobile) {
        const field = document.createElement('input');
        field.setAttribute('type', 'text');
        document.body.appendChild(field);
        field.focus();
        field.setAttribute('style', 'display:none;');
        document.body.removeChild(field);
        setOpenKeyboard(false);
      }
    };

    // убираем клавиатуру при скролле, при скролле с клавиатурой есть баги в сафари (блок снизу html)
    document.body.addEventListener('touchmove', hideKeyboardOnScroll); // mobile
    return () => document.body.removeEventListener('touchmove', hideKeyboardOnScroll); // mobile
  }, [isOpenKeyboard]);

  return <Provider value={{ isOpenKeyboard }}>{children}</Provider>;
};

export const useVirtualKeyboardContext = () => useContext(Context);
