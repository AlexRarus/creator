import React, { useEffect } from 'react';
import { GridColumn } from 'src/components/grid';
import { IBlock } from 'src/dal/blocks/interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IPage } from 'src/dal/pages/interfaces';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
  DeleteBlockButton,
  EditBlockButton,
  BlockActionsRow,
} from './style';
import { DroppableSection } from './droppable-section';

interface IProps {
  data: IPage;
  isCheckBlocks: boolean;
  listItems: any[];
  setListItems: any;
  checkedList: any[];
  setCheckedList: any;
  setSelectedBlock: any;
  onSelectSection: any;
  onDragEndAction: any;
  deleteBlock: (id: any) => (event: any) => void;
  updateSection: (id: any, blocks: any[], background?: string) => void;
}

export const DroppableList = (props: IProps) => {
  const {
    data,
    isCheckBlocks,
    listItems,
    setListItems,
    checkedList,
    setCheckedList,
    setSelectedBlock,
    onSelectSection,
    deleteBlock,
    updateSection,
    onDragEndAction,
  } = props;

  const onClickCheckbox = (id: any) => (event: any) => {
    event.stopPropagation();
    if (!isCheckBlocks) {
      return;
    }
    if (checkedList.some((item: any) => item === id)) {
      const newList = [...checkedList];
      setCheckedList(newList.filter((item) => item !== id));
    } else {
      setCheckedList([...checkedList, id]);
    }
  };

  useEffect(() => {
    // TODO для теста изменяем данные
    if (data.blocks) {
      // setListItems(data.blocks);
    }
  }, [data]);

  const onDragEnd = (result: any) => {
    // dropped outside the list
    console.log(result);
    if (!result.destination) {
      //console.log("no-change");
      return;
    }

    if (result.type === 'block') {
      const items = reorder(listItems, result.source.index, result.destination.index);
      const listIds = items.map((item) => item.id);
      setListItems(items);
      onDragEndAction(listIds);
    } else {
      const section = listItems.find((item: any) => String(item.id) === result.type);
      const sectionBlocks = reorder(
        section?.data?.blocks,
        result.source.index,
        result.destination.index
      );

      const sectionBlocksIds = sectionBlocks.map((block) => block.id);
      const newList = [...listItems];
      const updatedList = newList.map((item) => {
        if (String(item.id) === result.type) {
          return { ...item, data: { blocks: sectionBlocks } };
        }
        return item;
      });
      //
      setListItems(updatedList);
      updateSection(section.id, sectionBlocksIds);
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

  const onClickEditSection = (block: IBlock<any>) => (event: any) => {
    onSelectSection(block);
  };

  const onClickStopPropagation = (event: any) => {
    event.stopPropagation();
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable type='block' droppableId='droppable-main'>
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
                {listItems.map((block: any, index: number) => {
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
                            <BlockActionsRow>
                              <EditBlockButton onClick={onClickEditSection(block)}>
                                <EditIcon fontSize={'small'} />
                                изменить
                              </EditBlockButton>
                              <DeleteBlockButton onClick={deleteBlock(block.id)}>
                                <DeleteForeverIcon fontSize={'small'} />
                                удалить
                              </DeleteBlockButton>
                            </BlockActionsRow>
                            <DroppableSection
                              section={block}
                              isDragging={snapshot.isDragging}
                              onClickEditBlock={onClickEditBlock}
                              deleteBlock={deleteBlock}
                            />
                          </SectionDraggable>
                        ) : (
                          <DraggableItem
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
                              {/* TODO подумать куда деть эти иконки */}
                              {/*<DragIconBox>*/}
                              {/*  <DragIndicatorIcon fontSize={'small'} />*/}
                              {/*</DragIconBox>*/}
                              <CustomCheckbox
                                onClick={onClickCheckbox(block.id)}
                                isCheckBlocks={isCheckBlocks}
                                isChecked={checkedList.some((id: any) => id === block.id)}
                              />
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
