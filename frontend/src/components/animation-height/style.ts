import styled from 'styled-components';
import { defaultTheme } from 'src/components/theme';

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
  opacity: ${({ initialized }) => (initialized ? 1 : 0)};
  position: ${({ initialized }) => (initialized ? 'static' : 'absolute')};
  overflow: hidden;

  & & {
    position: static;
  }
`;
AnimationHeightWrapper.defaultProps = {
  theme: defaultTheme,
};
