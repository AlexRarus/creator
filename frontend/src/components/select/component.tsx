import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import ReactSelect, { components } from 'react-select';

import { Error, StatusBar, Label } from '../input-components';

import { WrapperCRS } from './style';
import { IProps } from './interfaces';

export type { OptionsType } from 'react-select';

export const Select = React.forwardRef((props: IProps, ref: any) => {
  const {
    label,
    debounceTime,
    onInputChange,
    placeholder = '',
    minMenuHeight = 150,
    maxMenuHeight = 300,
    dimension = 'l',
    menuIsOpen,
    options,
    error = '',
    value = '',
    isMulti = false,
    ...inputProps
  } = props;
  const [componentElement, componentRefCallback] = useState<HTMLElement | null>(null);

  const [isFocusedSelect, setFocusedSelect] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [markError, setMarkError] = useState(Boolean(error));
  const [uniqId] = useState(Math.random().toString());

  useEffect(() => {
    setMarkError(!isFocusedSelect && Boolean(error));
    setIsOpenError(isFocusedSelect && Boolean(error));
  }, [isFocusedSelect, error]);

  const inputChangeHandler = (value: string, config?: any) => {
    if (!config || config.action === 'input-change') {
      onInputChange && onInputChange(value);
    }
  };
  const handleSearchInput = useCallback(
    debounce((value: string) => {
      inputChangeHandler(value);
    }, debounceTime),
    []
  );

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    inputProps.onFocus && inputProps.onFocus(event);
    setFocusedSelect(true);
    inputChangeHandler('');
  };

  const handleBlur = () => {
    inputProps.onBlur && inputProps.onBlur();
    setFocusedSelect(false);
  };

  const handleChange = (selectValue: any, config?: any) => {
    if (['clear', 'remove-value', 'select-option'].includes(config?.action)) {
      const isMulti = Array.isArray(selectValue);
      inputProps.onChange && inputProps.onChange(selectValue);
      if (!isMulti && componentElement) {
        componentElement.querySelector('input')?.blur();
      }
    }
  };

  const setFocus = () => {
    if (!isFocusedSelect && componentElement) {
      componentElement.querySelector('input')?.focus();
    }
  };
  const hasValue = isMulti ? Boolean(value && value.length) : Boolean(value);

  return (
    <WrapperCRS dimension={dimension} ref={componentRefCallback}>
      {label && (
        <Label
          htmlFor={`select-${inputProps.name}-${uniqId}`}
          isEmpty={!hasValue && !isFocusedSelect}
          dimension={dimension}
          onClick={setFocus}>
          {label}
        </Label>
      )}
      <ReactSelect
        components={{
          LoadingIndicator,
        }}
        inputId={inputProps.name}
        classNamePrefix='CRS' /* CRS - custom react-select */
        options={options}
        {...inputProps}
        value={value}
        placeholder={placeholder}
        isSearchable={true}
        noOptionsMessage={() => ''}
        minMenuHeight={minMenuHeight}
        maxMenuHeight={maxMenuHeight}
        onInputChange={debounceTime ? handleSearchInput : inputChangeHandler}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        isLoading={props.isLoading}
        menuIsOpen={
          menuIsOpen != undefined ? Boolean(isFocusedSelect && menuIsOpen) : isFocusedSelect
        }
        isMulti={isMulti}
        innerRef={ref}
      />
      <StatusBar markError={markError} isFocused={isFocusedSelect} />
      <Error isOpen={isOpenError} openerElement={componentElement}>
        {error}
      </Error>
    </WrapperCRS>
  );
});

const LoadingIndicator = ({ children, ...rest }: any) => (
  <components.LoadingIndicator {...rest}>...</components.LoadingIndicator>
);
