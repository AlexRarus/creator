import styled from 'styled-components';
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

export const MobileButtonsListWrapper = styled.div`
  padding: 0 10px 40px;
  width: 100%;
`;

export const MobileButtonsList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
  height: 50px;

  ${ButtonStyled} {
    width: 50%;
    height: 100%;

    :first-child {
      border-right: 1px solid ${COLORS.grey[400]};
    }
  }
`;

export const ActionsList = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ width }) => (width ? `${width}px` : 'auto')};
  overflow: hidden;
`;

export const FormButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > * {
    width: 100%;
  }
`;
