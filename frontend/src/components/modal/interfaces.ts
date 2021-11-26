import React, { ReactNode } from 'react';

export interface IProps extends Partial<IPropsModal> {
  onClose(event: React.MouseEvent<HTMLDivElement>): void;
  isCloseOutside?: boolean;
  [key: string]: any;
}

export enum MobileSize {
  S = '40%', // от высоты экрана (ширина всегда 100%)
  M = '60%',
  L = '90%',
}
export enum DesktopSize {
  S = '480px', // ширина модалки
  M = '640px',
  L = '920px',
}

export interface IPropsModal {
  onClose(event: React.MouseEvent<HTMLDivElement>): void;
  isCloseOutside?: boolean;
  padding?: string | null; // по дефолту паддинга нет совсем
  children?: ReactNode;
  title?: string;
  className?: string;
  mobileSize?: MobileSize;
  desktopSize?: DesktopSize;
  zIndex?: number;
}
