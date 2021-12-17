import styled from 'styled-components';

interface IAnimationProps {
  height: number | null;
  initialized: boolean;
  time: number;
}

export const AnimationHeightWrapper = styled.div<IAnimationProps>`
  display: flex;
  flex-direction: column;
  transition: height ${({ time }) => time}ms;
  height: ${({ height }) => (height === null ? 'auto' : `${height}px`)};
  width: 100%;
  opacity: ${({ initialized }) => (initialized ? 1 : 0)};
  position: ${({ initialized }) => (initialized ? 'static' : 'absolute')};
  overflow: hidden;

  & & {
    position: static;
  }
`;
