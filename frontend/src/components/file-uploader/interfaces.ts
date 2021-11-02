import { ReactNode } from 'react';

export interface IProps {
  value?: File | File[] | null;
  onChange?(value: File | File[] | null): void;
  multiple?: boolean;
  title?: string;
  width?: string;
  maxSize?: number;
  className?: string;
  accept?: string; // example '.jpeg,.png'
  info?: ReactNode;
}

export interface IState {
  rejectedFiles: File[];
  attachedFilesSize: number;
  isShownDropArea?: boolean;
}
