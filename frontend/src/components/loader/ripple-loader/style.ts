import styled, { keyframes } from 'styled-components';
import { LIGHT_THEME } from 'src/components/theme';

import { getLoaderColor, ILoaderProps } from '../utils';

const ripple = ({ size }: ILoaderProps) => keyframes`
  0% {
    top: ${size / 2}px;
    left: ${size / 2}px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0;
    left: 0;
    width: ${size}px;
    height: ${size}px;
    opacity: 0;
  }
`;

export const RippleLoaderWrapper = styled.div<ILoaderProps>`
  display: inline-block;
  position: relative;
  width: ${({ size }: ILoaderProps) => size}px;
  height: ${({ size }: ILoaderProps) => size}px;

  div {
    position: absolute;
    border: 4px solid ${getLoaderColor};
    opacity: 1;
    border-radius: 50%;
    animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;
RippleLoaderWrapper.defaultProps = {
  theme: LIGHT_THEME,
};
