import React from 'react';

import { IOptionProps, IOptionLabelProps } from '../interfaces';

import {
  OptionWrapper,
  OptionIndex,
  OptionLabelWrapper,
  OptionButtonWrapper,
  DisabledMessage,
  RemoveButton,
  AddButton,
} from './style';

export default function Option(props: IOptionProps) {
  const { children, option, index, sorting, onRemove, onAdd, disabled, ...draggingProps } = props;

  const removeHandler = () => {
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  const addHandler = () => {
    if (!disabled && onAdd) {
      onAdd();
    }
  };

  return (
    <OptionWrapper sorting={sorting} {...draggingProps} disabled={disabled}>
      {sorting && <OptionIndex>{index}</OptionIndex>}
      {children || <OptionLabel option={option} />}
      <OptionButtonWrapper>
        {disabled && <DisabledMessage>(Выбрано)</DisabledMessage>}
        {onRemove && <RemoveButton disabled={disabled} onClick={removeHandler} />}
        {onAdd && <AddButton disabled={disabled} onClick={addHandler} />}
      </OptionButtonWrapper>
    </OptionWrapper>
  );
}

export const OptionLabel = (props: IOptionLabelProps) => {
  const { option } = props;

  return (
    <OptionLabelWrapper title={option.label || option.value}>
      {option.label || option.value}
    </OptionLabelWrapper>
  );
};
