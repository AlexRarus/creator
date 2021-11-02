import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export function useScrolling(debounceTime = 500): boolean {
  const [isScrolling, setIsScrolling] = useState(false);
  const stopScroll = useCallback(
    debounce(() => setIsScrolling(false), debounceTime),
    [debounceTime]
  );
  const startScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
    stopScroll();
  }, [isScrolling, stopScroll]);

  useEffect(() => {
    window?.addEventListener('scroll', startScroll);
    return () => window?.removeEventListener('scroll', startScroll);
  }, []);

  return isScrolling;
}
