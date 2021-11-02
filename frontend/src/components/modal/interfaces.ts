import React, { ReactNode } from 'react';

export interface IProps extends Partial<IPropsModal> {
  onClose(event: React.MouseEvent<HTMLDivElement>): void;
  isCloseOutside?: boolean;
  dataTestId?: string;
  isHideModalCss?: boolean;
  [key: string]: any;
}

export interface IPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export enum ModalSize {
  BASE = '488px',
  MIDDLE = '640px',
  MEDIUM = '752px',
  MEDIUM_CONTENT = '816px', // content = 752px + 2padding * 32px
  MEDIUM2 = '870px',
  BIG = '960px',
}

export interface IPropsModal {
  onClose(event: React.MouseEvent<HTMLDivElement>): void;
  // если мы заранее знаем что окно высокое, то будет scroll
  // сбрасываем центрирование
  isCenter?: boolean;
  isCloseOutside?: boolean;
  isPadding?: boolean;
  padding?: IPadding;
  dataTestId?: string;
  hasHeader?: boolean;
  hasCloseButton?: boolean;
  children?: ReactNode;
  title?: string;
  className?: string;
  size?: ModalSize;
  zIndex?: number;
  isHideModalCss?: boolean;
}

export interface IState {
  padding: IPadding;
}
