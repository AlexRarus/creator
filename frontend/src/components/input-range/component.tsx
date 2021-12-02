import React, { useState, useEffect } from 'react';

import { InputRangeWrapper, InnerLabel, Mark } from './style';

interface IProps {
  value?: any;
  onChange?(value: any): void;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  isFakeLabel?: boolean;
  minValueLabel?: string;
  maxValueLabel?: string;
  valueLabel?: string;
}

export const InputRange = (props: IProps) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    label = '',
    isFakeLabel = false,
    minValueLabel,
    maxValueLabel,
    valueLabel,
    ...inputProps
  } = props;
  const [isHideValueMark, setIsHideValueMark] = useState(true);

  useEffect(() => {
    setIsHideValueMark(false);
    const timerId = setTimeout(() => setIsHideValueMark(true), 1000);
    return () => window.clearTimeout(timerId);
  }, [inputProps.value]);

  const currentPosition = (inputProps.value - min) / (max - min);
  return (
    <InputRangeWrapper>
      {(isFakeLabel || label) && <InnerLabel>{isFakeLabel ? ' ' : label}</InnerLabel>}
      <input type='range' min={min} max={max} step={step} {...inputProps} />
      <Mark position={0} style={{ transform: 'translateX(calc(5px))' }} isHide={!isHideValueMark}>
        {minValueLabel || min}
      </Mark>
      <Mark
        position={currentPosition}
        style={{
          transform: `translateX(${
            currentPosition ? `calc(${100 * -currentPosition}% - 5px)` : '5px'
          })`,
        }}
        isHide={isHideValueMark}>
        {valueLabel || inputProps.value}
      </Mark>
      <Mark
        position={1}
        style={{ transform: 'translateX(calc(-100% - 5px))' }}
        isHide={!isHideValueMark}>
        {maxValueLabel || max}
      </Mark>
    </InputRangeWrapper>
  );
};
