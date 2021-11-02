import React, { FocusEvent, useEffect, useState } from 'react';

import { Error, StatusBar, Label } from '../input-components';

import { IProps } from './interfaces';
import { ComponentWrapper, InputStyled, IconWrapper } from './style';

export const InputText = React.forwardRef((props: IProps, ref: any) => {
  const {
    label = '',
    error = '',
    dimension = 'l',
    disabled = false,
    type = 'text',
    icon: Icon = '',
    value = '',
    ...inputProps
  } = props;
  const [componentElement, componentRefCallback] = useState<HTMLElement | null>(null);
  const [iconWrapperElement, iconWrapperRefCallback] = useState<HTMLElement | null>(null);
  const [iconWrapperWidth, setIconWrapperWidth] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [markError, setMarkError] = useState(Boolean(error));
  const [uniqId] = useState(Math.random().toString());

  useEffect(() => {
    if (Icon && iconWrapperElement) {
      setIconWrapperWidth(iconWrapperElement.getBoundingClientRect().width);
    }
  }, []);
  useEffect(() => {
    setMarkError(!isFocused && Boolean(error));
    setIsOpenError(isFocused && Boolean(error));
  }, [isFocused, error]);

  const changeHandler = (e: any) => {
    inputProps.onChange && inputProps.onChange(e.target.value);
  };
  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    inputProps.onBlur && inputProps.onBlur(e);
  };
  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    inputProps.onFocus && inputProps.onFocus(e);
  };
  const clickHandler = () => {
    if (Icon && iconWrapperElement) {
      setIconWrapperWidth(iconWrapperElement.getBoundingClientRect().width);
    }
  };

  return (
    <ComponentWrapper dimension={dimension} ref={componentRefCallback} onClick={clickHandler}>
      {label && (
        <Label
          htmlFor={`input-text-${inputProps.name}-${uniqId}`}
          isEmpty={!value && !isFocused}
          dimension={dimension}>
          {label}
        </Label>
      )}
      <InputStyled
        id={`input-text-${inputProps.name}-${uniqId}`}
        ref={ref}
        type={type}
        value={value}
        {...inputProps}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        disabled={disabled}
        dimension={dimension}
        iconWrapperWidth={iconWrapperWidth}
      />
      <IconWrapper ref={iconWrapperRefCallback} dimension={dimension}>
        {Icon && <Icon />}
      </IconWrapper>
      <StatusBar markError={markError} isFocused={isFocused} />
      <Error isOpen={isOpenError} openerElement={componentElement}>
        {error}
      </Error>
    </ComponentWrapper>
  );
});
