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
} from './style';

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
  const [headerElement, headerRefCallback] = useState<HTMLDivElement | null>(null);

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

  const closeModal = (e: MouseEvent) => {
    if (!e.isDefaultPrevented()) {
      setAnimation('close');
    }
  };

  const handleOutside = isCloseOutside ? closeModal : () => null;

  return (
    <ModalBackPlate
      modalHeight={modalHeight}
      zIndex={zIndex}
      isMounted={isMounted}
      onClick={handleOutside}
      isMobile={isMobile}>
      <ModalWrapper
        ref={modalRefCallback}
        className={props.className || ''}
        mobileSize={mobileSize as MobileSize}
        desktopSize={desktopSize as DesktopSize}
        isMobile={isMobile}
        hasTitle={Boolean(title)}
        modalHeight={modalHeight}
        animationTime={ANIMATION_TIME}
        animation={animation}
        onClick={(e: MouseEvent) => e.preventDefault()}>
        {hasCloseButton && (
          <CloseButton onClick={closeModal} isMobile={isMobile} hasTitle={Boolean(title)}>
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
    </ModalBackPlate>
  );
}
