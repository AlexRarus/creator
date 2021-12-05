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
import { USER_MENU_BACKGROUND, UserMenuWrapper } from 'src/components/menu/user-menu/style';

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
import { SectionModal } from './section-modal';
import { BlinkMessage } from './blink-message';
import { DroppableList } from './droppable-list';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  isUpdating: boolean;
  selectedTheme: ITheme | null;
  onUpdatePageForm: (slug?: string) => void;
  updatePartPageDataAction: () => void;
  onDragEndAction: (list: number[]) => void;
  createBlockAction: (data: any) => void;
  updateBlockAction: (data: any) => void;
  deleteBlockAction: (id: any) => void;
}

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
    onDragEndAction,
    createBlockAction,
    updateBlockAction,
    deleteBlockAction,
    selectedTheme,
  } = props;
  const [listItems, setListItems] = useState<any[]>([]);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [pageSettingsModalTab, setPageSettingsModalTab] = useState<TabValue | null>(null);
  const [isOpenSectionModal, setOpenSectionModal] = useState<boolean>(false);
  const [copyBlinkId, setCopyBlinkId] = useState<string>();
  const [selectedBlock, setSelectedBlock] = useState<IBlock<any> | INewBlock | null>(null);
  const [openerElement, openerRefCallback] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckBlocks, setCheckBlocks] = useState(false);
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const history = useHistory();

  const toggleSectionModal = () => setOpenSectionModal(!isOpenSectionModal);
  const openSettingsPopupHandler = () => setIsOpen(true);
  const closeSettingsPopupHandler = () => setIsOpen(false);
  const startCheckBlocks = () => setCheckBlocks(true);
  const cancelCheckBlocks = () => {
    setCheckedList([]);
    setCheckBlocks(false);
  };

  const acceptUnionBlocks = (sectionCommonData?: any) => {
    const insertIndex = listItems.findIndex((item: any) =>
      checkedList.some((checkedId) => checkedId === item.id)
    );
    const newSubBlocks = listItems.filter((item) =>
      checkedList.some((checkedId) => checkedId === item.id)
    );
    const subBlocksIds = newSubBlocks.map((block) => block.id);
    // const newMainList = listItems.filter(
    //   (item) => !checkedList.some((checkedId) => checkedId === item.id)
    // );

    // create section
    createBlockAction({
      pageSlug,
      type: 'section',
      index: insertIndex,
      data: { blocks: subBlocksIds, ...sectionCommonData },
    });
    setCheckedList([]);
    setCheckBlocks(false);
  };

  const deleteSection = (sectionId: any) => (event: any) => {
    event.stopPropagation();
    deleteBlockAction(sectionId);
  };

  const updateSection = (sectionId: any, blocks?: any[], commonData?: any) => {
    updateBlockAction({ id: sectionId, data: { blocks, ...commonData } });
  };

  useEffect(() => {
    if (data.blocks) {
      setListItems(data.blocks);
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
            onDragEndAction={onDragEndAction}
            deleteSection={deleteSection}
            updateSection={updateSection}
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
          onMouseLeave={closeSettingsPopupHandler}
          onMouseEnter={openSettingsPopupHandler}
          isOpen={isOpen}
          disabled={isShowPreview}>
          <SettingsIcon />
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
              <SettingsItemButton onClick={startCheckBlocks}>Добавить секцию</SettingsItemButton>
            </SettingsPopupList>
          </Popup>
        </IconButton>
      </FormFooter>
      {isCheckBlocks && (
        <>
          <AcceptButton onClick={toggleSectionModal}>Объединить</AcceptButton>
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
      {isOpenSectionModal && (
        <SectionModal onSuccess={acceptUnionBlocks} onClose={toggleSectionModal} />
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
