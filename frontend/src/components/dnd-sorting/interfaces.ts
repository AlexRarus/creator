import React from 'react';

export type IOption = Record<any, any>;

export interface IProps {
  name?: string;
  value?: IOption[];
  onChange?(value: IOption[]): void;
  label?: string;
  isEmptyLabel?: boolean;
  options?: IOption[];
  CustomOption?: React.FC<IOptionProps>; // рендер элемента списка
  CustomOptionLabel?: React.FC<IOptionLabelProps>; // рендер только внутренней части элемента
  CustomRemoveConfirm?: React.FC<IOptionLabelProps>; // рендер подтверждения удаления
}

export interface IDragItem extends IOption {
  index: number;
}

export interface IOptionProps {
  option: IOption;
  onAdd?(): void;
  onRemove?(): void;
  sorting?: boolean;
  canDrop?: boolean;
  isOver?: boolean;
  isDragging?: boolean;
  index?: number;
  children?: any;
  disabled?: boolean;
}

export interface IOptionLabelProps {
  option: IOption;
}

export interface IRemoveConfirmProps {
  option: IOption;
  remove(): void;
  close(): void;
}

export interface ISortingProps {
  dndAreaId: string;
  label: string;
  isEmptyLabel?: boolean;
  selectedOptions: IOption[];
  onChange?(options: IOption[]): void;
  CustomOption?: React.FC<IOptionProps>; // рендер элемента списка
  CustomOptionLabel?: React.FC<IOptionLabelProps>; // рендер только внутренней части элемента
  CustomRemoveConfirm?: React.FC<IRemoveConfirmProps>; // рендер подтверждения удаления
}

export interface ISortedItemProps {
  dndAreaId: string;
  index: number;
  option: IOption;
  moveItem(prevIndex: number, nextIndex: number): void;
  onRemoveOption(optionIndex: number): void;
  CustomOption?: React.FC<IOptionProps>; // рендер элемента списка
  CustomOptionLabel?: React.FC<IOptionLabelProps>; // рендер только внутренней части элемента
  CustomRemoveConfirm?: React.FC<IRemoveConfirmProps>; // рендер подтверждения удаления
  hoverIndexRef: any;
}
