import styled, { css } from 'styled-components';

import { TDimension } from './interfaces';

const getColorDimensionStyle = ({ dimension }: any) => {
  switch (dimension) {
    case 's':
      return css`
        width: 60px;
        height: 24px;
      `;
    case 'm':
      return css`
        width: 80px;
        height: 32px;
      `;
    case 'l':
      return css`
        width: 80px;
        height: 40px;
      `;
    case 'xl':
      return css`
        width: 100px;
        height: 48px;
      `;
    default:
      return css`
        width: 80px;
        height: 32px;
      `;
  }
};

export const ComponentWrapper = styled.div<{ dimension: TDimension; label?: string }>`
  position: relative;
  border: 1px solid;
  border-radius: 2px;
  padding: 3px;
  cursor: pointer;
  ${({ label }) => label && 'margin-top: 16px;'}
  ${getColorDimensionStyle}
`;

export const ColoredPalette = styled.div<{ background?: string }>`
  background: ${({ background }) => background || 'inherit'};
  width: 100%;
  height: 100%;
`;

export const InputStyled = styled.input`
  width: 0;
  height: 0;
`;

export const Label = styled.div`
  position: absolute;
  top: -16px;
  left: -1px;
  white-space: nowrap;
  font-size: 12px;
`;
