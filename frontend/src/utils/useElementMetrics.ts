import { useCallback, useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

// todo расширить при необходимости
export interface IMetrics {
  width: number;
  height: number;
  top: number;
  bottom: number;
}

export interface IOptions {
  isResizeObserve?: boolean;
  isScrollObserve?: boolean;
}

const defaultResizeObserve = false;

const defaultOptions = {
  isResizeObserve: defaultResizeObserve,
};

/**
 *
 * @param element
 * @param options { isResizeObserve, isScrollObserve }
 */
export function useElementMetrics(
  element: HTMLElement | null,
  options: IOptions = defaultOptions
): IMetrics {
  const { isResizeObserve = defaultResizeObserve } = options;
  const [metrics, setMetrics] = useState<IMetrics>({
    height: 0,
    width: 0,
    top: 0,
    bottom: 0,
  });

  const resizeObserverRef = useRef(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const { target } of entries) {
        if (target === element) {
          setMetricsFromRect(target.getBoundingClientRect(), getComputedStyle(target));
        }
      }
    })
  );

  // calculate element size metrics
  useEffect(() => {
    if (element) {
      if (isResizeObserve && resizeObserverRef.current) {
        resizeObserverRef.current.observe(element);
      } else {
        setMetricsFromRect(element.getBoundingClientRect(), getComputedStyle(element));
      }
    }
  }, [element]);

  const setMetricsFromRect = useCallback(({ width, height, top, bottom }, computedStyle: any) => {
    const scrollValue: number = window.pageYOffset;
    const position: string | undefined = computedStyle.position;
    const topPosition: number = position === 'fixed' ? top : top + scrollValue;
    const bottomPosition: number = position === 'fixed' ? bottom : bottom + scrollValue;

    setMetrics({
      width,
      height,
      top: topPosition,
      bottom: bottomPosition,
    });
  }, []);

  return metrics;
}
