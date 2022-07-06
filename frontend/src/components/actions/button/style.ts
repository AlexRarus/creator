import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export interface IButtonStyledProps {
  kind?: Kind;
  hasBorder?: boolean;
  disabled?: boolean;
}

export type Kind = 'primary' | 'secondary' | 'delete';

const ButtonColors = {
  primary: COLORS.blue[500],
  secondary: COLORS.black,
  delete: COLORS.red[500],
};

export const ButtonStyled = styled.div<IButtonStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  background: ${COLORS.white};
  color: ${({ disabled, kind = 'primary' }: IButtonStyledProps) =>
    disabled ? COLORS.grey[500] : ButtonColors[kind]};
  transition: all 200ms ease-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border: ${({ hasBorder = true }: IButtonStyledProps) =>
    hasBorder ? `1px solid ${COLORS.grey[400]}` : 'none'};
  border-radius: ${({ hasBorder = true }: IButtonStyledProps) => (hasBorder ? '4px' : '0')};
  cursor: ${({ disabled }: IButtonStyledProps) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;

  * {
    cursor: ${({ disabled }: IButtonStyledProps) => (disabled ? 'not-allowed' : 'pointer')};
  }

  :hover {
    background: ${({ disabled }) => (disabled ? COLORS.white : COLORS.grey[200])};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ disabled, kind = 'primary' }: IButtonStyledProps) =>
      disabled ? COLORS.grey[500] : ButtonColors[kind]};
    :first-child {
      margin-right: 5px;
    }

    :last-child {
      margin-left: 5px;
    }
  }
`;
