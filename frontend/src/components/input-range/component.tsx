import React, { useState, useEffect, useCallback } from 'react';
import { COLORS } from 'src/components/theme';
import { isMobile } from 'react-device-detect';

import {
  InputRangeWrapper,
  InnerLabel,
  LineWrapper,
  MarkMin,
  MarkMax,
  Line,
  Value,
  ValueLabel,
  VALUE_SIZE,
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
    ...inputProps
  } = props;
  const [inputRangeElement, inputRangeRefCallback] = useState<HTMLLabelElement | null>(null);
  const [valueElement, valueRefCallback] = useState<HTMLDivElement | null>(null);
  const [lineElement, lineRefCallback] = useState<HTMLDivElement | null>(null);
  const [inputRangeMetrics, setInputRangeMetrics] = useState<any>(null);
  const [diffValues] = useState(Math.abs(max - min));
  const [stepsLength] = useState(Math.round(Math.abs(diffValues / step)));
  const [currentStep, setCurrentStep] = useState(Math.abs(min - value) / Math.abs(step));
  const [stepPxValue, setStepPxValue] = useState(0); // колличество пикселей в одном шаге

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

  useEffect(() => {
    // при изменении текущего шага, вызываем onChange
    inputProps.onChange && inputProps.onChange(min + currentStep * step);
  }, [currentStep]);

  const onMouseMove = useCallback(
    (e: any) => {
      // dnd
      if (inputRangeMetrics && valueElement && lineElement) {
        // выставляем в нужную позицию курсор
        const offsetXMax = Math.min(e.clientX - inputRangeMetrics.x, inputRangeMetrics.width); // расстояние от левого края инпута
        const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
        const left = Math.max(
          0,
          Math.min(offsetX - VALUE_SIZE / 2, inputRangeMetrics.width - VALUE_SIZE)
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
    if (inputRangeMetrics && valueElement && lineElement) {
      const offsetXMax = Math.min(e.clientX - inputRangeMetrics.x, inputRangeMetrics.width); // расстояние от левого края инпута
      const offsetX = Math.max(0, offsetXMax); // расстояние от левого края инпута
      const left = Math.max(
        0,
        Math.min(offsetX - VALUE_SIZE / 2, inputRangeMetrics.width - VALUE_SIZE)
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
    if (inputRangeMetrics && valueElement && lineElement) {
      const offsetXMax = Math.min(e.clientX - inputRangeMetrics.x, inputRangeMetrics.width); // расстояние от левого края инпута
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
  };

  const onMouseLeave = (e: any) => {
    // end dnd
    if (inputRangeElement) {
      if (isMobile) {
        inputRangeElement.removeEventListener('touchmove', onMouseMove);
      } else {
        inputRangeElement.removeEventListener('mousemove', onMouseMove);
      }
    }
  };

  return (
    <InputRangeWrapper
      ref={inputRangeRefCallback}
      onMouseDown={isMobile ? undefined : onMouseDown}
      onTouchStart={isMobile ? onMouseDown : undefined}
      onMouseUp={isMobile ? undefined : onMouseUp}
      onTouchEnd={isMobile ? onMouseUp : undefined}
      onMouseLeave={isMobile ? undefined : onMouseLeave}>
      {(isFakeLabel || label) && <InnerLabel>{isFakeLabel ? ' ' : label}</InnerLabel>}
      <input type='hidden' value={value} {...inputProps} />
      <LineWrapper>
        <Line stepsLength={stepsLength} currentStep={currentStep} ref={lineRefCallback}>
          <Value stepsLength={stepsLength} currentStep={currentStep} ref={valueRefCallback}>
            <ValueLabel>{valueLabel || value}</ValueLabel>
          </Value>
        </Line>
        <MarkMin>{minValueLabel || min}</MarkMin>
        <MarkMax>{maxValueLabel || max}</MarkMax>
      </LineWrapper>
    </InputRangeWrapper>
  );
};
