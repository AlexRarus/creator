import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { isMobile } from 'react-device-detect';

export const MOBILE_VALUE_PADDING_Y = 15;
export const MOBILE_VALUE_PADDING_X = 30;
export const VALUE_SIZE = 16;

export const MarkMin = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 12px;
  transition: opacity 200ms ease-out;
`;

export const MarkMax = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  transition: opacity 200ms ease-out;
`;

export const InputRangeWrapper = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
`;

export const InnerLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  line-height: 13px;
  color: ${COLORS.grey[500]};
`;

export const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 36px;
`;

const getJustifyContent = (props: { stepsLength: number; currentStep: number }) => {
  const { stepsLength, currentStep } = props;
  const position = (currentStep / stepsLength) * 100;
  if (position < 25) {
    return 'flex-start';
  } else if (position > 75) {
    return 'flex-end';
  }

  return 'center';
};

const getLeftPosition = (props: { stepsLength: number; currentStep: number }) => {
  const { stepsLength, currentStep } = props;
  const percent = (currentStep / stepsLength) * 100;
  let shift = isMobile ? MOBILE_VALUE_PADDING_X : 0;

  if (percent === 100) {
    shift = VALUE_SIZE + shift;
  } else if (percent !== 0) {
    shift = VALUE_SIZE / 2 + shift;
  }

  return `calc(${percent}% - ${shift}px)`;
};

export const Value = styled.div<{ stepsLength: number; currentStep: number }>`
  display: flex;
  justify-content: ${getJustifyContent};
  position: absolute;
  left: ${getLeftPosition};
  height: ${VALUE_SIZE + (isMobile ? MOBILE_VALUE_PADDING_Y * 2 : 0)}px;
  width: ${VALUE_SIZE + (isMobile ? MOBILE_VALUE_PADDING_X * 2 : 0)}px;
  background: transparent;
  border-radius: 50%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  :after {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -${VALUE_SIZE / 2}px;
    margin-left: -${VALUE_SIZE / 2}px;
    display: block;
    content: ' ';
    background: ${COLORS.blue[400]};
    height: ${VALUE_SIZE}px;
    width: ${VALUE_SIZE}px;
    border-radius: 50%;
  }
`;

export const ValueLabel = styled.div`
  position: absolute;
  top: -${14 - (isMobile ? MOBILE_VALUE_PADDING_Y : 0)}px;
  font-size: 12px;
  line-height: 16px;
`;

export const Line = styled.div<{ stepsLength: number; currentStep: number }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    to right,
    ${COLORS.blue[400]} 0%,
    ${COLORS.blue[400]} ${({ stepsLength, currentStep }) => (currentStep / stepsLength) * 100}%,
    ${COLORS.grey[400]} ${({ stepsLength, currentStep }) => (currentStep / stepsLength) * 100}%
  );
  cursor: pointer;
`;
