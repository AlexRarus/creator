import React, { useState, useEffect } from 'react';

import { TDimension } from '../input-components';

import { ButtonsGroupWrapper, ButtonOption } from './style';

interface IButton {
  value: any;
  label: any;
}

interface IProps {
  buttons: IButton[];
  value?: any;
  onChange?(value: any): void;
  name?: string;
  dimension?: TDimension;
}

export const ButtonsGroup = (props: IProps) => {
  const { buttons, value, onChange, name, dimension = 'm' } = props;
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
