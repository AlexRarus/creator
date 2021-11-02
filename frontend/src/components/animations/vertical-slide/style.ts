import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';

import { IProps } from './interfaces';

export const VerticalSlideElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle = {},
    duration,
    delay,
    animateFunction = 'linear',
    value,
    direction = 1,
    isFixed = false,
    fixedTop = 0,
  }: IProps & ICommonAnimationProps) => {
    const style = {
      transition: `${duration}ms ${animateFunction} ${delay}ms`,
      ...transitionEndStyle,
    };

    if (isFixed) {
      style.top = `${state ? direction * value : fixedTop}px`;
    } else {
      style.transform = `translateY(${state ? direction * value : 0}px)`;
    }

    return {
      style,
    };
  }
)<IProps & ICommonAnimationProps>``;
