import React, { useEffect } from 'react';
import { GridColumn } from 'src/components/grid';
import { IBlock, ISectionData } from 'src/dal/blocks/interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IPage } from 'src/dal/pages/interfaces';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { isMobile } from 'react-device-detect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { typeIconsMap } from 'src/containers/profile/block-editor/types-list/utils';

import { reorder } from '../utils';

import { getStyleLockHorizontalGrag } from './utils';
import {
  BlockActionWrapper,
  FormWrapperDroppable,
  DraggableItem,
  DragIcon,
  DragHandleZone,
  DragIconBox,
  SectionDraggable,
  CustomCheckbox,
  SectionHandleZone,
  DeleteSection,
} from './style';
import { DroppableSection } from './droppable-section';

interface IProps {
  data: IPage;
  isCheckBlocks: boolean;
  blocks: IBlock<any>[];
  setBlocks: (blocks: IBlock<any>[]) => void;
  checkedBlockIds: number[];
  setCheckedBlockIds: (blockIds: number[]) => void;
  setSelectedBlock: any;
  onDragEndAction: any;
  deleteSection: (id: any) => (event: any) => void;
  updateSection: (id: any, blocks: any[], sectionData?: string) => void;
}

export const DroppableList = (props: IProps) => {
  const {
    data,
    isCheckBlocks,
    blocks,
    setBlocks,
    checkedBlockIds,
    setCheckedBlockIds,
    setSelectedBlock,
    deleteSection,
    updateSection,
    onDragEndAction,
  } = props;

  const onClickCheckbox = (id: number) => (event: any) => {
    event.stopPropagation();
    if (checkedBlockIds.some((blockId: number) => blockId === id)) {
      setCheckedBlockIds(checkedBlockIds.filter((blockId: number) => blockId !== id));
    } else {
      setCheckedBlockIds([...checkedBlockIds, id]);
    }
  };

  useEffect(() => {
    // TODO для теста изменяем данные
    if (data.blocks) {
      // setBlocks(data.blocks);
    }
  }, [data]);

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      //console.log("no-change");
      return;
    }

    if (result.type === 'main') {
      // ДНД внутри страницы
      const reorderedBlocks = reorder(blocks, result.source.index, result.destination.index);
      const blockIds = reorderedBlocks.map((block: IBlock<any>) => block.id);
      setBlocks(reorderedBlocks);
      onDragEndAction(blockIds);
    } else {
      // ДНД внутри секции
      const droppableSectionId = parseInt(result.type);
      const section = blocks.find(
        (block: IBlock<any>) => block.id === droppableSectionId
      ) as IBlock<ISectionData>;
      const reorderedSectionBlocks = reorder(
        section?.data?.blocks,
        result.source.index,
        result.destination.index
      );
      const sectionBlockIds = reorderedSectionBlocks.map((block: IBlock<any>) => block.id);

      const updatedBlocks = blocks.map((block: IBlock<any>) => {
        if (block.id === droppableSectionId) {
          return { ...block, data: { blocks: reorderedSectionBlocks } };
        }
        return block;
      });

      setBlocks(updatedBlocks);
      updateSection(section.id, sectionBlockIds);
    }
  };

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const onClickEditBlock = (block: IBlock<any>) => (event: any) => {
    setSelectedBlock(block);
  };

  const onClickStopPropagation = (event: any) => {
    event.stopPropagation();
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable type='main' droppableId='droppable-main'>
        {(provided: any, snapshot: any) => {
          return (
            <FormWrapperDroppable
              width={isMobile ? window.innerWidth : 500}
              selectedTheme={null}
              isDraggingOver={snapshot.isDraggingOver}
              verticalGap={32}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              <GridColumn alignItems='center'>
                {blocks.map((block: IBlock<any>, index: number) => {
                  return (
                    <Draggable key={block.id} draggableId={`${block.id}`} index={index}>
                      {(provided: any, snapshot: any) =>
                        block.type === 'section' ? (
                          <SectionDraggable
                            isDragging={snapshot.isDragging}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={getStyleLockHorizontalGrag(
                              provided?.draggableProps?.style,
                              snapshot
                            )}
                            key={block.id}>
                            <SectionHandleZone
                              onClick={onClickStopPropagation}
                              isDragging={snapshot.isDragging}>
                              <DragIcon isDragging={snapshot.isDragging}>
                                <ViewAgendaIcon fontSize={'small'} />
                              </DragIcon>
                            </SectionHandleZone>
                            <DeleteSection onClick={deleteSection(block.id)}>удалить</DeleteSection>
                            <DroppableSection
                              section={block}
                              isDragging={snapshot.isDragging}
                              onClickEditBlock={onClickEditBlock}
                            />
                          </SectionDraggable>
                        ) : (
                          <DraggableItem
                            onClick={onClickEditBlock(block)}
                            isDragging={snapshot.isDragging}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={getStyleLockHorizontalGrag(
                              provided?.draggableProps?.style,
                              snapshot
                            )}
                            index={index + 1}
                            key={block.id}>
                            <>
                              <DragHandleZone
                                onClick={onClickStopPropagation}
                                isDragging={snapshot.isDragging}>
                                <DragIcon isDragging={snapshot.isDragging}>
                                  {typeIconsMap[block.type]}
                                </DragIcon>
                              </DragHandleZone>
                              <DragIconBox>
                                <DragIndicatorIcon />
                              </DragIconBox>
                              {isCheckBlocks && (
                                <CustomCheckbox
                                  onClick={onClickCheckbox(block.id)}
                                  isChecked={checkedBlockIds.some(
                                    (blockId: number) => blockId === block.id
                                  )}
                                />
                              )}
                              <BlockActionWrapper>
                                <TargetBlockTypePreview selectedTheme={null} block={block} />
                              </BlockActionWrapper>
                            </>
                          </DraggableItem>
                        )
                      }
                    </Draggable>
                  );
                })}
              </GridColumn>
              {provided.placeholder}
            </FormWrapperDroppable>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
