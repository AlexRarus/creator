import React, { ChangeEvent, useState, useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';

import { ComponentWrapper } from './style';

export type CalendarValue = null | Date;
type Mask = string | RegExp;

interface IProps {
  id?: string;
  value?: CalendarValue;
  onChange?(value: CalendarValue, id?: string): void;
  isRange?: boolean;
  mask?: Mask[];
}

export function InputCalendar(props: IProps) {
  const {
    id,
    value = null,
    onChange,
    mask = [/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /\d/, /\d/, /\d/, /\d/],
  } = props;
  const [stringValue, setStringValue] = useState('');

  useEffect(() => {
    const dateValue = value || null;
    const stringifyValue = dateValue && isValid(dateValue) ? format(dateValue, 'dd.MM.yyyy') : '';
    setStringValue(stringifyValue);
  }, [value]);

  const inputHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setStringValue(target.value);
  };

  const blurHandler = () => {
    const dateValue = new Date(stringValue);
    const resultValue = isValid(dateValue) ? dateValue : null;
    onChange && onChange(resultValue, id);
  };

  return (
    <ComponentWrapper>
      <MaskedInput value={stringValue} mask={mask} onChange={inputHandler} onBlur={blurHandler} />
    </ComponentWrapper>
  );
}
