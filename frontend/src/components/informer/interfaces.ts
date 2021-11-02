import { ReactNode } from 'react';

type TPosition = 'left' | 'right' | 'top' | 'bottom';

export interface IProps {
  children: ReactNode; // текс подсказки (или любой компонент)
  position?: TPosition; // 'top' | 'right' | 'bottom' | 'left'
}
