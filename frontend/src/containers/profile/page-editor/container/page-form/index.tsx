import React, { useState, useEffect } from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import Button from 'src/components/button';
import { IPage } from 'src/dal/pages/interfaces';
import { useHistory } from 'react-router-dom';
import PaletteIcon from '@mui/icons-material/Palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyTextToClipboard } from 'src/utils/copyToClipboard';
import { v4 as uuidv4 } from 'uuid';
import { BlockEditorModal } from 'src/containers/profile/block-editor';
import { isMobile } from 'react-device-detect';
import { ITheme } from 'src/dal/themes/interface';
import Popup from 'src/components/popup';
import { USER_MENU_BACKGROUND } from 'src/components/menu/user-menu/style';

import { PagePreview } from '../page-preview';

import {
  FormHeader,
  LinkToPageField,
  LinkToPageLabel,
  LinkToPageValue,
  LinkCopyIndicator,
  PrefixPath,
  PageSlug,
  FormFooter,
  AddBlockButtonWrapper,
  SettingsPopupList,
  SettingsItemButton,
  AcceptButton,
  CancelButton,
} from './style';
import { IconButton } from './icon-button';
import { PageSettingsModal, TabValue } from './page-settings-modal';
import { BlinkMessage } from './blink-message';
import { DroppableList } from './droppable-list';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  isUpdating: boolean;
  selectedTheme: ITheme | null;
  onUpdatePageForm: (slug?: string) => void;
  onDragEndPagesAction: (list: number[]) => void;
}

const TEST_LIST = [
  {
    id: 1,
    author: 1,
    type: 'text',
    section: null,
    data: {
      text: '<p>текстттт</p>',
    },
    page_slugs: ['new_page'],
  },
  {
    id: 2,
    author: 1,
    type: 'text',
    section: null,
    data: {
      text: '<p>теккст</p>',
    },
    page_slugs: ['new_page'],
  },
  {
    id: 21,
    author: 1,
    type: 'text',
    section: null,
    data: {
      text: '<p>тasfsdfasfsеккст</p>',
    },
    page_slugs: ['new_page'],
  },
  {
    id: 241,
    author: 1,
    type: 'text',
    section: null,
    data: {
      text: '<p>тasff asdf asdf asdf sdfasfsеккст</p>',
    },
    page_slugs: ['new_page'],
  },
  {
    id: 4,
    author: 1,
    type: 'text',
    section: null,
    data: {
      text: '<p style="text-align: center;">фывафыва</p>',
    },
    page_slugs: ['new_page'],
  },
  {
    id: 5,
    author: 1,
    type: 'text',
    section: null,
    data: {
      text: '<p><span style="background-color: #e03e2d;">фывафываффывафывафыв</span></p>',
    },
    page_slugs: ['new_page'],
  },
  {
    id: 6,
    author: 1,
    type: 'text',
    section: null,
    data: {
      text: '<p>фывфыафы</p>\n<p>фывафыва</p>',
    },
    page_slugs: ['new_page'],
  },
];

interface INewBlock {
  id: 'new';
  type?: string;
}

