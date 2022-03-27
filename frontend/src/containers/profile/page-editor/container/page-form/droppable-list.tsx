import React, { useEffect } from 'react';
import { GridColumn } from 'src/components/grid';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ISectionData } from 'src/dal/blocks/section-interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IPage } from 'src/dal/pages/interfaces';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ClearIcon from '@mui/icons-material/Clear';
import { isMobile } from 'react-device-detect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { typeIconsMap } from 'src/containers/profile/block-editor/types-list/utils';
import { useVirtualKeyboardContext } from 'src/providers/virtual-keyboard-provider';
import { useHackDndContext } from 'src/providers/hack-dnd-provider';

import { reorder } from '../utils';

import { getStyleLockHorizontalDrag } from './utils';
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
  checkedBlocks: IBlock<any>[];
  setCheckedBlocks: (blocks: IBlock<any>[]) => void;
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
    checkedBlocks,
    setCheckedBlocks,
    setSelectedBlock,
    deleteSection,
    updateSection,
    onDragEndAction,
  } = props;
  const { isOpenKeyboard } = useVirtualKeyboardContext();
  const { setDragging } = useHackDndContext();

  const onClickCheckbox = (clickedBlock: IBlock<any>) => (event: any) => {
    event.stopPropagation();
    if (checkedBlocks.includes(clickedBlock)) {
      setCheckedBlocks(checkedBlocks.filter((block: IBlock<any>) => block !== clickedBlock));
    } else {
      setCheckedBlocks([...checkedBlocks, clickedBlock]);
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
    setDragging(false);
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
    setDragging(true);
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
              isCheckBlocks={isCheckBlocks}
              selectedTheme={null}
              isDraggingOver={snapshot.isDraggingOver}
              verticalGap={32}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              <GridColumn alignItems='center'>
                {blocks.map((block: IBlock<any>, index: number) => {
                  return (
                    <Draggable
                      isDragDisabled={isOpenKeyboard}
                      key={block.id}
                      draggableId={`${block.id}`}
                      index={index}>
                      {(provided: any, snapshot: any) =>
                        block.type === 'section' ? (
                          <SectionDraggable
                            onMouseUp={onClickEditBlock(block)}
                            isDragging={snapshot.isDragging}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={getStyleLockHorizontalDrag(
                              provided?.draggableProps?.style,
                              snapshot
                            )}
                            key={block.id}>
                            <SectionHandleZone
                              onClick={onClickStopPropagation}
                              isDragging={snapshot.isDragging}>
                              section
                            </SectionHandleZone>
                            <DeleteSection onClick={deleteSection(block.id)}>
                              <ClearIcon fontSize={'small'} />
                            </DeleteSection>
                            <DroppableSection
                              section={block}
                              isDragging={snapshot.isDragging}
                              setSelectedBlock={setSelectedBlock}
                            />
                          </SectionDraggable>
                        ) : (
                          <DraggableItem
                            onMouseUp={onClickEditBlock(block)}
                            isDragging={snapshot.isDragging}
                            type={block.type}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            style={getStyleLockHorizontalDrag(
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
                                  className={'section-action'}
                                  isVisible={isCheckBlocks}
                                  onMouseUp={onClickCheckbox(block)}
                                  isChecked={checkedBlocks.includes(block)}
                                />
                              )}
                              <BlockActionWrapper>
                                <TargetBlockTypePreview block={block} isFakeBlock={true} />
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
