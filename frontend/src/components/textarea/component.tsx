import React, { useEffect, useRef, useState } from 'react';

import { Error, StatusBar, Label, Placeholder, ErrorPreview } from '../input-components';

import { IProps } from './interfaces';
import {
  TextareaWrapper,
  TextareaComponent,
  TextareaElementAutoresize,
  PositionWrapper,
} from './style';

export const Textarea = React.forwardRef((props: IProps, ref: any) => {
  const {
    label = '',
    error = '',
    dimension = 'l',
    disabled = false,
    value = '',
    placeholder = '',
    fontSizeInherit = false,
    ...textareaProps
  } = props;
  const [componentElement, componentRefCallback] = useState<HTMLElement | null>(null);
  const [isFocused, setFocused] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [markError, setMarkError] = useState(Boolean(error));
  const [uniqId] = useState(Math.random().toString());
  const innerRef = useRef();
  const currentRef = ref || innerRef;

  useEffect(() => {
    setMarkError(!isFocused && Boolean(error));
    setIsOpenError(isFocused && Boolean(error));
  }, [isFocused, error]);

  const focusHandler = (e: any) => {
    if (textareaProps.onFocus) {
      textareaProps.onFocus(e);
    }
    setFocused(true);
  };

  const blurHandler = (e: any) => {
    if (textareaProps.onBlur) {
      textareaProps.onBlur(e);
    }
    setFocused(false);
  };

  return (
    <TextareaWrapper disabled={disabled} ref={componentRefCallback}>
      {label && (
        <Label
          htmlFor={`textarea-${textareaProps.name}-${uniqId}`}
          isEmpty={!value && !isFocused}
          dimension={dimension}
          onClick={() => currentRef?.current?.focus()}>
          {label}
        </Label>
      )}
      <PositionWrapper>
        {placeholder && (value?.length <= 0 || !value) && (
          <Placeholder
            isFocused={isFocused}
            dimension={dimension}
            onClick={() => currentRef?.current?.focus()}>
            {placeholder}
          </Placeholder>
        )}
        <TextareaComponent
          disabled={disabled}
          error={error}
          isFocused={isFocused}
          fontSizeInherit={fontSizeInherit}>
          <TextareaElementAutoresize
            id={`textarea-${textareaProps.name}-${uniqId}`}
            value={value || ''}
            {...textareaProps}
            onFocus={focusHandler}
            onBlur={blurHandler}
            disabled={disabled}
            ref={currentRef}
          />
        </TextareaComponent>
        <StatusBar markError={markError} isFocused={isFocused} />
      </PositionWrapper>
      <ErrorPreview>{error || ''}</ErrorPreview>
      <Error isOpen={isOpenError} openerElement={componentElement}>
        {error}
      </Error>
    </TextareaWrapper>
  );
});
