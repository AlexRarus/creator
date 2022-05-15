import React from 'react';
import SwitchMaterial from '@mui/material/Switch';

import { SwitchWrapper, SwitchLabel } from './style';
import { IProps } from './interfaces';

export const Switch = (props: IProps) => {
  const {
    children,
    disabled,
    value = false,
    labelPosition = 'left',
    justify = 'space-between',
    ...inputProps
  } = props;

  const onClick = () => {
    if (!disabled) {
      inputProps?.onChange && inputProps.onChange(!value);
    }
  };

  return (
    <SwitchWrapper justify={justify}>
      {labelPosition === 'left' && <SwitchLabel>{children}</SwitchLabel>}
      <SwitchMaterial checked={value} onClick={onClick} disabled={disabled} />
      {labelPosition === 'right' && <SwitchLabel>{children}</SwitchLabel>}
      <input type='hidden' {...inputProps} value={value} />
    </SwitchWrapper>
  );
};
