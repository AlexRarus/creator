import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS } from 'src/components/theme';
import { IListItemProps, getGridTemplateAreas } from 'src/containers/app/block/types/list/style';

export const ItemsOrderingFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DroppableWrapper = styled.div<{
  isDraggingOver: boolean;
  width?: number | null;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: 100%;
  padding: 10px;

  color: inherit;
  background: ${({ isDraggingOver, theme }) =>
    isDraggingOver ? rgba(theme.background.primary, 0.9) : theme.background.primary};
`;

export const DraggableItem = styled.div<{ isDragging: boolean; isSubItem?: boolean }>`
  position: relative;
  display: grid;
  grid-template: 'draggable-icon item-field remove-icon' auto / 30px 1fr 30px;
  padding: 0;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 12px;
  overflow: hidden;
`;

export const DragIndicatorIconWrapper = styled.div`
  grid-area: draggable-icon;
  display: flex;
  height: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background: ${COLORS.blueGrey[800]};

  svg {
    color: ${COLORS.white};
  }
`;

export const RemoveIconWrapper = styled.div<{ disabled: boolean }>`
  grid-area: remove-icon;
  display: flex;
  height: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background: ${COLORS.white};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  svg {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    color: ${({ disabled }) => (disabled ? COLORS.grey[400] : COLORS.red[600])};
  }
`;

export const ItemFieldWrapper = styled.div<IListItemProps>`
  position: relative;
  grid-area: item-field;
  display: grid;
  ${getGridTemplateAreas};
  width: 100%;
  padding: 10px 10px 10px 0;
  background: ${COLORS.white};
`;

export const ItemFieldIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const getFontSize = (props: { fontSize: 's' | 'm' | 'l' }) => {
  switch (props.fontSize) {
    case 's':
      return '14px';
    case 'm':
      return '16px';
    case 'l':
      return '18px';
    default:
      return '16px';
  }
};

export const ItemFieldContent = styled.div<{ fontSize: 's' | 'm' | 'l' }>`
  grid-area: content;
  display: flex;
  flex-direction: column;
  font-size: ${getFontSize};
`;
