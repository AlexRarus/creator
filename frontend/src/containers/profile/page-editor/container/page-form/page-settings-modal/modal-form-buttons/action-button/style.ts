import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export interface IActionButtonProps {
  kind?: Kind;
  isBlock?: boolean;
  disabled?: boolean;
}

export type Kind = 'primary' | 'secondary' | 'delete';

const actionButtonBackground = {
  primary: COLORS.white,
  secondary: COLORS.white,
  delete: COLORS.white,
};

const actionButtonColors = {
  primary: COLORS.blue[500],
  secondary: COLORS.black,
  delete: COLORS.red[500],
};

export const ActionButtonStyled = styled.div<IActionButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px 0;
  background: ${({ kind = 'secondary' }: IActionButtonProps) => actionButtonBackground[kind]};
  color: ${({ disabled, kind = 'secondary' }: IActionButtonProps) =>
    disabled ? COLORS.grey[500] : actionButtonColors[kind]};
  transition: all 200ms ease-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-bottom: 1px solid ${COLORS.grey[400]};
  cursor: ${({ disabled }: IActionButtonProps) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;

  * {
    cursor: ${({ disabled }: IActionButtonProps) => (disabled ? 'not-allowed' : 'pointer')};
  }

  :hover {
    background: ${({ disabled }) => (disabled ? COLORS.white : COLORS.grey[200])};
  }

  :last-child {
    border-bottom: none;
  }

  svg:first-child {
    width: 20px;
    height: 20px;
    fill: ${({ disabled, kind = 'secondary' }: IActionButtonProps) =>
      disabled ? COLORS.grey[500] : actionButtonColors[kind]};
    :first-child {
      margin-right: 5px;
    }

    :last-child {
      margin-left: 5px;
    }
  }
`;