export const PageForm = (props: IProps) => {
  const {
    data,
    username,
    pageSlug,
    isUpdating,
    onUpdatePageForm,
    onDragEndPagesAction,
    selectedTheme,
  } = props;
  const [listItems, setListItems] = useState<any[]>(TEST_LIST);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [pageSettingsModalTab, setPageSettingsModalTab] = useState<TabValue | null>(null);
  const [copyBlinkId, setCopyBlinkId] = useState<string>();
  const [selectedBlock, setSelectedBlock] = useState<IBlock<any> | INewBlock | null>(null);
  const [openerElement, openerRefCallback] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckBlocks, setCheckBlocks] = useState(false);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const history = useHistory();

  const openSettingsPopupHandler = () => setIsOpen(true);
  const closeSettingsPopupHandler = () => setIsOpen(false);
  const startCheckBlocks = () => setCheckBlocks(true);
  const cancelCheckBlocks = () => {
    setCheckedList([]);
    setCheckBlocks(false);
  };
  const acceptUnionBlocks = () => {
    const insertIndex = listItems.findIndex((item: any) =>
      checkedList.some((checkedId) => checkedId === item.id)
    );
    const newSubBlocks = listItems.filter((item) =>
      checkedList.some((checkedId) => checkedId === item.id)
    );
    const newMainList = listItems.filter(
      (item) => !checkedList.some((checkedId) => checkedId === item.id)
    );

    newMainList.splice(insertIndex, 0, { id: `section-${insertIndex}`, items: newSubBlocks });
    setListItems(newMainList);
    setCheckedList([]);
    setCheckBlocks(false);
  };

  const deleteSection = (sectionId: any) => (event: any) => {
    event.stopPropagation();
    const insertIndex = listItems.findIndex((item: any) => item.id === sectionId);
    const subBlocks = listItems[insertIndex]?.items;
    const newMainList = [...listItems];

    newMainList.splice(insertIndex, 1, ...subBlocks);
    setListItems(newMainList);
  };

  useEffect(() => {
    // TODO для теста изменяем данные
    if (data.blocks) {
      // setListItems(data.blocks);
    }
  }, [data]);

  const onCopyToClipboard = () => {
    copyTextToClipboard(`${window.location.origin}/${username}/${pageSlug}`);
    setCopyBlinkId(uuidv4());
  };

  const showPagePreview = () => setIsShowPreview(true);
  const hidePagePreview = () => setIsShowPreview(false);

  const openAddBlockModal = () => setSelectedBlock({ id: 'new' });
  const closeAddBlockModal = () => setSelectedBlock(null);

  const openPageSettingsModal = (activeTab = TabValue.LINK) => () =>
    setPageSettingsModalTab(activeTab);
  const closePageSettingsModal = () => setPageSettingsModalTab(null);

  const toThemesPage = () => history.push(`/profile/${username}/themes/`);

  return (
    <>
      {isShowPreview && (
        <PagePreview
          selectedTheme={selectedTheme}
          isUpdating={isUpdating}
          username={username}
          pageSlug={pageSlug}
          data={data}
        />
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
          <DroppableList
            data={data}
            isCheckBlocks={isCheckBlocks}
            listItems={listItems}
            setListItems={setListItems}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            setSelectedBlock={setSelectedBlock}
            onDragEndPagesAction={onDragEndPagesAction}
            deleteSection={deleteSection}
          />
        </>
      )}
      <FormFooter>
        {isShowPreview && isMobile && (
          <IconButton onClick={hidePagePreview} isActive={true}>
            <EditIcon />
          </IconButton>
        )}
        {!isShowPreview && isMobile && (
          <IconButton onClick={showPagePreview}>
            <VisibilityIcon />
          </IconButton>
        )}
        {!isMobile && (
          <IconButton onClick={toThemesPage}>
            <PaletteIcon />
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
        <IconButton
          refCallback={openerRefCallback as any}
          onClick={openSettingsPopupHandler}
          isOpen={isOpen}
          disabled={isShowPreview}>
          <SettingsIcon />
        </IconButton>
        <Popup
          isOpen={isOpen}
          onClose={closeSettingsPopupHandler}
          openerElement={openerElement}
          horizontalAlign='end'
          verticalAlign='start'
          position='top'
          maxHeight={320}
          plateMargin={0}
          zIndex={99}
          background={USER_MENU_BACKGROUND}
          hasBorder={false}
          hasShadow={false}
          borderRadius='4px 4px 0px 4px'
          hasPointer={false}>
          <SettingsPopupList>
            <SettingsItemButton onClick={openPageSettingsModal()}>Настройки</SettingsItemButton>
            <SettingsItemButton onClick={startCheckBlocks}>Изменить</SettingsItemButton>
          </SettingsPopupList>
        </Popup>
      </FormFooter>
      {isCheckBlocks && (
        <>
          <AcceptButton onClick={acceptUnionBlocks}>Объединить</AcceptButton>
          <CancelButton onClick={cancelCheckBlocks}>Отмена</CancelButton>
        </>
      )}
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
