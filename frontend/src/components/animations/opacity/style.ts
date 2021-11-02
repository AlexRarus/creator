import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const OpacityElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle,
    duration,
    delay,
    animateFunction = 'ease',
    opacityStart = 0,
    opacityEnd = 1,
  }: IProps & ICommonAnimationProps) => ({
    style: {
      transition: `all ${duration}ms ${animateFunction} ${delay}ms`,
      opacity: state ? opacityStart : opacityEnd,
      ...transitionEndStyle,
    },
  })
)<IProps & ICommonAnimationProps>``;
