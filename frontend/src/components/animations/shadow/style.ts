import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const ShadowElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle = {},
    duration,
    delay,
    animateFunction = 'ease',
    shadowStart = '0px 0px 0px 0px rgba(0, 0, 0, 0.25)',
    shadowEnd = '0px 4px 4px 2px rgba(0, 0, 0, 0.25)',
    borderRadius = 0,
  }: IProps & ICommonAnimationProps) => ({
    style: {
      transition: `${duration}ms ${animateFunction} ${delay}ms`,
      boxShadow: state ? shadowEnd : shadowStart,
      borderRadius: `${borderRadius}px`,
      ...transitionEndStyle,
    },
  })
)<IProps & ICommonAnimationProps>``;
