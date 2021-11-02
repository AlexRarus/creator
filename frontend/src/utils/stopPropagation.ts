import { SyntheticEvent } from 'react';

export function stopPropagation(e: SyntheticEvent) {
  e.stopPropagation();
  e.nativeEvent.stopPropagation();
}
