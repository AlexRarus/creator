import React, { ReactNode } from 'react';

export interface IProps extends Partial<IPropsModal> {
  onClose(event: React.MouseEvent<HTMLDivElement>): void;
  isCloseOutside?: boolean;
  [key: string]: any;
}

export enum ModalSize {
  S = 'S',
  M = 'M',
  L = 'L',
}

export const mobileSize = {
  S: '40%',
  M: '60%',
  L: '90%',
};
export const desktopSize = {
  S: '480px',
  M: '640px',
  L: '920px',
};

export interface IPropsModal {
  onClose(event: React.MouseEvent<HTMLDivElement>): void;
  // если мы заранее знаем что окно высокое, то будет scroll
  // сбрасываем центрирование
  isCenter?: boolean;
  isCloseOutside?: boolean;
  padding?: string | null;
  children?: ReactNode;
  title?: string;
  className?: string;
  size?: ModalSize;
  zIndex?: number;
}
