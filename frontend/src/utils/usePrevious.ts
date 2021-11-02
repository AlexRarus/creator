import { useRef, useEffect, MutableRefObject } from 'react';

export function usePrevious<T>(value: T): T {
  const ref: MutableRefObject<T> = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
