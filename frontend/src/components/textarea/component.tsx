import React, { useEffect, useState } from 'react';

import { Error, StatusBar, Label } from '../input-components';

import { IProps } from './interfaces';
import { TextareaWrapper, TextareaComponent, TextareaElementAutoresize } from './style';

export const Textarea = React.forwardRef((props: IProps, ref: any) => {
  const {
    label = '',
    error = '',
    dimension = 'l',
    disabled = false,
    value = '',
    ...textareaProps
  } = props;
  const [componentElement, componentRefCallback] = useState<HTMLElement | null>(null);
  const [isFocused, setFocused] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [markError, setMarkError] = useState(Boolean(error));
  const [uniqId] = useState(Math.random().toString());

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
        >
          {label}
        </Label>
      )}
      <TextareaComponent disabled={disabled} error={error} isFocused={isFocused} ref={ref}>
        <TextareaElementAutoresize
          id={`textarea-${textareaProps.name}-${uniqId}`}
          value={value || ''}
          {...textareaProps}
          onFocus={focusHandler}
          onBlur={blurHandler}
          disabled={disabled}
        />
      </TextareaComponent>
      <StatusBar markError={markError} isFocused={isFocused} />
      <Error isOpen={isOpenError} openerElement={componentElement}>
        {error}
      </Error>
    </TextareaWrapper>
  );
});
