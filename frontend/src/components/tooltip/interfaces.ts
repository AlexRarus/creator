import { ReactNode } from 'react';
export type TPosition = 'left' | 'right' | 'top' | 'bottom';

export interface IProps {
  openerElement: HTMLElement | null;
  children: ReactNode; // текс подсказки (или любой компонент)
  position?: TPosition; // 'top' | 'right' | 'bottom' | 'left'
}
