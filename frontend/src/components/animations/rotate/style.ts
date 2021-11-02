import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const RotateElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle = {},
    duration,
    delay,
    animateFunction = 'ease',
    rotateStart = 0,
    rotateEnd = 360,
  }: IProps & ICommonAnimationProps) => ({
    style: {
      transition: `${duration}ms ${animateFunction} ${delay}ms`,
      transform: `rotate(${state ? rotateStart : rotateEnd}deg)`,
      ...transitionEndStyle,
    },
  })
)<IProps & ICommonAnimationProps>``;
