import React from 'react';

import { ComponentWrapper } from './style';

type CalendarValue = null | Date;

interface IProps {
  value?: CalendarValue;
  onChange?(value: CalendarValue): void;
}

export function Calendar(props: IProps) {
  // const { value = null, onChange } = props;

  return <ComponentWrapper>calendar</ComponentWrapper>;
}
