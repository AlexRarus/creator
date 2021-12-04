import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { typeIconsMap } from '../../../block-editor/types-list/utils';
import { TargetBlockTypePreview } from '../../../../app/block';

import {
  SectionWrapper,
  DraggableItem,
  DragHandleZone,
  DragIcon,
  DragIconBox,
  BlockActionWrapper,
} from './style';
import { getStyleLockHorizontalGrag } from './utils';

export const DroppableSection = (props: any) => {
  const { section, isDragging, onClickEditBlock } = props;
  return (
    <Droppable droppableId={`droppable-${section.id}`} type={`${section.id}`}>
      {(provided, snapshot) => (
        <SectionWrapper ref={provided.innerRef} isDragging={isDragging}>
          {section.items.map((block: any, index: number) => {
            return (
              <Draggable
                key={`${section.id}-${index}`}
                draggableId={`${section.id}-${index}`}
                index={index}>
                {(provided, snapshot) => (
                  <DraggableItem
                    onClick={onClickEditBlock(block)}
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    style={getStyleLockHorizontalGrag(provided?.draggableProps?.style, snapshot)}
                    key={block.id}>
                    <DragHandleZone isDragging={snapshot.isDragging}>
                      <DragIcon isDragging={snapshot.isDragging}>
                        {typeIconsMap[block.type]}
                      </DragIcon>
                    </DragHandleZone>
                    <DragIconBox>
                      <DragIndicatorIcon />
                    </DragIconBox>
                    <BlockActionWrapper>
                      <TargetBlockTypePreview selectedTheme={null} block={block} />
                    </BlockActionWrapper>
                  </DraggableItem>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </SectionWrapper>
      )}
    </Droppable>
  );
};
