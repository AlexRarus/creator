import React, { useEffect } from 'react';
import { GridColumn } from 'src/components/grid';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ISectionData } from 'src/dal/blocks/section-interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IPage } from 'src/dal/pages/interfaces';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { isMobile } from 'react-device-detect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { typeIconsMap } from 'src/containers/profile/block-editor/types-list/utils';
import { useAppTypeContext } from 'src/providers/app-type-provider';

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
  // определяем тип приложения (для телефонов чтобы корректно работал днд и скролл приложения)
  const { appType } = useAppTypeContext();

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
              appType={appType}
              // высота блока для скролла = screenHeight - верхнее меню - нижний блок кнопок - ссылка на страницу
              viewBlockHeight={window?.innerHeight - 64 - 64 - 60}
              ref={provided.innerRef}>
              <GridColumn alignItems='center'>
                {blocks.map((block: IBlock<any>, index: number) => {
                  return (
                    <Draggable key={block.id} draggableId={`${block.id}`} index={index}>
                      {(provided: any, snapshot: any) =>
                        block.type === 'section' ? (
                          <SectionDraggable
                            onClick={onClickEditBlock(block)}
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
                              <DragIcon isDragging={snapshot.isDragging}>
                                <ViewAgendaIcon fontSize='small' />
                              </DragIcon>
                            </SectionHandleZone>
                            <DeleteSection onClick={deleteSection(block.id)}>удалить</DeleteSection>
                            <DroppableSection
                              section={block}
                              isDragging={snapshot.isDragging}
                              setSelectedBlock={setSelectedBlock}
                            />
                          </SectionDraggable>
                        ) : (
                          <DraggableItem
                            onClick={onClickEditBlock(block)}
                            isDragging={snapshot.isDragging}
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
                                  onClick={onClickCheckbox(block)}
                                  isChecked={checkedBlocks.includes(block)}
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
