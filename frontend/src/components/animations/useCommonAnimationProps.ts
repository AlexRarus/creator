import { useCallback, useState, useEffect, SyntheticEvent } from 'react';
import { CSSObject } from 'styled-components';
import { stopPropagation } from 'src/utils/stopPropagation';

import { ICommonProps, ICommonAnimationProps } from './interfaces';
import { existsValue } from './utils';

export default function useCommonAnimationProps<T extends ICommonProps>(
  commonProps: T
): T & ICommonAnimationProps {
  const {
    state: outerState,
    transitionEndStyle = {},
    onTransitionEnd: onTransitionEndOuter,
    isStopPropagation = true,
    repeat = false,
    isStartOnMount = repeat,
    duration = 500,
    durationStart,
    durationEnd,
    delay = 0,
    delayStart,
    delayEnd,
    ...otherProps
  } = commonProps;
  const [isMount, setIsMount] = useState(false);
  const [applyTransitionEndStyle, setApplyTransitionEndStyle] = useState(false);
  const [innerState, setInnerState] = useState<boolean>(outerState);

  //state
  const targetState: boolean = repeat ? innerState : outerState;
  const resultState: boolean = isStartOnMount ? isMount && targetState : targetState;

  // duration
  const [resultDurationStart, resultDurationEnd] = existsValue(
    duration,
    durationStart,
    durationEnd
  );
  const resultDuration: number = resultState ? resultDurationStart : resultDurationEnd;

  // delay
  const [resultDelayStart, resultDelayEnd] = existsValue(delay, delayStart, delayEnd);
  const resultDelay: number = resultState ? resultDelayStart : resultDelayEnd;

  useEffect(() => {
    if (!isMount) {
      setIsMount(true);
    }
  }, []);

  const onTransitionEnd = useCallback(
    (event: SyntheticEvent) => {
      if (isStopPropagation) {
        stopPropagation(event);
      }
      if (transitionEndStyle) {
        setApplyTransitionEndStyle(resultState);
      }
      if (repeat) {
        setInnerState(!innerState);
      }
      if (onTransitionEndOuter) {
        onTransitionEndOuter(event, resultState);
      }
    },
    [transitionEndStyle, resultState]
  );
  const style: CSSObject = applyTransitionEndStyle ? transitionEndStyle : ({} as CSSObject);

  return {
    state: resultState,
    transitionEndStyle: style,
    onTransitionEnd,
    duration: resultDuration || 1, // минимум 1 для того чтобы вызывался обработчик onTransitionEnd
    delay: resultDelay,
    ...otherProps,
  } as T & ICommonAnimationProps;
}
