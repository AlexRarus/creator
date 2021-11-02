import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

import { SortDirection } from '../interfaces';

interface IHeaderTableCellProps {
  isSortable?: boolean;
  hasWidth?: boolean;
}

interface ISortMarkerProps {
  isActive: boolean;
  direction: SortDirection;
}

export const DefaultHeaderTableCellValueWrapper = styled.div<IHeaderTableCellProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 10px 12px;
  line-height: 20px;
  cursor: ${({ isSortable }) => (isSortable ? 'pointer' : 'default')};
`;

export const DefaultHeaderTableCellValue = styled.div<IHeaderTableCellProps>`
  user-select: none;
  white-space: ${({ hasWidth }) => (hasWidth ? 'nowrap' : 'wrap')};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SortMarker = styled.div<ISortMarkerProps>`
  display: flex;
  flex-direction: column;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: rotate(${({ direction }) => (direction === SortDirection.desc ? 180 : 0)}deg);

  svg {
    fill: ${COLORS.grey[500]};
  }
`;
