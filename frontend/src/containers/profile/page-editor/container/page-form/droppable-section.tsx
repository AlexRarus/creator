import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TargetBlockTypePreview } from 'src/containers/app/block';

import { typeIconsMap } from '../../../block-editor/types-list/utils';

import {
  SectionWrapper,
  DraggableItem,
  DragHandleZone,
  DragIcon,
  DragIconBox,
  BlockActionWrapper,
  EditBlockButton,
  DeleteBlockButton,
  BlockActionsRow,
} from './style';
import { getStyleLockHorizontalGrag } from './utils';

export const DroppableSection = (props: any) => {
  const { section, isDragging, onClickEditBlock, deleteBlock } = props;
  const blocks = section?.data?.blocks;
  return (
    <Droppable droppableId={`droppable-${section.id}`} type={`${section.id}`}>
      {(provided, snapshot) => (
        <SectionWrapper ref={provided.innerRef} isDragging={isDragging}>
          {blocks?.map((block: any, index: number) => {
            return (
              <Draggable
                key={`${section.id}-${index}`}
                draggableId={`${section.id}-${index}`}
                index={index}>
                {(provided, snapshot) => (
                  <DraggableItem
                    isSubItem={true}
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
                    <BlockActionsRow>
                      <EditBlockButton onClick={onClickEditBlock(block)}>
                        <EditIcon fontSize={'small'} />
                        изменить
                      </EditBlockButton>
                      <DeleteBlockButton onClick={deleteBlock(block.id)}>
                        <DeleteForeverIcon fontSize={'small'} />
                        удалить
                      </DeleteBlockButton>
                    </BlockActionsRow>
                    {/*<DragIconBox>*/}
                    {/*  <DragIndicatorIcon />*/}
                    {/*</DragIconBox>*/}
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
