import styled, { keyframes } from 'styled-components';
import { LIGHT_THEME } from 'src/components/theme';

import { getLoaderColor, ILoaderProps } from '../utils';

const ring = () => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const RingLoaderWrapper = styled.div<ILoaderProps>`
  display: inline-block;
  position: relative;
  width: ${({ size }: ILoaderProps) => size}px;
  height: ${({ size }: ILoaderProps) => size}px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }: ILoaderProps) => size - 2}px;
    height: ${({ size }: ILoaderProps) => size - 2}px;
    margin: 1px;
    border-radius: 50%;
    animation: ${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: ${({ size }: ILoaderProps) => Math.max(size / 10, 3)}px solid ${getLoaderColor};
    border-color: ${getLoaderColor} transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
RingLoaderWrapper.defaultProps = {
  theme: LIGHT_THEME,
};
