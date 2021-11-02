import { useEffect, useRef } from 'react';

export default function usePreviousTable(value: any) {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
}
