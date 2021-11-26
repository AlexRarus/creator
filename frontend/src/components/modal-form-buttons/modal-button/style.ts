import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export interface IModalButtonStyledProps {
  kind?: Kind;
  hasBorder?: boolean;
  disabled?: boolean;
}

export type Kind = 'primary' | 'secondary' | 'delete';

const modalButtonColors = {
  primary: COLORS.blue[500],
  secondary: COLORS.black,
  delete: COLORS.red[500],
};

export const ModalButtonStyled = styled.div<IModalButtonStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  background: ${COLORS.white};
  color: ${({ disabled, kind = 'primary' }: IModalButtonStyledProps) =>
    disabled ? COLORS.grey[500] : modalButtonColors[kind]};
  transition: all 200ms ease-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border: ${({ hasBorder = true }: IModalButtonStyledProps) =>
    hasBorder ? `1px solid ${COLORS.grey[400]}` : 'none'};
  border-radius: ${({ hasBorder = true }: IModalButtonStyledProps) => (hasBorder ? '4px' : '0')};
  cursor: ${({ disabled }: IModalButtonStyledProps) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;

  * {
    cursor: ${({ disabled }: IModalButtonStyledProps) => (disabled ? 'not-allowed' : 'pointer')};
  }

  :hover {
    background: ${({ disabled }) => (disabled ? COLORS.white : COLORS.grey[200])};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ disabled, kind = 'primary' }: IModalButtonStyledProps) =>
      disabled ? COLORS.grey[500] : modalButtonColors[kind]};
    :first-child {
      margin-right: 5px;
    }

    :last-child {
      margin-left: 5px;
    }
  }
`;
