import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const HorizontalSlideElement = styled.div.attrs(
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
      transform: `translateX(${state ? direction * value : 0}px)`,
      ...transitionEndStyle,
    },
  })
)<IProps & ICommonAnimationProps>``;
