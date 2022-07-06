import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const ActionsWrapper = styled.div``;

export const ActionsButton = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: ${COLORS.white};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  box-shadow: ${({ isActive }) => (isActive ? `2px 2px 7px ${COLORS.grey[700]}` : 'none')};
  border-radius: 50%;
  z-index: 2;
  transition: all 200ms ease-out;
  cursor: pointer;

  :hover {
    opacity: 1;
    box-shadow: 2px 2px 7px ${COLORS.grey[700]};
  }

  svg {
    font-size: 24px;
  }

  * {
    cursor: pointer;
  }
`;

export const ActionsList = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ width }) => (width ? `${width}px` : 'auto')};
  overflow: hidden;
`;
