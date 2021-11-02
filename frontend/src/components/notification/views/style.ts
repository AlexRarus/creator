import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

import { TButtonType } from '../interfaces';

interface IButtonProps {
  buttonType: TButtonType;
}
function getButtonColor({ buttonType }: IButtonProps) {
  switch (buttonType) {
    case 'primary':
      return COLORS.white;
    case 'secondary':
      return COLORS.black;
    case 'link':
      return COLORS.blue[800];
    default:
      return COLORS.black;
  }
}

function getButtonBackground({ buttonType }: IButtonProps) {
  switch (buttonType) {
    case 'primary':
      return COLORS.black;
    case 'secondary':
      return COLORS.white;
    case 'link':
      return 'transparent';
    default:
      return COLORS.white;
  }
}

function getButtonBorder({ buttonType }: IButtonProps) {
  switch (buttonType) {
    case 'primary':
      return `border: 1px solid ${COLORS.black}`;
    case 'secondary':
      return `border: 1px solid ${COLORS.black}`;
    case 'link':
      return `border-bottom: 1px dashed ${COLORS.blue[800]}`;
    default:
      return `border: 1px solid ${COLORS.black}`;
  }
}

function getButtonPadding({ buttonType }: IButtonProps) {
  switch (buttonType) {
    case 'primary':
      return '2px 8px';
    case 'secondary':
      return '2px 8px';
    case 'link':
      return '2px 0';
    default:
      return '2px 8px';
  }
}

export const ContentWrapper = styled.div`
  padding: 15px 36px 15px 18px;
  width: 100%;
`;

export const Message = styled.div``;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const Button = styled.div<IButtonProps>`
  cursor: pointer;
  color: ${getButtonColor};
  background: ${getButtonBackground};
  ${getButtonBorder};
  margin-right: 10px;
  user-select: none;
  padding: ${getButtonPadding};

  :last-child {
    margin-right: 0;
  }
`;
