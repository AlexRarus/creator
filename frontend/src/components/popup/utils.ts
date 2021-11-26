import { useCallback, useState, RefCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

export function getScrollParents(isOpen: boolean, element: any): any[] {
  const scrollParents: HTMLElement[] = [document.body];
  if (!element || !isOpen) {
    return scrollParents;
  }

  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = /(auto|scroll|hidden)/;

  if (style.position === 'fixed') {
    return scrollParents;
  }

  let parent = element;
  while (parent !== document.body) {
    parent = parent.parentElement;
    try {
      style = getComputedStyle(parent);
    } catch (e) {
      console.log('getScrollParents', e);
    }
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      scrollParents.push(parent);
    }
  }

  return scrollParents;
}

export function useScrolling(debounceTime = 500): [RefCallback<any>, boolean] {
  const [elem, refCallback] = useState<HTMLElement | null>(null);
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
    elem?.addEventListener('scroll', startScroll);
    return () => elem?.removeEventListener('scroll', startScroll);
  }, [elem]);

  return [refCallback, isScrolling];
}
