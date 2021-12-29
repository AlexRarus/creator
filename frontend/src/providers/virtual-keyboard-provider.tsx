import React, { useState, useEffect, createContext, useContext } from 'react';
import { useThemeContext } from 'src/providers/dark-theme-provider';

const Context = createContext<any>({});
const Provider = Context.Provider;

export const VirtualKeyboardProvider = ({ children }: any) => {
  const [isOpenKeyboard, setOpenKeyboard] = useState<boolean>(false);
  const [prevWindowHeight, setWindowHeight] = useState(window?.innerHeight);
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

  useEffect(() => {
    // когда происходит ресайз при скрытии раскрытии виртуальной клавиатуры скроллим вверх, чтобы не было черного блока снизу
    if (prevWindowHeight !== window?.innerHeight) {
      console.log('resize');
      setWindowHeight(window?.innerHeight);
      // window.scrollTo(0, 0);
    }
  });

  window.addEventListener('resize', () => {
    console.log('resize1');
  });

  return <Provider value={{ isOpenKeyboard }}>{children}</Provider>;
};

export const useVirtualKeyboardContext = () => useContext(Context);
