import { CSSObject } from 'styled-components';
import { ReactNode, SyntheticEvent } from 'react';

// общие пропсы для передачи в любую анимация
export interface ICommonProps {
  children: ReactNode;
  state: boolean;
  transitionEndStyle?: CSSObject;
  onTransitionEnd?(event: SyntheticEvent, state: boolean): void;
  isStopPropagation?: boolean;
  className?: string;
  duration?: number;
  durationStart?: number; // будет удалено в хуке useCommonAnimationProps преобразовывается в duration в фазе state = true
  durationEnd?: number; // будет удалено в хуке useCommonAnimationProps преобразовывается в duration в фазе state = false
  delay?: number;
  delayStart?: number; // будет удалено в хуке useCommonAnimationProps преобразовывается в delay в фазе state = true
  delayEnd?: number; // будет удалено в хуке useCommonAnimationProps преобразовывается в delay в фазе state = false
  animateFunction?: string;
  repeat?: boolean; // будет удалено в хуке useCommonAnimationProps
  isStartOnMount?: boolean; // будет удалено в хуке useCommonAnimationProps
}

// пропсы после преобразования через хук useCommonAnimationProps
export interface ICommonAnimationProps extends ICommonProps {
  onTransitionEnd(): void;
}
