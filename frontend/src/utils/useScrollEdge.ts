import { useState, useEffect, useCallback } from 'react';
/**
 *  хук возвращает true если скрол достиг края страницы
 *  @edge
 *  @buffer - колличество пикселей до края
 */
export const useScrollEdge = (edge: 'top' | 'bottom' | 'both', buffer = 0): boolean => {
  const [isReached, setReached] = useState(false);

  const reachCheck = useCallback(() => {
    const scrollTopEdge: number = window.pageYOffset; // позиция верхнего края страницы в текущий момент
    const scrollBottomEdge: number = window.pageYOffset + window.innerHeight; // позиция нижнего края страницы в текущий момент

    const topEdge = buffer; // координата верха страницы
    const bottomEdge: number = document.body.scrollHeight - buffer; // координата низа страницы
    const isTop = scrollTopEdge <= topEdge;
    const isBottom = scrollBottomEdge >= bottomEdge;
    let result: boolean;

    switch (edge) {
      case 'top':
        result = isTop;
        break;
      case 'bottom':
        result = isBottom;
        break;
      default:
        result = isTop || isBottom;
    }

    if (isReached !== result) {
      setReached(result);
    }
  }, [isReached]);

  useEffect(() => {
    reachCheck();
  }, [edge]);

  // scroll-event-listen
  useEffect(() => {
    window.addEventListener('scroll', reachCheck);
    return () => window.removeEventListener('scroll', reachCheck);
  }, [reachCheck]);

  return isReached;
};
