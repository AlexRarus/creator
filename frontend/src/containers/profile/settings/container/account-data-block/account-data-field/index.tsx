import React from 'react';

import {
  AccountDataFieldWrapper,
  AccountDataFieldLabel,
  AccountDataFieldInputWrapper,
  AccountDataFieldInput,
  AccountDataFieldButton,
} from './style';

interface IProps {
  label: string;
  value: string;
  onClick?(): void;
  disabled?: boolean;
  type?: 'text' | 'password';
  buttonLabel?: string;
}

export const AccountDataField = (props: IProps) => {
  const {
    label,
    value,
    onClick,
    disabled = false,
    type = 'text',
    buttonLabel = 'Изменить',
  } = props;

  const clickHandler = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <AccountDataFieldWrapper>
      <AccountDataFieldLabel>{label}</AccountDataFieldLabel>
      <AccountDataFieldInputWrapper>
        <AccountDataFieldInput defaultValue={value} type={type} />
        <AccountDataFieldButton disabled={disabled} onClick={clickHandler}>
          {buttonLabel}
        </AccountDataFieldButton>
      </AccountDataFieldInputWrapper>
    </AccountDataFieldWrapper>
  );
};
