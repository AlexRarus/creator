import React, { ReactNode } from 'react';
import Replies from 'src/components/replies';

import { TKind, TDimension } from './interfaces';
import { ButtonStyledLink, ButtonStyled, Label } from './style';

interface IProps {
  children: ReactNode;
  dimension?: TDimension;
  kind?: TKind;
  id?: string | number;
  onClick?(id?: string | number): void;
  disabled?: boolean;
  block?: boolean;
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  [key: string]: any; // например style
}

export function Button(props: IProps) {
  const {
    children,
    id,
    onClick,
    kind = 'primary',
    dimension = 'm',
    disabled = false,
    block = false,
    type = 'button',
    to,
    ...otherProps
  } = props;

  const clickHandler = () => {
    !disabled && onClick && onClick(id);
  };

  const ButtonStyledComponent: any = to ? ButtonStyledLink : ButtonStyled;
  return (
    <ButtonStyledComponent
      onClick={clickHandler}
      kind={kind}
      dimension={dimension}
      disabled={disabled}
      block={block ? 'true' : undefined}
      type={type}
      to={to}
      {...otherProps}>
      <Label kind={kind} dimension={dimension}>
        {children}
      </Label>
      <Replies disabled={disabled} />
    </ButtonStyledComponent>
  );
}
