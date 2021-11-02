import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const DiagonalSlideElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle = {},
    duration,
    delay,
    animateFunction = 'linear',
    value,
    direction = 1,
  }: IProps & ICommonAnimationProps) => ({
    style: {
      transition: `${duration}ms ${animateFunction} ${delay}ms`,
      transform: `translate(${state ? direction * value : 0}px, ${
        state ? direction * value : 0
      }px)`,
      ...transitionEndStyle,
    },
  })
)<IProps & ICommonAnimationProps>``;
