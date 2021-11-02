import React, { ReactNode } from 'react';

import { LabelStyled } from './style';

interface IProps {
  children: ReactNode;
  htmlFor?: string;
  isRequired?: boolean;
}

export function Label(props: IProps) {
  const { children, htmlFor, isRequired = false } = props;

  return (
    <LabelStyled htmlFor={htmlFor} isRequired={isRequired}>
      {children}
    </LabelStyled>
  );
}
