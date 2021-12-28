import React, { useState } from 'react';
import { GridColumn } from 'src/components/grid';
import { isMobile } from 'react-device-detect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicator from '@mui/icons-material/DragIndicator';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useVirtualKeyboardContext } from 'src/providers/virtual-keyboard-provider';

import { getStyleLockHorizontalDrag } from './utils';
import {
  DroppableWrapper,
  DraggableItem,
  DragIndicatorIconWrapper,
  RemoveIconWrapper,
} from './style';
import { ItemField } from './item-filed';

interface IProps {
  fields: any[]; // список полей полученный из хука useFieldArray
  onChangeOrder: (startIndex: number, endIndex: number) => void;
  onRemove(index: number): void;
}

export const DroppableList = (props: IProps) => {
  const { fields, onChangeOrder, onRemove } = props;
  const [expandItemId, setExpandItemId] = useState<any>(fields[0] && fields[0].id);
  const { isOpenKeyboard } = useVirtualKeyboardContext();

  const onExpand = (itemId: any) => {
    setExpandItemId(itemId);
  };
  const onExpandToggle = (itemId: any) => {
    setExpandItemId(expandItemId === itemId ? null : itemId);
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    onChangeOrder(result.source.index, result.destination.index);
  };

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const removeDisabled = fields.length <= 1;
  const removeHandler = (index: number) => {
    if (!removeDisabled) {
      onRemove(index);
    }
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable type='list-editor' droppableId='droppable-list-editor'>
        {(provided: any, snapshot: any) => (
          <DroppableWrapper
            width={isMobile ? window.innerWidth : null}
            selectedTheme={null}
            isDraggingOver={snapshot.isDraggingOver}
            verticalGap={32}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            <GridColumn alignItems='center'>
              {fields.map((item: any, index: number) => (
                <Draggable
                  key={item.id}
                  isDragDisabled={isOpenKeyboard}
                  draggableId={`${item.id}`}
                  index={index}>
                  {(provided: any, snapshot: any) => (
                    <DraggableItem
                      isDragging={snapshot.isDragging}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getStyleLockHorizontalDrag(provided?.draggableProps?.style, snapshot)}
                      index={index + 1}
                      key={item.id}>
                      <ItemField
                        key={item.id}
                        item={item}
                        index={index}
                        isExpand={item.id === expandItemId}
                        onExpand={onExpand}
                        onExpandToggle={onExpandToggle}
                      />
                      <DragIndicatorIconWrapper>
                        <DragIndicator />
                      </DragIndicatorIconWrapper>
                      <RemoveIconWrapper
                        disabled={removeDisabled}
                        onClick={() => removeHandler(index)}>
                        <DeleteForeverOutlinedIcon />
                      </RemoveIconWrapper>
                    </DraggableItem>
                  )}
                </Draggable>
              ))}
            </GridColumn>
            {provided.placeholder}
          </DroppableWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};
