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
  ValueLine,
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
    value,
    withInput = false,
    inputWidth = 25,
    toFixed = 1,
    ...inputProps
  } = props;
  const [inputRangeElement, inputRangeRefCallback] = useState<HTMLLabelElement | null>(null);
  const [valueElement, valueRefCallback] = useState<HTMLDivElement | null>(null);
  const [lineElement, lineRefCallback] = useState<HTMLDivElement | null>(null);
  const [lineMetrics, setLineMetrics] = useState<any>(null);
  const [diffValues, setDiffValues] = useState(Math.abs(max - min));
  const [stepsCount, setStepsCount] = useState(Math.round(Math.abs(diffValues / step)));
  const [isNegativeDirection, setIsNegativeDirection] = useState(min > max);
  const parsedValue = isNaN(parseFloat(value)) ? min : parseFloat(value);
  const [currentStep, setCurrentStep] = useState(
    Math.max(0, (isNegativeDirection ? min - parsedValue : parsedValue - min) / Math.abs(step))
  );
  const [stepPxValue, setStepPxValue] = useState(0); // колличество пикселей в одном шаге
  const [isFocusInput, setIsFocusInput] = useState(false);
  const [isFocusRange, setIsFocusRange] = useState(false);
  const [isDnD, setIsDnD] = useState(false);

  useEffect(() => {
    const newDiffValues = Math.abs(max - min);
    setDiffValues(newDiffValues);
    setStepsCount(Math.round(Math.abs(newDiffValues / step)));
    setIsNegativeDirection(min > max);
  }, [min, max]);

  useEffect(() => {
    // при изменении текущего шага, вызываем onChange
    const calculatedValue = min + currentStep * step;
    if (!isFocusInput && calculatedValue !== parsedValue) {
      inputProps.onChange && inputProps.onChange(calculatedValue);
    }
  }, [isFocusInput, currentStep]);

  useEffect(() => {
    // меняем текущий шаг при изменеии value
    if (!isFocusRange && value !== '-') {
      const calculatedStep = Math.round(
        Math.max(0, (isNegativeDirection ? min - parsedValue : parsedValue - min) / Math.abs(step))
      );
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
    if (lineElement) {
      setLineMetrics(lineElement.getBoundingClientRect());
    }
  }, [lineElement]);

  useEffect(() => {
    if (lineMetrics) {
      // вычисляем размер одного шага в пикселях
      setStepPxValue(lineMetrics.width / stepsCount);
    }
  }, [lineMetrics]);

  const onMouseMove = useCallback(
    (e: any) => {
      // dnd
      if (lineMetrics && valueElement && lineElement) {
        // выставляем в нужную позицию курсор
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const offsetXMax = Math.min(clientX - lineMetrics.x, lineMetrics.width); // расстояние от левого края инпута
        const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
        const shift = isMobile ? MOBILE_VALUE_PADDING_X : 0;
        const left = Math.max(
          -(shift + VALUE_SIZE / 2),
          Math.min(offsetX - VALUE_SIZE / 2 - shift, lineMetrics.width - shift)
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
    [lineMetrics, stepPxValue]
  );

  const onMouseDown = (e: any) => {
    // start dnd
    setIsDnD(true);
    if (lineMetrics && valueElement && lineElement) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const offsetXMax = Math.min(clientX - lineMetrics.x, lineMetrics.width); // расстояние от левого края инпута
      const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
      const shift = isMobile ? MOBILE_VALUE_PADDING_X : 0;
      const left = Math.max(
        -(shift + VALUE_SIZE / 2),
        Math.min(offsetX - VALUE_SIZE / 2 - shift, lineMetrics.width - shift)
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
      if (lineMetrics && valueElement && lineElement) {
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const offsetXMax = Math.min(clientX - lineMetrics.x, lineMetrics.width); // расстояние от левого края инпута
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
      if (lineMetrics && valueElement && lineElement) {
        const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const offsetXMax = Math.min(clientX - lineMetrics.x, lineMetrics.width); // расстояние от левого края инпута
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
      const resultValue = isNaN(parseFloat(value as any))
        ? value
        : `${Math.min(max, parseFloat(value))}`;
      inputProps.onChange(resultValue);
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
      const calculatedStep = Math.round(
        Math.max(0, (isNegativeDirection ? min - resultValue : resultValue - min) / Math.abs(step))
      );
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
          <Line stepsCount={stepsCount} currentStep={currentStep}>
            <ValueLine stepsCount={stepsCount} currentStep={currentStep} ref={lineRefCallback}>
              <Value
                stepsCount={stepsCount}
                currentStep={currentStep}
                ref={valueRefCallback}
                onTouchStart={isMobile ? onMouseDown : undefined}
                onTouchEnd={isMobile ? onMouseUp : undefined}>
                <ValueLabel>{valueLabel || value}</ValueLabel>
              </Value>
            </ValueLine>
          </Line>
          <MarkMin>{minValueLabel || min}</MarkMin>
          <MarkMax>{maxValueLabel || max}</MarkMax>
        </LineWrapper>
      </InputRangeWrapper>
    </RangeComponentWrapper>
  );
};
