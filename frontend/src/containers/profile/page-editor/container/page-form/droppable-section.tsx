import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ISectionData } from 'src/dal/blocks/section-interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { useVirtualKeyboardContext } from 'src/providers/virtual-keyboard-provider';

import { typeIconsMap } from '../../../block-editor/types-list/utils';

import {
  SectionWrapper,
  DraggableItem,
  DragHandleZone,
  DragIcon,
  DragIconBox,
  BlockActionWrapper,
} from './style';
import { getStyleLockHorizontalDrag } from './utils';

interface IProps {
  section: IBlock<ISectionData>;
  isDragging: boolean;
  setSelectedBlock(block: IBlock<any>): void;
}

export const DroppableSection = (props: IProps) => {
  const { section, isDragging, setSelectedBlock } = props;
  const blocks = section?.data?.blocks;
  const { isOpenKeyboard } = useVirtualKeyboardContext();

  const onClickEditBlock = (block: IBlock<any>) => (event: any) => {
    event.stopPropagation(); // останавливаем всплытие чтобы не нарваться на редактирование секции
    setSelectedBlock(block);
  };

  return (
    <Droppable droppableId={`droppable-${section.id}`} type={`${section.id}`}>
      {(provided, snapshot) => (
        <SectionWrapper ref={provided.innerRef} isDragging={isDragging}>
          {blocks?.map((block: IBlock<any>, index: number) => {
            return (
              <Draggable
                isDragDisabled={isOpenKeyboard}
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
                    style={getStyleLockHorizontalDrag(provided?.draggableProps?.style, snapshot)}
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
