import React, { ChangeEvent } from 'react';

import { IProps } from './interfaces';
import { ComponentWrapper, CheckboxStyled, Label } from './style';

export const Checkbox = React.forwardRef((props: IProps, ref: any) => {
  const { label = '', dimension = 's', disabled = false, value = false, ...inputProps } = props;

  const changeHandler = (e: ChangeEvent) => {
    inputProps.onChange(e);
  };

  return (
    <ComponentWrapper dimension={dimension}>
      <CheckboxStyled
        id={`checkbox-name-${inputProps.name}`}
        ref={ref}
        type='checkbox'
        {...inputProps}
        onChange={changeHandler}
        value={value}
        checked={value}
        disabled={disabled}
        dimension={dimension}
      />
      {label && (
        <Label htmlFor={`checkbox-name-${inputProps.name}`} dimension={dimension}>
          {label}
        </Label>
      )}
    </ComponentWrapper>
  );
});
