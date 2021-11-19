import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';

import { IPropsModal, ModalSize } from './interfaces';

interface IModalWrapperProps {
  isMounted: boolean;
  modalHeight: number;
  modalWrapperHeight: number;
  zIndex?: number;
  isCenter?: boolean;
  isHideModalCss?: boolean;
}

const getJustifyContent = ({ isCenter, modalHeight, modalWrapperHeight }: IModalWrapperProps) => {
  return isCenter && modalHeight < modalWrapperHeight ? 'center' : 'flex-start';
};

export const ModalScrollWrapper = styled.div<IModalWrapperProps>`
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

export const ModalWrapper = styled.div<Pick<{ size: ModalSize }, any>>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 40px 0;
  background: ${COLORS.white};

  ${({ size }) => (size ? `width: ${size};` : '')};

  max-width: 100%;

  border-radius: 8px;
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

export const ModalContent = styled.div<Pick<Partial<IPropsModal>, any>>`
  ${({ isPadding, padding }) => {
    if (isPadding) {
      return `padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
    }
    return '';
  }}
`;

export const CloseButton = styled.div`
  will-change: transform;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  padding: 24px;
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
