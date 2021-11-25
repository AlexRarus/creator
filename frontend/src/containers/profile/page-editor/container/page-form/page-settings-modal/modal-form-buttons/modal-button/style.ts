import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export interface IModalButtonProps {
  kind?: Kind;
  isBlock?: boolean;
  disabled?: boolean;
}

export type Kind = 'primary' | 'secondary' | 'delete';

const modalButtonColors = {
  primary: COLORS.blue[500],
  secondary: COLORS.black,
  delete: COLORS.red[500],
};

export const ModalButtonStyled = styled.div<IModalButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ isBlock = false }: IModalButtonProps) => (isBlock ? '100%' : '32px')};
  width: ${({ isBlock = false }: IModalButtonProps) => (isBlock ? '100%' : 'auto')};
  padding: 15px 10px;
  background: ${COLORS.white};
  color: ${({ disabled, kind = 'primary' }: IModalButtonProps) =>
    disabled ? COLORS.grey[500] : modalButtonColors[kind]};
  transition: all 200ms ease-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border: ${({ isBlock }: IModalButtonProps) =>
    isBlock ? 'none' : `1px solid ${COLORS.grey[400]}`};
  border-radius: ${({ isBlock }: IModalButtonProps) => (isBlock ? '0' : '4px')};
  cursor: ${({ disabled }: IModalButtonProps) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;

  * {
    cursor: ${({ disabled }: IModalButtonProps) => (disabled ? 'not-allowed' : 'pointer')};
  }

  :hover {
    background: ${({ disabled }) => (disabled ? COLORS.white : COLORS.grey[200])};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ disabled, kind = 'primary' }: IModalButtonProps) =>
      disabled ? COLORS.grey[500] : modalButtonColors[kind]};
    :first-child {
      margin-right: 5px;
    }

    :last-child {
      margin-left: 5px;
    }
  }
`;
