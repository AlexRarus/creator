import React, { useState, useEffect } from 'react';

import { TDimension } from '../input-components';

import { ButtonsGroupWrapper, ButtonOption } from './style';

export interface IButton {
  value: any;
  label: any;
}

interface IProps {
  buttons: IButton[];
  value?: any;
  onChange?(value: any): void;
  name?: string;
  dimension?: TDimension;
  kind?: 'separated' | 'grouped';
}

export const ButtonsGroup = (props: IProps) => {
  const { buttons, value, onChange, name, dimension = 'm', kind = 'grouped' } = props;
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    if (innerValue !== value) {
      setInnerValue(value);
    }
  }, [value]);

  return (
    <>
      <input type='hidden' defaultValue={value} name={name} />
      <ButtonsGroupWrapper dimension={dimension} buttons={buttons}>
        {buttons.map((button: IButton) => (
          <ButtonOption
            kind={kind}
            key={button.value}
            isActive={button.value === value}
            onClick={() => onChange && onChange(button.value)}>
            {button.label}
          </ButtonOption>
        ))}
      </ButtonsGroupWrapper>
    </>
  );
};
