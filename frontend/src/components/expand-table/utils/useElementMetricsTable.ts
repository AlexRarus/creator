import { useState, useEffect, useRef, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface IMetrics {
  width: number;
  height: number;
}

export interface IOptions {
  isResizeObserve?: boolean;
}

export default function useElementMetricsTable(
  targetElement: HTMLElement | null,
  options: IOptions = {}
) {
  const { isResizeObserve = false } = options;
  const [metrics, setMetrics] = useState<IMetrics>({
    width: 0,
    height: 0,
  });
  const resizeObserverRef = useRef(
    new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        if (entry.target === targetElement) {
          setMetricsFromRect(targetElement?.getBoundingClientRect());
        }
      }
    })
  );

  useEffect(() => {
    const element: HTMLElement | null = targetElement;

    if (element) {
      if (isResizeObserve && resizeObserverRef.current) {
        resizeObserverRef.current.observe(element);
      } else {
        setMetricsFromRect(element.getBoundingClientRect());
      }
    }
  }, [targetElement]);

  const setMetricsFromRect = useCallback(({ width, height }) => {
    setMetrics({ width, height });
  }, []);

  return metrics;
}
