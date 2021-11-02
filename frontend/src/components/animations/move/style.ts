import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const MoveElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle = {},
    duration,
    delay,
    animateFunction = 'ease',
    top = 0,
    left = 0,
  }: IProps & ICommonAnimationProps) => ({
    style: {
      transition: `${duration}ms ${animateFunction} ${delay}ms`,
      transform: `translateX(${state ? left : 0}px) translateY(${state ? top : 0}px)`,
      ...transitionEndStyle,
    },
  })
)<IProps & ICommonAnimationProps>``;
