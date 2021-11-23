import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface ISortedProps {
  sorting?: boolean;
  canDrop?: boolean;
  isOver?: boolean;
  isDragging?: boolean;
  disabled?: boolean;
}

export const OptionWrapper = styled.div<ISortedProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px ${({ sorting }) => (sorting ? 'dashed' : 'solid')} ${COLORS.blueGrey[300]};
  border-radius: 4px;
  font-size: 16px;
  line-height: 20px;
  background: ${({ canDrop, isOver, isDragging, disabled }) => {
    if (canDrop && isOver && isDragging) {
      return COLORS.grey[100];
    }
    if (canDrop) {
      return isOver ? COLORS.lightGreen[300] : COLORS.lightBlue[100];
    }

    return disabled ? COLORS.grey[100] : COLORS.white;
  }};
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  margin-bottom: 5px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const OptionIndex = styled.div`
  display: flex;
  font-weight: bold;
  padding: 10px;
  background: ${COLORS.blueGrey[300]};
`;

export const OptionLabelWrapper = styled.div`
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RemoveButton = styled(CloseIcon)<{ disabled?: boolean }>`
  width: 20px;
  height: 20px;
  color: ${COLORS.grey[300]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 200ms;

  :hover {
    color: ${({ disabled }) => (disabled ? COLORS.grey[300] : COLORS.red[800])};
  }
`;

export const AddButton = styled(AddIcon)<{ disabled?: boolean }>`
  width: 20px;
  height: 20px;
  color: ${COLORS.grey[300]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 200ms;

  :hover {
    color: ${({ disabled }) => (disabled ? COLORS.grey[300] : COLORS.green[800])};
  }
`;

export const OptionButtonWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 10px 10px 0;
  min-width: fit-content;

  ${AddButton}, ${RemoveButton} {
    width: 20px;
    height: 20px;
  }
`;

export const DisabledMessage = styled.div`
  margin-right: 10px;
  font-size: 14px;
  color: ${COLORS.grey[500]};

  :last-child {
    margin-right: 0;
  }
`;
