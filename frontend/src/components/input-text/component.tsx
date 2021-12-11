import React, { FocusEvent, useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Error, StatusBar, Label, Placeholder } from '../input-components';

import { IProps } from './interfaces';
import { ComponentWrapper, InputStyled, IconWrapper } from './style';

export const InputText = React.forwardRef((props: IProps, ref: any) => {
  const {
    label = '',
    error = '',
    dimension = 'l',
    disabled = false,
    type = 'text',
    kind = 'primary',
    icon: Icon = '',
    value = '',
    placeholder = '',
    textAlign,
    fontSizeInherit = false,
    fontWeight = 'normal',
    ...inputProps
  } = props;
  const [componentElement, componentRefCallback] = useState<HTMLElement | null>(null);
  const [iconWrapperElement, iconWrapperRefCallback] = useState<HTMLElement | null>(null);
  const [iconWrapperWidth, setIconWrapperWidth] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [markError, setMarkError] = useState(Boolean(error));
  const [uniqId] = useState(uuidv4());
  const innerRef = useRef();
  const currentRef = ref || innerRef;

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
    <ComponentWrapper
      dimension={dimension}
      ref={componentRefCallback}
      onClick={clickHandler}
      fontSizeInherit={fontSizeInherit}>
      {label && (
        <Label
          htmlFor={`input-text-${inputProps.name}-${uniqId}`}
          isEmpty={!value && !isFocused}
          dimension={dimension}
          onClick={() => currentRef?.current?.focus()}>
          {label}
        </Label>
      )}
      {placeholder && (value?.length <= 0 || !value) && (
        <Placeholder
          isFocused={isFocused}
          dimension={dimension}
          onClick={() => currentRef?.current?.focus()}>
          {placeholder}
        </Placeholder>
      )}
      <InputStyled
        id={`input-text-${inputProps.name}-${uniqId}`}
        ref={currentRef}
        type={type}
        kind={kind}
        value={value}
        {...inputProps}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        disabled={disabled}
        dimension={dimension}
        iconWrapperWidth={iconWrapperWidth}
        textAlign={textAlign}
        fontSizeInherit={fontSizeInherit}
        fontWeight={fontWeight}
        markError={markError}
      />
      <IconWrapper kind={kind} ref={iconWrapperRefCallback} dimension={dimension}>
        {Icon && <Icon />}
      </IconWrapper>
      <StatusBar kind={kind} markError={markError} isFocused={isFocused} />
      <Error isOpen={isOpenError} openerElement={componentElement}>
        {error}
      </Error>
    </ComponentWrapper>
  );
});
