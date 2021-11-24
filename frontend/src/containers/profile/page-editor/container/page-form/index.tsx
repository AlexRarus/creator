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
  IconButton,
  AddBlockButtonWrapper,
} from './style';
import { PageSettingsModal, TabValue } from './page-settings-modal';
import { BlinkMessage } from './blink-message';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  onClickAddBlock?: () => void;
  onSubmitSuccess: (data: any) => void;
}

export const PageForm = (props: IProps) => {
  const { data, username, pageSlug, onClickAddBlock, onSubmitSuccess } = props;
  const [pageSettingsModalTab, setPageSettingsModalTab] = useState<TabValue | null>(null);
  const [copyBlinkId, setCopyBlinkId] = useState<string>();

  const onCopyToClipboard = () => {
    copyTextToClipboard(`${window.location.origin}/${username}/${pageSlug}`);
    setCopyBlinkId(uuidv4());
  };

  const goToPreviewAction = () => console.log('goToPreviewAction');

  const openPageSettingsModal = (activeTab = TabValue.LINK) => () =>
    setPageSettingsModalTab(activeTab);
  const closePageSettingsModal = () => setPageSettingsModalTab(null);

  return (
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
            <Grid>
              {data.blocks.map((block: IBlock<any>) => (
                <GridColumn key={block.id} size={12}>
                  <TargetBlockTypePreview block={block} />
                </GridColumn>
              ))}
            </Grid>
          </GridColumn>
        </Grid>
      </FormWrapper>
      <FormFooter>
        <IconButton onClick={goToPreviewAction}>
          <VisibilityIcon />
        </IconButton>
        <AddBlockButtonWrapper>
          <Button block={true} onClick={onClickAddBlock}>
            Добавить блок
          </Button>
        </AddBlockButtonWrapper>
        <IconButton onClick={openPageSettingsModal()}>
          <SettingsIcon />
        </IconButton>
      </FormFooter>
      {pageSettingsModalTab && (
        <PageSettingsModal
          onClose={closePageSettingsModal}
          onSuccess={onSubmitSuccess}
          activeTabValue={pageSettingsModalTab as TabValue}
          pageData={data}
        />
      )}
    </>
  );
};
