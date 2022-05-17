import React, { useState, useEffect, MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { isMobile } from 'react-device-detect';

import { DesktopSize, IPropsModal, MobileSize } from './interfaces';
import {
  ModalBackPlate,
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalPreWrapper,
} from './style';
import { addAnimationHook } from './animation';

const ANIMATION_TIME = 200;

export default function Modal(props: IPropsModal) {
  const {
    title,
    onClose,
    children,
    isCloseOutside = true,
    hasCloseButton = true,
    padding,
    mobileSize = MobileSize.M,
    desktopSize = MobileSize.S,
    zIndex,
  } = props;
  const [isMounted, setMounted] = useState(false);
  const [animation, setAnimation] = useState<'open' | 'close'>('open');
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [modalElement, modalRefCallback] = useState<HTMLDivElement | null>(null);
  const [modalContainerElement, modalContainerCallback] = useState<HTMLDivElement | null>(null);
  const [headerElement, headerRefCallback] = useState<HTMLDivElement | null>(null);
  const closeModal = (e?: MouseEvent) => {
    if (!e?.isDefaultPrevented()) {
      console.log('!e?.isDefaultPrevented(): ', !e?.isDefaultPrevented());
      setAnimation('close');
      onClose();
    }
  };

  addAnimationHook(modalContainerElement, modalElement, closeModal);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (modalElement) {
      const initHeaderHeight: number = headerElement?.getBoundingClientRect().height || 0;
      const initModalHeight: number = modalElement.getBoundingClientRect().height;

      setHeaderHeight(initHeaderHeight);
      setModalHeight(initModalHeight);
    }
  }, [modalElement]);

  useEffect(() => {
    if (animation === 'close') {
      setTimeout(onClose, ANIMATION_TIME);
    }
  }, [animation]);

  const handleOutside = isCloseOutside ? closeModal : () => null;

  return (
    <ModalBackPlate
      modalHeight={modalHeight}
      zIndex={zIndex}
      isMounted={isMounted}
      onClick={handleOutside}
      isMobile={isMobile}>
      <ModalPreWrapper
        ref={modalContainerCallback}
        className={'modal-container'}
        mobileSize={mobileSize as MobileSize}
        desktopSize={desktopSize as DesktopSize}
        isMobile={isMobile}
        onClick={(e: MouseEvent) => e.preventDefault()}>
        <ModalWrapper
          ref={modalRefCallback}
          className={'modal'}
          mobileSize={mobileSize as MobileSize}
          desktopSize={desktopSize as DesktopSize}
          isMobile={isMobile}
          hasTitle={Boolean(title)}
          modalHeight={modalHeight}
          animationTime={ANIMATION_TIME}
          animation={animation}
          onClick={(e: MouseEvent) => e.preventDefault()}>
          {hasCloseButton && (
            <CloseButton
              className={'cancel-modal'}
              // onClick={closeModal}
              isMobile={isMobile}
              hasTitle={Boolean(title)}>
              <CloseIcon />
            </CloseButton>
          )}
          {title && (
            <ModalHeader ref={headerRefCallback} isMobile={isMobile}>
              <ModalTitle isMobile={isMobile}>{title}</ModalTitle>
            </ModalHeader>
          )}
          <ModalContent padding={padding} isMobile={isMobile} headerHeight={headerHeight}>
            {children}
          </ModalContent>
        </ModalWrapper>
      </ModalPreWrapper>
    </ModalBackPlate>
  );
}
