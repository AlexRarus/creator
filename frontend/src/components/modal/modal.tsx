import React, { useState, useEffect, MouseEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { isMobile } from 'react-device-detect';

import { IPropsModal, ModalSize } from './interfaces';
import {
  ModalBackPlate,
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
} from './style';

const ANIMATION_TIME = 200;

export default function Modal(props: IPropsModal) {
  const {
    title,
    onClose,
    children,
    isCloseOutside = true,
    padding = '24px 32px',
    isCenter = true,
    size = ModalSize.S,
    zIndex,
  } = props;
  const [isMounted, setMounted] = useState(false);
  const [animation, setAnimation] = useState<'open' | 'close'>('open');
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [modalBackPlateHeight, setModalBackPlateHeight] = useState<number>(0);
  const [modalElement, modalRefCallback] = useState<HTMLDivElement | null>(null);
  const [headerElement, headerRefCallback] = useState<HTMLDivElement | null>(null);
  const [modalBackPlateElement, modalBackPlateRefCallback] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (modalElement && modalBackPlateElement) {
      const initHeaderHeight: number = headerElement?.getBoundingClientRect().height || 0;
      const initModalHeight: number = modalElement.getBoundingClientRect().height;
      const initModalBackPlateHeight: number = modalBackPlateElement.getBoundingClientRect().height;

      setHeaderHeight(initHeaderHeight);
      setModalHeight(initModalHeight);
      setModalBackPlateHeight(initModalBackPlateHeight);
    }
  }, [modalElement, modalBackPlateHeight]);

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

  const handleOutside = isCloseOutside ? closeModal : () => null;

  return (
    <ModalBackPlate
      ref={modalBackPlateRefCallback}
      isCenter={isCenter}
      modalHeight={modalHeight}
      modalBackPlateHeight={modalBackPlateHeight}
      zIndex={zIndex}
      isMounted={isMounted}
      onClick={handleOutside}
      isMobile={isMobile}>
      <ModalWrapper
        ref={modalRefCallback}
        className={props.className || ''}
        size={size}
        isMobile={isMobile}
        modalHeight={modalHeight}
        animationTime={ANIMATION_TIME}
        animation={animation}
        onClick={(e: MouseEvent) => e.preventDefault()}>
        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>
        {title && (
          <ModalHeader ref={headerRefCallback}>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        <ModalContent padding={padding} isMobile={isMobile} headerHeight={headerHeight}>
          {children}
        </ModalContent>
      </ModalWrapper>
    </ModalBackPlate>
  );
}
