import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

import { usePrevious } from './usePrevious';
import { getDifference } from './getDifference';

/**
 *  хук возвращает true если скрол направлен к началу страницы или достигает самого верха, иначе возвращается false
 * @param initState
 * @param minDownScroll - минимальное смещение в 'px' при скроле вниз при котором будет переключаться стейт
 * @param minUpScroll - минимальное смещение в 'px' при скроле вверх при котором будет переключаться стейт
 * @param wait - debounce time
 */
export const useScrollDirection = (
  initState = false,
  minDownScroll = Infinity,
  minUpScroll = Infinity,
  wait = 0
): boolean => {
  const [state, setState] = useState(initState);
  const [scrollValue, setScrollValue] = useState(0);
  const prevScrollValue: number = usePrevious(scrollValue);

  useEffect(() => {
    const shift: number = getDifference(scrollValue, prevScrollValue);
    const scrollDirection: boolean = scrollValue > prevScrollValue;

    if (scrollDirection && shift >= minDownScroll) {
      setState(scrollDirection);
    } else if (!scrollValue || shift >= minUpScroll) {
      setState(scrollDirection);
    }
  }, [scrollValue]);

  // scroll-event-listen
  useEffect(() => {
    window.addEventListener('scroll', updateScrollValue);
    return () => window.removeEventListener('scroll', updateScrollValue);
  }, []);

  const updateScrollValue = useCallback(
    wait
      ? debounce(() => setScrollValue(window.pageYOffset), wait)
      : () => setScrollValue(window.pageYOffset),
    []
  );

  return state;
};
