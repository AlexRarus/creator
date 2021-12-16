import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';

export const ImageItemOuter = styled.div<{
  isSelected?: boolean;
  isLoading?: boolean;
  imageOuterWidth: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ imageOuterWidth }) => imageOuterWidth}px;
  transition-duration: 0.2s;
  overflow: hidden;
  transform: perspective(150px) rotateY(-10deg);
  box-shadow: -2px 2px 7px ${COLORS.grey[700]};
  border-radius: 4px;

  :hover {
    transform: rotateY(0);
    box-shadow: 0 0 0;
  }

  ${({ isSelected }) =>
    isSelected
      ? css`
          transform: rotateY(0) !important;
          box-shadow: 0 1px 8px ${COLORS.blue[500]} !important;
        `
      : ''};

  ${({ isLoading }) =>
    isLoading
      ? css`
          transform: rotateY(0) !important;
          box-shadow: 0 0 0 !important;
        `
      : ''};
`;

export const ImageItemInner = styled.div<{
  isLoading?: boolean;
  isActive?: boolean;
  borderRadius?: number;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: ${({ isActive }) => (isActive ? COLORS.blue[400] : COLORS.white)};
  overflow: hidden;
  border-radius: ${({ borderRadius = 10 }) => borderRadius}px;
  transition: all 200ms ease-out;

  ${({ isLoading }) =>
    isLoading
      ? css`
          background: ${COLORS.grey[300]} !important;
        `
      : ''};
`;

export const ImageElement = styled.img<{ isLoaded?: boolean }>`
  opacity: ${({ isLoaded = true }) => (isLoaded ? 1 : 0)};
  max-width: 100%;
  max-height: 100%;
`;

export const ActionsButton = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 3px;
  right: 3px;
  width: 30px;
  height: 30px;
  background: ${COLORS.white};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  box-shadow: ${({ isActive }) => (isActive ? `2px 2px 7px ${COLORS.grey[700]}` : 'none')};
  border-radius: 50%;
  z-index: 2;
  transition: all 200ms ease-out;
  cursor: pointer;

  :hover {
    opacity: 1;
    box-shadow: 2px 2px 7px ${COLORS.grey[700]};
  }

  svg {
    font-size: 24px;
  }

  * {
    cursor: pointer;
  }
`;

export const ActionsList = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ width }) => (width ? `${width}px` : 'auto')};
  overflow: hidden;
`;
