import React, { useState, useEffect, MouseEvent } from 'react';

import { IProps, IAction } from './interfaces';
import { ActionsBackPlate, ActionsWrapper, ActionsList, CancelActionWrapper } from './style';
import { MobileActionButton } from './mobile-action-button';

const ANIMATION_TIME = 200;
const cancelAction: IAction = {
  id: 'cancel',
  label: 'Отмена',
};

export function MobileActionsComponent(props: IProps) {
  const { onClose, actions, onActionClick, zIndex } = props;
  const [isMounted, setMounted] = useState(false);
  const [animation, setAnimation] = useState<'open' | 'close'>('open');
  const [actionsWrapperHeight, setActionsWrapperHeight] = useState<number>(0);
  const [actionsWrapperElement, actionsWrapperRefCallback] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (actionsWrapperElement) {
      setActionsWrapperHeight(actionsWrapperElement.getBoundingClientRect().height);
    }
  }, [actionsWrapperElement]);

  useEffect(() => {
    if (animation === 'close') {
      setTimeout(onClose, ANIMATION_TIME);
    }
  }, [animation]);

  const closeModal = (e: MouseEvent) => {
    if (!e.isDefaultPrevented()) {
      setAnimation('close');
    }
  };

  const actionClickHandler = (action: IAction) => () => {
    onActionClick && onActionClick(action);
  };

  return (
    <ActionsBackPlate zIndex={zIndex} isMounted={isMounted} onClick={closeModal}>
      <ActionsWrapper
        ref={actionsWrapperRefCallback}
        className={props.className || ''}
        actionsWrapperHeight={actionsWrapperHeight}
        animationTime={ANIMATION_TIME}
        animation={animation}
        onClick={(e: MouseEvent) => e.preventDefault()}>
        <>
          <ActionsList>
            {actions?.map((action: IAction) => (
              <MobileActionButton
                key={action.id}
                action={action}
                onClick={actionClickHandler(action)}
              />
            ))}
          </ActionsList>
          <CancelActionWrapper>
            <MobileActionButton action={cancelAction} onClick={onClose} />
          </CancelActionWrapper>
        </>
      </ActionsWrapper>
    </ActionsBackPlate>
  );
}
