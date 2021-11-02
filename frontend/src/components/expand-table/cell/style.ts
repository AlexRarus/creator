import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

interface IDefaultCellProps {
  isExpand?: boolean;
  hasEllipsis?: boolean;
}

export const DefaultCellValueWrapper = styled.div<{
  hasTooltip?: boolean;
  isResetStyleColumn?: boolean;
}>`
  ${({ isResetStyleColumn }) => (!isResetStyleColumn ? 'padding: 10px 12px;' : '')};
  display: flex;
  align-items: center;
  height: 100%;
  background-color: inherit;

  &:hover {
    color: ${({ hasTooltip }) => (hasTooltip ? COLORS.blue[600] : 'inherit')};
  }
`;

export const DefaultCellValue = styled.div<IDefaultCellProps>`
  position: relative;
  font-weight: ${({ isExpand }) => (isExpand ? 'bold' : 'normal')};
  max-height: 32px;
  overflow: hidden;
  background-color: inherit;
`;
