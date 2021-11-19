import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';

import { ModalSize, desktopSize, mobileSize } from './interfaces';
import { getDesktopAnimation, getMobileAnimation } from './style-animations';

interface IModalBackPlateProps {
  isMounted: boolean;
  modalHeight: number;
  modalBackPlateHeight: number;
  isMobile: boolean;
  zIndex?: number;
  isCenter?: boolean;
}

interface IModalWrapperProps {
  isMobile: boolean;
  animation: 'open' | 'close';
  animationTime: number;
  modalHeight: number;
  size?: ModalSize;
}

const getJustifyContent = ({
  isCenter,
  modalHeight,
  modalBackPlateHeight,
}: IModalBackPlateProps) => {
  return isCenter && modalHeight < modalBackPlateHeight ? 'center' : 'flex-start';
};

export const ModalBackPlate = styled.div<IModalBackPlateProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${getJustifyContent};
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex || '999'};
  opacity: ${({ isMounted }) => (isMounted ? 1 : 0)};
  transition: opacity 100ms ease-out;
  background: ${rgba(COLORS.black, 0.5)};
  overflow-x: auto;
`;

export const ModalWrapper = styled.div<IModalWrapperProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: ${COLORS.white};
  border-radius: 8px;
  ${({ size, isMobile }) => {
    if (isMobile) {
      // на мобилке size влияет на высоту модалки (не может быть больше экрана)
      return size
        ? css`
            width: 100%;
            height: ${mobileSize[size]};
          `
        : '';
    } else {
      // на десктопе size влияет на ширину модалки (не может быть больше экрана)
      return size ? `width: ${desktopSize[size]};` : '';
    }
  }};
  max-height: 100%;
  max-width: 100%;

  animation: ${({ isMobile, animation, modalHeight }) =>
      isMobile
        ? getMobileAnimation(animation, modalHeight)
        : getDesktopAnimation(animation, modalHeight)}
    ${({ animationTime }) => animationTime}ms ease-out forwards;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 24px 80px 0 32px;
`;

export const ModalTitle = styled.div`
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 20px;
  line-height: 24px;
  margin-right: 20px;
`;

export const ModalContent = styled.div<{
  padding: string | null;
  isMobile: boolean;
  headerHeight: number;
}>`
  padding: ${({ padding }) => padding || '0px'};

  ${({ isMobile, headerHeight }) =>
    isMobile &&
    css`
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100% - ${headerHeight}px);
      max-height: calc(100% - ${headerHeight}px);
    `}
`;

export const CloseButton = styled.div`
  will-change: transform;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  padding: 24px 24px 0 0;
  cursor: pointer;
  background-color: ${COLORS.white};
  border-top-right-radius: 8px;

  :hover {
    svg {
      transform: scale(1.1);
    }
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${COLORS.black};
    cursor: pointer;
  }
`;
