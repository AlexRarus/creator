import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';

import { ButtonStyled } from './button/style';

export const DesktopButtonsList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  margin-top: 20px;
`;

export const MobileButtonsList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-top: 1px solid ${COLORS.grey[400]};

  ${ButtonStyled} {
    width: 50%;
    height: 100%;

    :first-child {
      border-right: 1px solid ${COLORS.grey[400]};
    }
  }
`;

export const ActionsList = styled.div<{ width?: number; isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ width }) => (width ? `${width}px` : 'auto')};
  overflow: hidden;

  ${({ isMobile }) =>
    isMobile
      ? css`
          border-top: 1px solid ${COLORS.grey[400]};
          border-right: 1px solid ${COLORS.grey[400]};
          border-radius: 0 4px 0 0;
        `
      : ''}
`;

export const FormButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > * {
    width: 100%;
  }
`;
