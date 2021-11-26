import React, { useState } from 'react';
import { Grid, GridColumn } from 'src/components/grid';
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

import { PagePreview } from '../page-preview';

import {
  FormWrapper,
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
} from './style';
import { IconButton } from './icon-button';
import { PageSettingsModal, TabValue } from './page-settings-modal';
import { BlinkMessage } from './blink-message';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  onUpdatePageForm: (slug?: string) => void;
}

interface INewBlock {
  id: 'new';
  type?: string;
}

export const PageForm = (props: IProps) => {
  const { data, username, pageSlug, onUpdatePageForm } = props;
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [pageSettingsModalTab, setPageSettingsModalTab] = useState<TabValue | null>(null);
  const [copyBlinkId, setCopyBlinkId] = useState<string>();
  const [selectedBlock, setSelectedBlock] = useState<IBlock<any> | INewBlock | null>(null);

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

  return (
    <>
      {isShowPreview && <PagePreview username={username} pageSlug={pageSlug} data={data} />}
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
          <FormWrapper>
            <Grid verticalGap={32}>
              <GridColumn alignItems='center'>
                <Grid verticalGap={16}>
                  {data.blocks.map((block: IBlock<any>) => (
                    <GridColumn key={block.id} size={12}>
                      <BlockActionWrapper onClick={() => setSelectedBlock(block)}>
                        <TargetBlockTypePreview block={block} />
                      </BlockActionWrapper>
                    </GridColumn>
                  ))}
                </Grid>
              </GridColumn>
            </Grid>
          </FormWrapper>
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
          <Button block={true} onClick={openAddBlockModal} disabled={isShowPreview}>
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
