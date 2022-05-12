import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

import { getDifference } from './getDifference';

/**
 *  хук возвращает true если скрол направлен к началу страницы или достигает самого верха, иначе возвращается false
 * @param initState
 * @param minDownScroll - минимальное смещение в 'px' при скроле вниз при котором будет переключаться стейт
 * @param minUpScroll - минимальное смещение в 'px' при скроле вверх при котором будет переключаться стейт
 * @param topBuffer - расстоянис сверху страницы в котором считать state = false
 */
export const useScrollDirection = (
  initState = false,
  minDownScroll = Infinity,
  minUpScroll = Infinity,
  topBuffer = 100
): boolean => {
  const [state, setState] = useState(initState);
  const scrollValueRef = useRef(0);
  const lastScrollTimerRef = useRef(0);

  // scroll-event-listen
  useEffect(() => {
    window.addEventListener('scroll', updateScrollValueCallback);
    return () => {
      window.removeEventListener('scroll', updateScrollValueCallback);
    };
  }, []);

  const updateScrollValueCallback = () => {
    window.clearTimeout(lastScrollTimerRef.current);

    // сравнивание запомненного скрола с текущим
    const scrollValue = window.pageYOffset;
    const prevScrollValue = scrollValueRef.current;
    const shift: number = getDifference(scrollValue, prevScrollValue);
    const scrollDirection: boolean = scrollValue > topBuffer && scrollValue > prevScrollValue;

    // переключение стейта
    if (scrollDirection && shift >= minDownScroll) {
      setState(scrollDirection);
    } else if (scrollValue < topBuffer || shift >= minUpScroll) {
      setState(scrollDirection);
    }

    // запоминание скрола в текущий момент
    lastScrollTimerRef.current = window.setTimeout(
      debounce(() => (scrollValueRef.current = window.pageYOffset), 10),
      0
    );
  };

  return state;
};
