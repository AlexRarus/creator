import React, { useState, useEffect } from 'react';
import { GridColumn } from 'src/components/grid';
import { IBlock } from 'src/dal/blocks/interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import Button from 'src/components/button';
import { IPage } from 'src/dal/pages/interfaces';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyTextToClipboard } from 'src/utils/copyToClipboard';
import { v4 as uuidv4 } from 'uuid';
import { BlockEditorModal } from 'src/containers/profile/block-editor';
import { isMobile } from 'react-device-detect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { PagePreview } from '../page-preview';
import { reorder } from '../utils';

import {
  // FormWrapper,
  FormHeader,
  LinkToPageField,
  LinkToPageLabel,
  LinkToPageValue,
  LinkCopyIndicator,
  PrefixPath,
  PageSlug,
  FormFooter,
  AddBlockButtonWrapper,
  BlockActionWrapper,
  FormWrapperDroppable,
  DraggableItem,
} from './style';
import { IconButton } from './icon-button';
import { PageSettingsModal, TabValue } from './page-settings-modal';
import { BlinkMessage } from './blink-message';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  isUpdating: boolean;
  onUpdatePageForm: (slug?: string) => void;
  onDragEndPagesAction: (list: number[]) => void;
}

interface INewBlock {
  id: 'new';
  type?: string;
}

export const PageForm = (props: IProps) => {
  const { data, username, pageSlug, isUpdating, onUpdatePageForm, onDragEndPagesAction } = props;
  const [listItems, setListItems] = useState<any[]>([]);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [pageSettingsModalTab, setPageSettingsModalTab] = useState<TabValue | null>(null);
  const [copyBlinkId, setCopyBlinkId] = useState<string>();
  const [selectedBlock, setSelectedBlock] = useState<IBlock<any> | INewBlock | null>(null);

  useEffect(() => {
    if (data.blocks) {
      setListItems(data.blocks);
    }
  }, [data]);

  const onCopyToClipboard = () => {
    copyTextToClipboard(`${window.location.origin}/${username}/${pageSlug}`);
    setCopyBlinkId(uuidv4());
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(listItems, result.source.index, result.destination.index);
    const listIds = items.map((item) => item.id);
    setListItems(items);
    onDragEndPagesAction(listIds);
  };

  const onDragStart = () => {
    // good times
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const showPagePreview = () => setIsShowPreview(true);
  const hidePagePreview = () => setIsShowPreview(false);

  const openAddBlockModal = () => setSelectedBlock({ id: 'new' });
  const closeAddBlockModal = () => setSelectedBlock(null);

  const openPageSettingsModal = (activeTab = TabValue.LINK) => () =>
    setPageSettingsModalTab(activeTab);
  const closePageSettingsModal = () => setPageSettingsModalTab(null);

  return (
    <>
      {isShowPreview && (
        <PagePreview isUpdating={isUpdating} username={username} pageSlug={pageSlug} data={data} />
      )}
      {!isShowPreview && (
        <>
          <FormHeader>
            <LinkToPageField onClick={onCopyToClipboard}>
              <LinkToPageLabel>Ссылка на страницу</LinkToPageLabel>
              <LinkToPageValue>
                <PrefixPath>
                  {window.location.origin}/{username}
                </PrefixPath>
                <PageSlug>/{pageSlug}</PageSlug>
              </LinkToPageValue>
              <LinkCopyIndicator>
                <BlinkMessage showId={copyBlinkId}>(Скопировано)</BlinkMessage>
                <ContentCopyIcon />
              </LinkCopyIndicator>
            </LinkToPageField>
            <IconButton onClick={openPageSettingsModal(TabValue.LINK)}>
              <EditIcon />
            </IconButton>
          </FormHeader>
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided: any, snapshot: any) => (
                <FormWrapperDroppable
                  isDraggingOver={snapshot.isDraggingOver}
                  verticalGap={32}
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  <GridColumn alignItems='center'>
                    {listItems.map((block: IBlock<any>, index) => (
                      <Draggable key={block.id} draggableId={`${block.id}`} index={index}>
                        {(provided: any, snapshot: any) => (
                          <DraggableItem
                            isDragging={snapshot.isDragging}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={block.id}>
                            <BlockActionWrapper onClick={() => setSelectedBlock(block)}>
                              <TargetBlockTypePreview block={block} />
                            </BlockActionWrapper>
                          </DraggableItem>
                        )}
                      </Draggable>
                    ))}
                  </GridColumn>
                </FormWrapperDroppable>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
      <FormFooter>
        {isShowPreview && (
          <IconButton onClick={hidePagePreview} isActive={true}>
            <EditIcon />
          </IconButton>
        )}
        {!isShowPreview && (
          <IconButton onClick={showPagePreview} disabled={!isMobile}>
            <VisibilityIcon />
          </IconButton>
        )}
        <AddBlockButtonWrapper>
          <Button
            kind={'formed'}
            dimension={'l'}
            onClick={openAddBlockModal}
            disabled={isShowPreview}>
            Добавить блок
          </Button>
        </AddBlockButtonWrapper>
        <IconButton onClick={openPageSettingsModal()} disabled={isShowPreview}>
          <SettingsIcon />
        </IconButton>
      </FormFooter>
      {pageSettingsModalTab && (
        <PageSettingsModal
          onClose={closePageSettingsModal}
          onSuccess={onUpdatePageForm}
          activeTabValue={pageSettingsModalTab as TabValue}
          pageData={data}
        />
      )}
      {selectedBlock && (
        <BlockEditorModal
          blockId={selectedBlock.id}
          blockType={selectedBlock.type}
          onSuccess={onUpdatePageForm}
          onClose={closeAddBlockModal}
          username={username}
          pageSlug={pageSlug}
        />
      )}
    </>
  );
};
