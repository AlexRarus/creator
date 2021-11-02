import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const AppearElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle,
    duration,
    delay,
    animateFunction = 'cubic-bezier(.3, 2, 1, 1)',
    scale = 0.85,
  }: IProps & ICommonAnimationProps) => ({
    style: {
      transition: `all ${duration}ms ${animateFunction} ${delay}ms`,
      transform: `scale(${state ? 1 : scale})`,
      opacity: state ? 1 : 0,
      ...transitionEndStyle,
    },
  })
)<IProps & ICommonAnimationProps>``;
