import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { isMobile } from 'react-device-detect';

export const MOBILE_VALUE_PADDING_Y = 15;
export const MOBILE_VALUE_PADDING_X = 32;
export const VALUE_SIZE = 16;

export const MarkMin = styled.div`
  position: absolute;
  left: 0;
  bottom: -2px;
  font-size: 12px;
  transition: opacity 200ms ease-out;
`;

export const MarkMax = styled.div`
  position: absolute;
  right: 0;
  bottom: -2px;
  font-size: 12px;
  transition: opacity 200ms ease-out;
`;

export const RangeComponentWrapper = styled.div<{ withInput: boolean; inputWidth: number }>`
  width: 100%;
  display: grid;
  column-gap: ${({ withInput }) => (withInput ? '10px' : 0)};
  grid-template: 'input-text range' auto / ${({ withInput, inputWidth }) =>
      withInput ? `${inputWidth}%` : '0%'} 1fr;
`;

export const InputTextWrapper = styled.div`
  grid-area: input-text;
`;

export const InputRangeWrapper = styled.label`
  grid-area: range;
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
  min-height: 13px;
  color: ${COLORS.grey[500]};
`;

export const LineWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 36px;
  overflow: hidden;
  padding-top: 1px;
`;

const getJustifyContent = (props: { stepsCount: number; currentStep: number }) => {
  const { stepsCount, currentStep } = props;
  const position = (currentStep / stepsCount) * 100;
  if (position < 25) {
    return 'flex-start';
  } else if (position > 75) {
    return 'flex-end';
  }

  return 'center';
};

const getPadding = () => {
  return isMobile ? `${MOBILE_VALUE_PADDING_Y}px ${MOBILE_VALUE_PADDING_X}px` : 0;
};

const getLeftPosition = (props: { stepsCount: number; currentStep: number }) => {
  const { stepsCount, currentStep } = props;
  const percent = (currentStep / stepsCount) * 100;
  const shift = isMobile ? MOBILE_VALUE_PADDING_X : 0;

  // if (percent > 95) {
  //   shift = VALUE_SIZE + shift;
  // } else if (percent > 5) {
  //   shift = VALUE_SIZE / 2 + shift;
  // }

  return `calc(${percent}% - ${shift + VALUE_SIZE / 2}px)`;
};

export const Value = styled.div<{ stepsCount: number; currentStep: number }>`
  display: flex;
  justify-content: ${getJustifyContent};
  position: absolute;
  left: ${getLeftPosition};
  height: ${VALUE_SIZE + (isMobile ? MOBILE_VALUE_PADDING_Y * 2 : 0)}px;
  width: ${VALUE_SIZE + (isMobile ? MOBILE_VALUE_PADDING_X * 2 : 0)}px;
  padding: ${getPadding};
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
  top: ${-14 + (isMobile ? MOBILE_VALUE_PADDING_Y : 0)}px;
  font-size: 12px;
  line-height: 16px;
`;

export const Line = styled.div<{ stepsCount: number; currentStep: number }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    ${COLORS.blue[400]} 0%,
    ${COLORS.blue[400]} ${({ stepsCount, currentStep }) => (currentStep / stepsCount) * 100}%,
    ${COLORS.grey[400]} ${({ stepsCount, currentStep }) => (currentStep / stepsCount) * 100}%
  );
  cursor: pointer;
`;

export const ValueLine = styled.div<{ stepsCount: number; currentStep: number }>`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 ${VALUE_SIZE / 2}px;
  width: calc(100% - ${VALUE_SIZE}px);
  height: 3px;
  cursor: pointer;
`;
