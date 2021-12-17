import React, { useState, useEffect } from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import Button from 'src/components/button';
import { IPage } from 'src/dal/pages/interfaces';
import { useHistory } from 'react-router-dom';
import PaletteIcon from '@mui/icons-material/Palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import { BlockEditorModal } from 'src/containers/profile/block-editor';
import { isMobile } from 'react-device-detect';
import { ITheme } from 'src/dal/themes/interface';
import Popup from 'src/components/popup';
import { USER_MENU_BACKGROUND } from 'src/components/menu/user-menu/style';
import { AwesomeButton } from 'src/components/awesome-button';

import { PagePreview } from '../page-preview';

import {
  FormFooter,
  AddBlockButtonWrapper,
  SettingsPopupList,
  SettingsItemButton,
  AcceptButton,
  CancelButton,
} from './style';
import { IconButton } from './icon-button';
import { DroppableList } from './droppable-list';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  isUpdating: boolean;
  selectedTheme: ITheme | null;
  onUpdatePageForm: (slug?: string) => void;
  onDragEndAction: (list: number[]) => void;
  createBlockAction: (data: any) => void;
  updateBlockAction: (data: any) => void;
  deleteBlockAction: (id: any) => void;

  openPageSettingsModal: any;
}

interface INewBlock {
  id: 'new';
  type?: string;
  data?: any;
  index?: number;
}

export const PageForm = (props: IProps) => {
  const {
    data,
    username,
    pageSlug,
    isUpdating,
    onUpdatePageForm,
    onDragEndAction,
    updateBlockAction,
    deleteBlockAction,
    selectedTheme,

    openPageSettingsModal,
  } = props;
  const [blocks, setBlocks] = useState<IBlock<any>[]>([]);
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<IBlock<any> | INewBlock | null>(null);
  const [openerElement, openerRefCallback] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckBlocks, setCheckBlocks] = useState(false);
  const [checkedBlocks, setCheckedBlocks] = useState<IBlock<any>[]>([]);
  const [checkedBlockSmallestIndex, setCheckedBlockSmallestIndex] = useState<number>();
  const history = useHistory();

  const openSettingsPopupHandler = () => setIsOpen(true);
  const closeSettingsPopupHandler = () => setIsOpen(false);
  const startCheckBlocks = () => setCheckBlocks(true);
  const cancelCheckBlocks = () => {
    setCheckedBlocks([]);
    setCheckBlocks(false);
  };

  useEffect(() => {
    if (data.blocks) {
      setBlocks(data.blocks);
    }
  }, [data]);

  useEffect(() => {
    const indexes = checkedBlocks.map((checkedBlock: IBlock<any>) => blocks.indexOf(checkedBlock));
    setCheckedBlockSmallestIndex(Math.max(0, Math.min(...indexes)));
  }, [blocks, checkedBlocks]);

  const deleteSection = (sectionId: any) => (event: any) => {
    event.stopPropagation();
    deleteBlockAction(sectionId);
  };

  const updateSection = (sectionId: any, blocks?: number[], sectionData?: any) => {
    updateBlockAction({ id: sectionId, data: { blocks, ...sectionData } });
  };

  const showPagePreview = () => setIsShowPreview(true);
  const hidePagePreview = () => setIsShowPreview(false);

  const openAddBlockModal = (blockType?: string, initBlockData?: any, index?: number) => () =>
    setSelectedBlock({
      id: 'new',
      type: blockType,
      data: initBlockData,
      index,
    });

  const closeAddBlockModal = () => {
    console.log('closeAddBlockModal');
    setSelectedBlock(null);
  };

  const toThemesPage = () => history.push(`/profile/${username}/themes/`);

  // todo на успешную отправку формы нужно вызвать onUpdatePageForm БЕЗ аргументов
  const onSuccessSubmitBlock = () => onUpdatePageForm();

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
          <DroppableList
            data={data}
            isCheckBlocks={isCheckBlocks}
            blocks={blocks}
            setBlocks={setBlocks}
            checkedBlocks={checkedBlocks}
            setCheckedBlocks={setCheckedBlocks}
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
          <AwesomeButton onClick={openAddBlockModal()}>Добавить блок</AwesomeButton>
        </AddBlockButtonWrapper>
        <IconButton
          ref={openerRefCallback as any}
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
          <AcceptButton
            onClick={openAddBlockModal(
              'section',
              { blocks: checkedBlocks },
              checkedBlockSmallestIndex
            )}>
            Объединить
          </AcceptButton>
          <CancelButton onClick={cancelCheckBlocks}>Отмена</CancelButton>
        </>
      )}
      {selectedBlock && (
        <BlockEditorModal
          blockId={selectedBlock.id}
          blockType={selectedBlock.type}
          blockData={selectedBlock.data}
          blockIndex={selectedBlock?.index}
          onSuccess={onSuccessSubmitBlock}
          onClose={closeAddBlockModal}
          username={username}
          pageSlug={pageSlug}
        />
      )}
    </>
  );
};
