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

export const FormButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > * {
    width: 100%;
  }
`;

export const ConfirmContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ConfirmMessage = styled.div`
  padding: 10px;
`;
