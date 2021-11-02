import React, { ChangeEvent, FocusEvent } from 'react';
// import { IInputTextProps } from 'src/components/input-text';

export interface IInputSearchProps {
  name?: string;
  onSearch?(value: string): void;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
}

export interface IProps extends IInputSearchProps {
  value?: IOption[];
  onChange?(value: IOption[]): void;
  label?: string;
  searchLabel?: string;
  options?: IOption[];
  CustomOption?: React.FC<IOptionProps>; // рендер элемента списка
  CustomOptionLabel?: React.FC<IOptionLabelProps>; // рендер только внутренней части элемента
  CustomRemoveConfirm?: React.FC<IOptionLabelProps>; // рендер подтверждения удаления
}

export interface IOption {
  // label: string;
  // value: string;
  [key: string]: any;
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
  label: string;
  selectedOptions: IOption[];
  onChange?(options: IOption[]): void;
  CustomOption?: React.FC<IOptionProps>; // рендер элемента списка
  CustomOptionLabel?: React.FC<IOptionLabelProps>; // рендер только внутренней части элемента
  CustomRemoveConfirm?: React.FC<IRemoveConfirmProps>; // рендер подтверждения удаления
}

export interface ISortedItemProps {
  index: number;
  option: IOption;
  moveItem(prevIndex: number, nextIndex: number): void;
  onRemoveOption(optionIndex: number): void;
  CustomOption?: React.FC<IOptionProps>; // рендер элемента списка
  CustomOptionLabel?: React.FC<IOptionLabelProps>; // рендер только внутренней части элемента
  CustomRemoveConfirm?: React.FC<IRemoveConfirmProps>; // рендер подтверждения удаления
  hoverIndexRef: any;
}

export interface ISearchingProps extends IInputSearchProps {
  searchLabel: string;
  selectedOptions: IOption[];
  searchOptions: IOption[];
  onChange?(options: IOption[]): void;
  CustomOption?: React.FC<IOptionProps>; // рендер элемента списка
  CustomOptionLabel?: React.FC<IOptionLabelProps>; // рендер только внутренней части элемента
  CustomRemoveConfirm?: React.FC<IRemoveConfirmProps>; // рендер подтверждения удаления
}
