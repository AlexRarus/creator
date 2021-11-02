import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';
import { COLORS } from 'src/components/theme';

export const RippleStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  overflow: hidden;
`;

const getGrowAnimation = ({ top, right, bottom, left, maxCoordinate }: any) => keyframes`
  0% {
    top: ${top}px;
    right: ${right}px;
    bottom: ${bottom}px;
    left: ${left}px;
    border-radius: 50%;
  }
  90% {
    border-radius: 50%;
  }
  100% {
    top: ${top - maxCoordinate}px;
    right: ${right - maxCoordinate}px;
    bottom: ${bottom - maxCoordinate}px;
    left: ${left - maxCoordinate}px;
    border-radius: 0;
  }
`;

export const ReplyStyled = styled.div<{
  top: number;
  right: number;
  bottom: number;
  left: number;
  maxCoordinate: number;
  isRemoving: boolean;
  light: boolean;
}>`
  background: ${({ light }) => rgba(light ? COLORS.white : COLORS.black, 0.3)};
  position: absolute;
  top: ${({ top }) => top}px;
  right: ${({ right }) => right}px;
  bottom: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
  opacity: ${({ isRemoving }) => (isRemoving ? 0 : 1)};
  transition: opacity 400ms;
  animation: 300ms ${getGrowAnimation} ease-out forwards;
`;
