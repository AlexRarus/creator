import styled from 'styled-components';
import { COLORS, FONTS } from 'src/components/theme';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { IColumn } from './interfaces';
import { RowActionsWrapper } from './row-actions/style';

interface ITableWrapperProps {
  height?: string;
}

interface IRowProps {
  columns: IColumn[];
  hasSelectCheckbox: boolean;
  hasExpandButton: boolean;
  hasActions: boolean;
  actionsColumnWidth?: number;
  isExpand?: boolean;
  isSelected?: boolean;
  isHighlight?: boolean;
  hasSelectedRows?: boolean;
  isHeader?: boolean;
  gap?: number;
  canHideActions?: boolean;
}

interface ICellProps {
  isHeader?: boolean;
  isExpand?: boolean;
}

interface IExpandButtonProps {
  isExpand?: boolean;
  isHeader?: boolean;
}

const EXPAND_PADDING_LEFT = 12;
const EXPAND_PADDING_RIGHT = 8;
const EXPAND_PADDING = EXPAND_PADDING_LEFT + EXPAND_PADDING_RIGHT;
const EXPAND_BUTTON_WIDTH = 24;
const EXPAND_BUTTON_HEIGHT = 24;
const SELECT_CHECKBOX_SIZE = 32;

export const TableWrapper = styled.div<ITableWrapperProps>`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || 'auto'};
`;

export const TableRowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLORS.grey[200]};
  line-height: 24px;
`;

export const TableHead = styled.div`
  border-bottom: 1px solid ${COLORS.grey[200]};

  ${TableRowWrapper} {
    border-bottom: 0;
  }
`;

export const TableBody = styled.div<{
  canScroll?: boolean;
  minHeight?: string;
}>`
  height: 100%;
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ canScroll }) => canScroll && 'overflow-y: auto;'};
`;

export const TableCell = styled.div<ICellProps>`
  font-size: 13px;
  line-height: 16px;
  color: ${({ isHeader }) => (isHeader ? COLORS.grey[800] : COLORS.black)};
  ${({ isHeader }) => isHeader && FONTS.InterBoldStyle}
  position: relative;
  background-color: inherit;

  &::after {
    position: absolute;
    display: ${({ isHeader }) => (isHeader ? 'block' : 'none')};
    content: '';
    width: 1px;
    height: 16px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: ${COLORS.grey[200]};
  }

  :last-child {
    &::after {
      display: none;
    }
  }
`;

export const TableRow = styled.div<IRowProps>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: ${({
    hasSelectCheckbox,
    hasExpandButton,
    actionsColumnWidth,
    columns,
  }) => {
    const gridTemplateColumns = columns.map((column: IColumn) => column.width || '1fr');

    if (hasExpandButton) {
      gridTemplateColumns.unshift(`${EXPAND_PADDING + EXPAND_BUTTON_WIDTH}px`);
    }
    if (hasSelectCheckbox) {
      gridTemplateColumns.unshift(`${SELECT_CHECKBOX_SIZE}px`);
    }
    if (actionsColumnWidth) {
      gridTemplateColumns.push(`${actionsColumnWidth}px`);
    }

    return gridTemplateColumns.join(' ');
  }};
  grid-column-gap: ${({ gap = 0 }) => gap}px;
  transition: all 200ms ease;

  background: ${({ isSelected, isHighlight }) =>
    isSelected && isHighlight ? COLORS.lightBlue[100] : COLORS.white};
  ${RowActionsWrapper} {
    opacity: ${({ isSelected, canHideActions, isHeader }) =>
      !isHeader ? (canHideActions ? isSelected && 0 : 1) : 0};
    * {
      cursor: ${({ isSelected, canHideActions }) => canHideActions && isSelected && 'default'};
    }
  }

  :hover {
    background: ${({ isHeader, isExpand, isSelected, isHighlight }) =>
      isHeader || (isExpand && !isSelected) || !isHighlight ? COLORS.white : COLORS.lightBlue[100]};
    ${RowActionsWrapper} {
      opacity: ${({ isExpand, isHeader, hasSelectedRows, canHideActions }) => {
        return canHideActions && (isHeader || isExpand || hasSelectedRows) ? 0 : 1;
      }};
      * {
        cursor: ${({ isExpand, isHeader, hasSelectedRows, canHideActions }) =>
          canHideActions && (isHeader || isExpand || hasSelectedRows) ? 'default' : 'pointer'};
      }
    }
  }

  ${TableCell}:last-child {
    margin-right: ${({ hasActions }) => (hasActions ? '48px' : 0)};
  }
`;

export const ExpandContentWrapper = styled.div``;

export const ExpandButtonWrapper = styled.div<IExpandButtonProps>`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: ${EXPAND_PADDING_LEFT}px;
  padding-right: ${EXPAND_PADDING_RIGHT}px;
  overflow: ${({ isHeader }) => (isHeader ? 'hidden' : 'auto')};
  height: ${({ isHeader }) => (isHeader ? '0px' : 'auto')};
  opacity: ${({ isHeader }) => (isHeader ? 0 : 1)};
  cursor: ${({ isHeader }) => (isHeader ? 'default' : 'pointer')};

  * {
    cursor: ${({ isHeader }) => (isHeader ? 'default' : 'pointer')};
  }
`;

export const ExpandButton = styled(ExpandMore)<IExpandButtonProps>`
  position: relative;
  transform: rotate(${({ isExpand }) => (isExpand ? 180 : 0)}deg);
  width: ${EXPAND_BUTTON_WIDTH}px;
  height: ${EXPAND_BUTTON_HEIGHT}px;

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const DefaultEmptyListMessage = styled.div`
  padding: 10px 15px;
  height: 100%;
  width: 100%;
`;
