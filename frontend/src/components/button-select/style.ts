import styled, { css } from 'styled-components';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';
import { TDimension } from 'src/components/input-components';

import { IOptionsProps, IOptionProps } from './interfaces';

const dimensionPadding = {
  l: css`
    height: 56px;
    padding: 12px 15px;
  `,
  m: css`
    height: 40px;
    padding: 8px 15px;
  `,
  s: css`
    height: 32px;
    padding: 6px 11px;
  `,
};

const dimensionFont = {
  l: css`
    font-size: 15px;
    font-weight: 400;
  `,
  m: css`
    font-size: 15px;
    font-weight: 400;
  `,
  s: css`
    font-size: 13px;
    font-weight: 400;
  `,
};

export const ButtonSelectWrapper = styled.div<{
  width?: string;
}>`
  display: flex;
  width: ${({ width }) => (width ? `${width}` : 'fit-content')};
`;

export const ButtonStyled = styled.div<{
  dimension: TDimension;
  width?: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${COLORS.blue[400]};
  box-sizing: border-box;
  cursor: pointer;
  height: 40px;
  padding: 0 21px 0 23px;
  width: ${({ width }) => (width ? `${width}` : 'auto')};

  ${({ dimension }) => dimensionPadding[dimension]};
  ${({ dimension }) => dimensionFont[dimension]};

  outline: none;
  background-color: transparent;
  color: ${COLORS.blue[400]};

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 90%;
  }
`;

export const ShivronIcon = styled(ExpandMore)`
  cursor: pointer;
  fill: ${COLORS.blue[400]};
  margin-left: auto;
`;

export const OptionsListOuter = styled.div<IOptionsProps>`
  min-width: ${({ componentWidth }) => (componentWidth ? `${componentWidth}px` : 'auto')};
`;

export const OptionsListInner = styled.div<IOptionsProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${COLORS.white};
  box-shadow: 0 0 4px ${rgba(COLORS.black, 0.2)};
  padding: 14px 0;
  border-radius: 4px;
  overflow: hidden;
`;

export const Option = styled.div<IOptionProps>`
  padding: 10px 24px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  color: ${({ isActive }) => (isActive ? COLORS.lightBlue[400] : COLORS.black)};

  &:hover {
    background: ${rgba(COLORS.lightBlue[400], 0.3)};
    color: ${({ isActive }) => (isActive ? COLORS.blueGrey[300] : COLORS.black)};
  }
`;
