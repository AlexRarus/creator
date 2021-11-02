import React, { useRef, useState, ReactNode, useLayoutEffect, useEffect } from 'react';

import { AnimationHeightWrapper } from './style';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  time?: number;
}

export function AnimationHeight(props: IProps) {
  const { isOpen, children, time = 500 } = props;
  const [targetElement, targetRefCallback] = useState<HTMLDivElement | null>(null);
  const [currentHeight, setCurrentHeight] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);
  const timerTransitionEndRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (targetElement) {
      const { height } = targetElement.getBoundingClientRect();
      setFullHeight(height);

      if (isOpen && !initialized) {
        setInitialized(true);
      }
    }
  }, [targetElement]);
  useLayoutEffect(() => {
    if (!isOpen && currentHeight === null && targetElement) {
      const { height } = targetElement.getBoundingClientRect();
      setCurrentHeight(height);
    }
  }, [targetElement]);

  // закрытие
  // (анимация) установка нулевой высоты
  useLayoutEffect(() => {
    if (!isOpen && currentHeight) {
      setTimeout(() => setCurrentHeight(0), 0);
    }
  }, [isOpen, currentHeight]);
  // закрытие
  // (подготовка) установка фиксированной высоты
  useLayoutEffect(() => {
    if (!isOpen && currentHeight === null && targetElement) {
      const { height } = targetElement.getBoundingClientRect();
      setFullHeight(height);
      setCurrentHeight(height);
    }
  }, [isOpen]);

  // открытие
  // установка фиксированной высоты
  useLayoutEffect(() => {
    if (isOpen && currentHeight !== null && targetElement) {
      setCurrentHeight(fullHeight);
    }
  }, [isOpen]);

  useEffect(() => {
    if (timerTransitionEndRef.current !== null) {
      window.clearTimeout(timerTransitionEndRef.current);
      timerTransitionEndRef.current = null;
    }

    const transitionStartHandler = (e: any) => {
      if (isOpen && e.target === targetElement) {
        timerTransitionEndRef.current = window.setTimeout(() => setCurrentHeight(null), time);
      }
    };

    const transitionEndHandler = (e: any) => {
      if (isOpen && e.target === targetElement) {
        if (timerTransitionEndRef.current !== null) {
          window.clearTimeout(timerTransitionEndRef.current);
          timerTransitionEndRef.current = null;
        }
        setCurrentHeight(null);
      } else if (!isOpen && e.target === targetElement && !initialized) {
        setInitialized(true);
      }
    };

    if (targetElement) {
      targetElement.addEventListener('transitionstart', transitionStartHandler);
      targetElement.addEventListener('transitionend', transitionEndHandler);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('transitionstart', transitionStartHandler);
        targetElement.removeEventListener('transitionend', transitionEndHandler);
      }
    };
  }, [targetElement, isOpen, initialized, time]);

  return (
    <AnimationHeightWrapper
      data-open={isOpen}
      ref={targetRefCallback}
      height={currentHeight}
      initialized={initialized}
      time={time}
    >
      {children}
    </AnimationHeightWrapper>
  );
}
