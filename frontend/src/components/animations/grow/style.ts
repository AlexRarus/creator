import styled from 'styled-components';

import { ICommonAnimationProps } from '../interfaces';
import { existsValue } from '../utils';

import { IProps } from './interfaces';

export const GrowElement = styled.div.attrs(
  ({
    state,
    transitionEndStyle = {},
    duration,
    delay,
    animateFunction = 'cubic-bezier(.3, 1.5, 1, 1)',
    scaleStart = 0,
    scaleEnd = 1,
    scaleStartX,
    scaleStartY,
    scaleEndX,
    scaleEndY,
  }: IProps & ICommonAnimationProps) => {
    const [preparedScaleStartX, preparedScaleStartY] = existsValue(
      scaleStart,
      scaleStartX,
      scaleStartY
    );
    const [preparedScaleEndX, preparedScaleEndY] = existsValue(scaleEnd, scaleEndX, scaleEndY);

    return {
      style: {
        transition: `${duration}ms ${animateFunction} ${delay}ms`,
        transform: `scaleX(${state ? preparedScaleEndX : preparedScaleStartX}) scaleY(${
          state ? preparedScaleEndY : preparedScaleStartY
        })`,
        ...transitionEndStyle,
      },
    };
  }
)<IProps & ICommonAnimationProps>``;
