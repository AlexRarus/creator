import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

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
  let shift = 0;

  if (percent === 100) {
    shift = VALUE_SIZE;
  } else if (percent !== 0) {
    shift = VALUE_SIZE / 2;
  }

  return `calc(${percent}% - ${shift}px)`;
};

export const Value = styled.div<{ stepsLength: number; currentStep: number }>`
  display: flex;
  justify-content: ${getJustifyContent};
  position: absolute;
  left: ${getLeftPosition};
  width: ${VALUE_SIZE}px;
  height: ${VALUE_SIZE}px;
  background: ${COLORS.blue[400]};
  border-radius: 50%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const ValueLabel = styled.div`
  position: absolute;
  top: -14px;
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
