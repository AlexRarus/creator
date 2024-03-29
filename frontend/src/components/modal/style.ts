import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';

import { MobileSize, DesktopSize } from './interfaces';
import { getDesktopAnimation, getMobileAnimation } from './style-animations';

interface IModalBackPlateProps {
  isMounted: boolean;
  modalHeight: number;
  isMobile: boolean;
  zIndex?: number;
}

interface IModalWrapperProps {
  isMobile: boolean;
  hasTitle: boolean;
  animation: 'open' | 'close';
  animationTime: number;
  modalHeight: number;
  mobileSize: MobileSize;
  desktopSize: DesktopSize;
}

export const ModalBackPlate = styled.div<IModalBackPlateProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex || '999'};
  opacity: ${({ isMounted }) => (isMounted ? 1 : 0)};
  transition: opacity 100ms ease-out;
  background: ${rgba(COLORS.black, 0.5)};
  overflow-x: auto;
`;

export const ModalPreWrapper = styled.div<Partial<IModalWrapperProps>>`
  display: flex;
  flex-direction: column;
  position: absolute;
  ${({ mobileSize, desktopSize, isMobile }) => {
    if (isMobile) {
      // на мобилке size влияет на высоту модалки (не может быть больше экрана)
      return css`
        width: 100%;
        height: ${mobileSize};
      `;
    } else {
      // на десктопе size влияет на ширину модалки (не может быть больше экрана)
      return `width: ${desktopSize};`;
    }
  }};
`;

export const ModalWrapper = styled.div<IModalWrapperProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme?.mainBackground};
  background-image: ${({ theme }) => theme?.mainGradient};
  border-radius: ${({ isMobile }) => (isMobile ? '16px 16px 0 0' : '16px')};
  padding-top: ${({ isMobile, hasTitle }) => {
    if (!hasTitle) {
      return isMobile ? '44px' : '58px';
    }
    return 0;
  }};
  max-height: 100%;
  max-width: 100%;
  height: 100%;
`;

export const ModalHeader = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: ${({ isMobile }) => (isMobile ? `10px 50px 10px 10px` : `24px 65px 24px 24px`)};
`;

export const ModalTitle = styled.div<{ isMobile: boolean }>`
  font-weight: bold;
  font-size: ${({ isMobile }) => (isMobile ? 16 : 20)}px;
  line-height: ${({ isMobile }) => (isMobile ? 20 : 24)}px;
`;

export const ModalContent = styled.div<{
  padding?: string | null;
  isMobile: boolean;
  headerHeight: number;
}>`
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: ${({ padding = null }) => padding || 'none'};

  ${({ isMobile, headerHeight }) =>
    isMobile &&
    css`
      height: calc(100% - ${headerHeight}px);
      max-height: calc(100% - ${headerHeight}px);
      overflow-y: auto;
      overflow-x: hidden;
    `}
`;

export const CloseButton = styled.div<{ isMobile: boolean; hasTitle: boolean }>`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  will-change: transform;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  padding: ${({ isMobile }) => (isMobile ? '10px 10px 0 0' : '24px 24px 0 0')};
  cursor: pointer;
  border-top-right-radius: 8px;

  :hover {
    svg {
      transform: scale(1.1);
    }
  }

  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;
