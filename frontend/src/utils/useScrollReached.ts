import { useState, useEffect, useCallback } from 'react';

import { useElementMetrics, IMetrics } from './useElementMetrics';

/**
 *  хук возвращает true если скрол достиг элемента и false если до элемента еще не доскролили
 * @param element
 */
export const useScrollReached = (element: HTMLElement | null): boolean => {
  const metrics: IMetrics = useElementMetrics(element);
  const [isReached, setReached] = useState(false);

  const reachCheck = useCallback(() => {
    const windowTop: number = window.pageYOffset;
    const windowBottom: number = window.pageYOffset + window.innerHeight;
    const result: boolean = windowTop < metrics.bottom && metrics.top < windowBottom;

    if (result !== isReached) {
      setReached(result);
    }
  }, [metrics.top, metrics.bottom, isReached]);

  useEffect(() => {
    reachCheck();
  }, [element]);

  // scroll-event-listen
  useEffect(() => {
    window.addEventListener('scroll', reachCheck);
    return () => window.removeEventListener('scroll', reachCheck);
  }, [reachCheck]);

  return isReached;
};
