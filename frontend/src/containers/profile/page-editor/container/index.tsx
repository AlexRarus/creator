import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { DeviceContainer } from 'src/containers/profile/device-wrapper/new-iphone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { copyTextToClipboard } from 'src/utils/copyToClipboard';
import { v4 as uuidv4 } from 'uuid';
import { SelectedThemeProvider } from 'src/providers/selected-theme-provider';
import { useAppTypeContext } from 'src/providers/app-type-provider';

import { BlinkMessage } from './page-form/blink-message';
import { PageSettingsModal, TabValue } from './page-form/page-settings-modal';
import { PageForm } from './page-form';
import { PagePreview } from './page-preview';
import { useMapStoreToProps } from './selectors';
import {
  StyledGrid,
  DesktopPageWrapper,
  StyledBrowserView,
  EditorWrapper,
  StyledMobileView,
  ScaleBlock,
  EditorHeader,
  LinkCopyIndicator,
  LinkToPageField,
  LinkToPageLabel,
  LinkToPageValue,
  PageSlug,
  PrefixPath,
  ActionWrapper,
  LinkActionBlock,
  PreviewWrapper,
  FlexBlock,
} from './style';

interface IProps {
  username: string;
  pageSlug: string;
}

// TODO тему для отображения пользовательской страницы берем у текущего пользователя
export const PageEditorContainer = observer((props: IProps) => {
  const {
    isLoading,
    isUpdating,
    getMyPageBySlugAction,
    updateMyPageAction,
    data,
    selectPageAction,
    updatePageBlocksAction,
    deleteBlockAction,
    createBlockAction,
    updateBlockAction,
    user,
    updateMeAction,
  } = useMapStoreToProps();
  const { appType } = useAppTypeContext();
  const { username, pageSlug } = props;
  const [pageSettingsModalTab, setPageSettingsModalTab] = useState<TabValue | null>(null);
  const [copyBlinkId, setCopyBlinkId] = useState<string>();
  const { replace } = useHistory();
  const isAuthor = useIsAuthor(username);
  const [initialized, setInitialized] = useState(false);
  const isIndexPage = user?.index_page?.id === data?.id;

  const openPageSettingsModal = (activeTab = TabValue.LINK) => () =>
    setPageSettingsModalTab(activeTab);
  const closePageSettingsModal = () => setPageSettingsModalTab(null);

  useEffect(() => {
    if (isAuthor) {
      getMyPageBySlugAction(pageSlug);
    }
  }, [isAuthor, pageSlug]);

  useEffect(() => {
    // некоторые блоки зависят от юзера, есди он изменился нужно обновить страницу
    if (initialized && isAuthor) {
      updateMyPageAction();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && data) {
      selectPageAction(data);
      setInitialized(true); // считаем страницу готовой когда получили data
    }
  }, [pageSlug, data]);

  // todo передавать slug ТОЛЬКО если он изменился в настройках страницы
  const onUpdatePageForm = async (pageSlug?: string) => {
    if (pageSlug) {
      const me = await updateMeAction();
      replace(`/profile/${me.username}/pages/${pageSlug}`);
    } else {
      updateMyPageAction();
    }
  };

  const onDragEndAction = (listIds?: any[]) => {
    const reqData = {
      id: data?.id,
      label: data?.label,
      blocks: listIds, // id блоков в том порядке в котором они должны сохраниться
      slug: pageSlug,
    };
    updatePageBlocksAction(reqData);
  };

  const onCopyToClipboard = () => {
    let url = `${window.location.origin}/${username}`;

    if (!isIndexPage) {
      url += `/${pageSlug}`;
    }

    copyTextToClipboard(url);
    setCopyBlinkId(uuidv4());
  };

  return (
    <SelectedThemeProvider selectedTheme={user?.theme}>
      {!isAuthor && 'PageEditorContainer Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && data !== null && (
        <>
          <StyledBrowserView>
            <DesktopPageWrapper>
              <EditorHeader>
                <LinkToPageField onClick={onCopyToClipboard}>
                  <LinkToPageLabel>Ссылка на страницу</LinkToPageLabel>
                  <LinkToPageValue>
                    <PrefixPath>
                      {window.location.origin}/{username}
                    </PrefixPath>
                    {!isIndexPage && <PageSlug>/{pageSlug}</PageSlug>}
                  </LinkToPageValue>
                  <LinkCopyIndicator>
                    <BlinkMessage showId={copyBlinkId}>(Скопировано)</BlinkMessage>
                    <ContentCopyIcon />
                  </LinkCopyIndicator>
                </LinkToPageField>
              </EditorHeader>
              <StyledGrid gap={0}>
                <GridColumn size={6} alignItems='center'>
                  <EditorWrapper isForm={true}>
                    <PageForm
                      data={data}
                      username={username}
                      pageSlug={pageSlug}
                      isUpdating={isUpdating}
                      onUpdateForm={onUpdatePageForm}
                      onDragEndAction={onDragEndAction}
                      createBlockAction={createBlockAction}
                      deleteBlockAction={deleteBlockAction}
                      updateBlockAction={updateBlockAction}
                      openSettingsModal={openPageSettingsModal}
                    />
                  </EditorWrapper>
                </GridColumn>
                <GridColumn size={6}>
                  <PreviewWrapper>
                    <ScaleBlock>
                      <DeviceContainer>
                        <PagePreview
                          data={data}
                          isUpdating={isUpdating}
                          username={username}
                          pageSlug={pageSlug}
                        />
                      </DeviceContainer>
                    </ScaleBlock>
                  </PreviewWrapper>
                </GridColumn>
              </StyledGrid>
            </DesktopPageWrapper>
          </StyledBrowserView>
          <StyledMobileView>
            <FlexBlock appType={appType}>
              <EditorHeader>
                <LinkToPageField onClick={onCopyToClipboard}>
                  <LinkToPageLabel>Ссылка на страницу</LinkToPageLabel>
                  <LinkToPageValue>
                    <PrefixPath>
                      {window.location.origin}/{username}
                    </PrefixPath>
                    {!isIndexPage && <PageSlug>/{pageSlug}</PageSlug>}
                  </LinkToPageValue>
                  <LinkCopyIndicator>
                    <BlinkMessage showId={copyBlinkId}>(Скопировано)</BlinkMessage>
                    <ContentCopyIcon />
                  </LinkCopyIndicator>
                </LinkToPageField>
                <LinkActionBlock>
                  <ActionWrapper onClick={openPageSettingsModal(TabValue.LINK)}>
                    <EditIcon />
                  </ActionWrapper>
                </LinkActionBlock>
              </EditorHeader>
              <PageForm
                data={data}
                username={username}
                isUpdating={isUpdating}
                pageSlug={pageSlug}
                onUpdateForm={onUpdatePageForm}
                onDragEndAction={onDragEndAction}
                createBlockAction={createBlockAction}
                deleteBlockAction={deleteBlockAction}
                updateBlockAction={updateBlockAction}
                openSettingsModal={openPageSettingsModal}
              />
            </FlexBlock>
          </StyledMobileView>
          {pageSettingsModalTab && (
            <PageSettingsModal
              onClose={closePageSettingsModal}
              onSuccess={onUpdatePageForm}
              activeTabValue={pageSettingsModalTab as TabValue}
              pageData={data}
            />
          )}
        </>
      )}
    </SelectedThemeProvider>
  );
});
