import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';

export const ImageItemOuter = styled.div<{ isSelected?: boolean; isLoading?: boolean }>`
  border-radius: 10px;
  width: 100%;
  height: 100px;
  transition-duration: 0.2s;
  overflow: hidden;
  transform: perspective(150px) rotateY(10deg);
  box-shadow: -2px 2px 7px gray;

  :hover {
    transform: rotateY(0);
    box-shadow: 0 0 0;
  }

  ${({ isSelected }) =>
    isSelected
      ? css`
          transform: rotateY(0) !important;
          box-shadow: 0 0 0 !important;
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

export const ImageItemInner = styled.div<{ isSelected?: boolean; isLoading?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: ${COLORS.white};
  border-radius: 10px;
  overflow: hidden;
  transition: all 200ms ease-out;

  :hover {
    background: ${COLORS.blue[400]};
  }

  ${({ isSelected }) =>
    isSelected
      ? css`
          background: ${COLORS.blue[400]};
        `
      : ''};

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
