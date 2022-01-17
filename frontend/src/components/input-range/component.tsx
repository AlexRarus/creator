import React, { useState, useEffect, useCallback } from 'react';
import { COLORS } from 'src/components/theme';
import { isMobile } from 'react-device-detect';
import InputText from 'src/components/input-text';

import {
  RangeComponentWrapper,
  InputTextWrapper,
  InputRangeWrapper,
  InnerLabel,
  LineWrapper,
  MarkMin,
  MarkMax,
  Line,
  Value,
  ValueLabel,
  VALUE_SIZE,
  MOBILE_VALUE_PADDING_X,
} from './style';

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
  withInput?: boolean;
  inputWidth?: number; // ширина текстового инпута в процентах относительно всего компонента (по дефолту 25%)
  toFixed?: number; // до скольки знаков после запятой округлять
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
    value = 0,
    withInput = false,
    inputWidth = 25,
    toFixed = 1,
    ...inputProps
  } = props;
  const [inputRangeElement, inputRangeRefCallback] = useState<HTMLLabelElement | null>(null);
  const [valueElement, valueRefCallback] = useState<HTMLDivElement | null>(null);
  const [lineElement, lineRefCallback] = useState<HTMLDivElement | null>(null);
  const [inputRangeMetrics, setInputRangeMetrics] = useState<any>(null);
  const [diffValues, setDiffValues] = useState(Math.abs(max - min));
  const [stepsLength, setStepsLength] = useState(Math.round(Math.abs(diffValues / step)));
  const [currentStep, setCurrentStep] = useState(Math.abs(min - value) / Math.abs(step));
  const [stepPxValue, setStepPxValue] = useState(0); // колличество пикселей в одном шаге
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isFocusRange, setIsFocusRange] = useState(false);
  const [isDnD, setIsDnD] = useState(false);

  useEffect(() => {
    const newDiffValues = Math.abs(max - min);
    setDiffValues(newDiffValues);
    setStepsLength(Math.round(Math.abs(newDiffValues / step)));
  }, [min, max]);

  useEffect(() => {
    // при изменении текущего шага, вызываем onChange
    const calculatedValue = min + currentStep * step;
    if (!isFocusInput && calculatedValue !== value) {
      inputProps.onChange && inputProps.onChange(calculatedValue);
    }
  }, [isFocusInput, currentStep]);

  useEffect(() => {
    // меняем текущий шаг при изменеии value
    if (!isFocusRange && value !== '-') {
      const calculatedStep = Math.round(Math.abs(min - value) / Math.abs(step));
      if (calculatedStep !== currentStep) {
        setCurrentStep(calculatedStep);
      }
    }
  }, [isFocusRange, value]);

  useEffect(() => {
    setIsFocusRange(isDnD);
  }, [isDnD]);

  useEffect(() => {
    // запоминаем размеры компонента
    if (inputRangeElement) {
      setInputRangeMetrics(inputRangeElement.getBoundingClientRect());
    }
  }, [inputRangeElement]);

  useEffect(() => {
    if (inputRangeMetrics) {
      // вычисляем размер одного шага в пикселях
      setStepPxValue(inputRangeMetrics.width / stepsLength);
    }
  }, [inputRangeMetrics]);

  const onMouseMove = useCallback(
    (e: any) => {
      // dnd
      if (inputRangeMetrics && valueElement && lineElement) {
        // выставляем в нужную позицию курсор
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const offsetXMax = Math.min(clientX - inputRangeMetrics.x, inputRangeMetrics.width); // расстояние от левого края инпута
        const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
        const shift = isMobile ? MOBILE_VALUE_PADDING_X : 0;
        const left = Math.max(
          -shift,
          Math.min(offsetX - VALUE_SIZE / 2 - shift, inputRangeMetrics.width - VALUE_SIZE - shift)
        );
        valueElement.setAttribute('style', `left: ${left}px`);

        // красим линию до нужного момента
        lineElement.setAttribute(
          'style',
          `background: linear-gradient(to right, ${COLORS.blue[400]} ${offsetX}px, ${COLORS.grey[400]} ${offsetX}px)`
        );
        // вычисляем текущий степ
        setCurrentStep(Math.round(offsetX / stepPxValue));
      }
    },
    [inputRangeMetrics, stepPxValue]
  );

  const onMouseDown = (e: any) => {
    // start dnd
    setIsDnD(true);
    if (inputRangeMetrics && valueElement && lineElement) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const offsetXMax = Math.min(clientX - inputRangeMetrics.x, inputRangeMetrics.width); // расстояние от левого края инпута
      const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
      const shift = isMobile ? MOBILE_VALUE_PADDING_X : 0;
      const left = Math.max(
        -shift,
        Math.min(offsetX - VALUE_SIZE / 2 - shift, inputRangeMetrics.width - VALUE_SIZE - shift)
      );
      // выставляем в нужную позицию курсор
      valueElement.setAttribute('style', `left: ${left}px`);
      // красим линию до нужного момента
      lineElement.setAttribute(
        'style',
        `background: linear-gradient(to right, ${COLORS.blue[400]} ${offsetX}px, ${COLORS.grey[400]} ${offsetX}px)`
      );
      // вычисляем текущий степ
      setCurrentStep(Math.round(offsetX / stepPxValue));
    }

    if (inputRangeElement) {
      if (isMobile) {
        inputRangeElement.addEventListener('touchmove', onMouseMove);
      } else {
        inputRangeElement.addEventListener('mousemove', onMouseMove);
      }
    }
  };

  const onMouseUp = (e: any) => {
    // end dnd
    if (isDnD) {
      if (inputRangeMetrics && valueElement && lineElement) {
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const offsetXMax = Math.min(clientX - inputRangeMetrics.x, inputRangeMetrics.width); // расстояние от левого края инпута
        const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
        // убираем управление позицией
        valueElement.removeAttribute('style');
        lineElement.removeAttribute('style');
        // вычисляем текущий степ
        setCurrentStep(Math.round(offsetX / stepPxValue));
      }

      if (inputRangeElement) {
        if (isMobile) {
          inputRangeElement.removeEventListener('touchmove', onMouseMove);
        } else {
          inputRangeElement.removeEventListener('mousemove', onMouseMove);
        }
      }

      setIsDnD(false);
    }
  };

  const onMouseLeave = (e: any) => {
    // end dnd
    if (isDnD) {
      if (inputRangeMetrics && valueElement && lineElement) {
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const offsetXMax = Math.min(clientX - inputRangeMetrics.x, inputRangeMetrics.width); // расстояние от левого края инпута
        const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
        // убираем управление позицией
        valueElement.removeAttribute('style');
        lineElement.removeAttribute('style');
        // вычисляем текущий степ
        setCurrentStep(Math.round(offsetX / stepPxValue));
      }

      if (inputRangeElement) {
        if (isMobile) {
          inputRangeElement.removeEventListener('touchmove', onMouseMove);
        } else {
          inputRangeElement.removeEventListener('mousemove', onMouseMove);
        }
      }

      setIsDnD(false);
    }
  };

  const onChangeInput = (value: string) => {
    const isValidValue = value === '-' || !isNaN(value as any);
    if (inputProps.onChange && isValidValue) {
      inputProps.onChange(value);
    }
  };

  const onFocusInput = () => {
    setIsFocusInput(true);
  };

  const onBlurInput = () => {
    setIsFocusInput(false);
    if (inputProps.onChange) {
      const fixedValue = parseFloat(value).toFixed(toFixed);
      const resultValue = Math.min(max, Math.max(min, parseFloat(fixedValue) || 0));
      inputProps.onChange(resultValue);
      const calculatedStep = Math.abs(min - resultValue) / Math.abs(step);
      if (calculatedStep !== currentStep) {
        setCurrentStep(calculatedStep);
      }
    }
  };

  return (
    <RangeComponentWrapper withInput={withInput} inputWidth={inputWidth}>
      {withInput && (
        <InputTextWrapper>
          <InputText
            label={label}
            value={value}
            onChange={onChangeInput}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          />
        </InputTextWrapper>
      )}
      <InputRangeWrapper
        ref={inputRangeRefCallback}
        onMouseDown={isMobile ? undefined : onMouseDown}
        onMouseUp={isMobile ? undefined : onMouseUp}
        onMouseLeave={isMobile ? undefined : onMouseLeave}>
        {(isFakeLabel || label) && (
          <InnerLabel>{isFakeLabel || withInput ? ' ' : label}</InnerLabel>
        )}
        <input type='hidden' value={value} {...inputProps} />
        <LineWrapper>
          <Line stepsLength={stepsLength} currentStep={currentStep} ref={lineRefCallback}>
            <Value
              stepsLength={stepsLength}
              currentStep={currentStep}
              ref={valueRefCallback}
              onTouchStart={isMobile ? onMouseDown : undefined}
              onTouchEnd={isMobile ? onMouseUp : undefined}>
              <ValueLabel>{valueLabel || value}</ValueLabel>
            </Value>
          </Line>
          <MarkMin>{minValueLabel || min}</MarkMin>
          <MarkMax>{maxValueLabel || max}</MarkMax>
        </LineWrapper>
      </InputRangeWrapper>
    </RangeComponentWrapper>
  );
};
