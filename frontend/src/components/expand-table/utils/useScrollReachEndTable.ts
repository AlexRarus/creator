import { useState, useEffect } from 'react';

import useElementMetricsTable, { IMetrics } from './useElementMetricsTable';

interface IOptions {
  endIndent: number;
  isLoading: boolean;
  refreshKey?: string;
}

const defaultOptions: IOptions = {
  endIndent: 50,
  isLoading: true,
};

export default function useScrollReachEndTable(
  targetElement: HTMLElement | null,
  options: Partial<IOptions> = defaultOptions
) {
  const { height }: IMetrics = useElementMetricsTable(targetElement, { isResizeObserve: true });
  const {
    endIndent = defaultOptions.endIndent,
    isLoading = defaultOptions.isLoading,
    refreshKey,
  } = options;
  const [isReach, setReach] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const checkReach = () => {
    const element: HTMLElement | null = targetElement;
    const elementScrollHeight: number | undefined = element?.scrollHeight as number;
    const elementScrollTop: number | undefined = element?.scrollTop;

    const result: boolean =
      elementScrollHeight !== undefined &&
      elementScrollTop !== undefined &&
      elementScrollHeight - endIndent <= elementScrollTop + height;
    if (result !== isReach) {
      setReach(result);
    }
  };

  useEffect(() => {
    setReach(false);
    setInitialized(false);
  }, [refreshKey]);

  useEffect(() => {
    if (!initialized && isLoading) {
      setInitialized(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && initialized) {
      checkReach();
    }
  }, [isLoading, height]);

  // check scroll value
  useEffect(() => {
    const element: HTMLElement | null = targetElement;
    element?.addEventListener('scroll', checkReach);

    return () => element?.removeEventListener('scroll', checkReach);
  }, [isReach, height]);

  return isReach;
}
