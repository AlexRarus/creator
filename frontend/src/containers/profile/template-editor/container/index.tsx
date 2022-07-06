import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { GridColumn } from 'src/components/grid';
import { DeviceContainer } from 'src/containers/profile/device-wrapper/new-iphone';
import { SelectedThemeProvider } from 'src/providers/selected-theme-provider';
import { useAppTypeContext } from 'src/providers/app-type-provider';

import { PageForm } from '../../page-editor/container/page-form';
import { PagePreview } from '../../page-editor/container/page-preview';

import { TemplateSettingsModal, TabValue } from './template-settings-modal';
import { useMapStoreToProps } from './selectors';
import {
  StyledGrid,
  DesktopTemplateWrapper,
  StyledBrowserView,
  EditorWrapper,
  StyledMobileView,
  ScaleBlock,
  PreviewWrapper,
  FlexBlock,
} from './style';

interface IProps {
  username: string;
  templateType: string;
  templateSlug: string;
}

export const TemplateEditorContainer = observer((props: IProps) => {
  const {
    isLoading,
    isUpdating,
    getTemplateBySlugAction,
    updateSelectedTemplateAction,
    updateTemplateBlocksAction,
    data,
    deleteBlockAction,
    createBlockAction,
    updateBlockAction,
    user,
  } = useMapStoreToProps();
  const { appType } = useAppTypeContext();
  const { username, templateType, templateSlug } = props;
  const [templateSettingsModalTab, setTemplateSettingsModalTab] = useState<TabValue | null>(null);
  const navigate = useNavigate();
  const [initialized, setInitialized] = useState(false);

  const openTemplateSettingsModal = (activeTab = TabValue.LINK) => () =>
    setTemplateSettingsModalTab(activeTab);
  const closeTemplateSettingsModal = () => setTemplateSettingsModalTab(null);

  useEffect(() => {
    // todo переделать на IS_ADMIN
    getTemplateBySlugAction(templateSlug);
  }, [templateSlug]);

  useEffect(() => {
    // некоторые блоки зависят от юзера, если он изменился нужно обновить страницу
    // todo переделать на IS_ADMIN
    if (initialized) {
      updateSelectedTemplateAction();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && data) {
      setInitialized(true); // считаем страницу готовой когда получили data
    }
  }, [templateSlug, data]);

  // todo передавать slug ТОЛЬКО если он изменился в настройках страницы
  const onUpdateTemplateForm = (slug?: string) => {
    if (slug) {
      navigate(`/profile/${username}/templates/${templateType}/${slug}`, { replace: true });
    } else {
      updateSelectedTemplateAction();
    }
  };

  const onDragEndAction = (listIds?: any[]) => {
    const reqData = {
      id: data?.id,
      label: data?.label,
      blocks: listIds, // id блоков в том порядке в котором они должны сохраниться
      slug: templateSlug,
      type: templateType,
    };
    updateTemplateBlocksAction(reqData);
  };

  return (
    <SelectedThemeProvider selectedTheme={user?.theme}>
      {isLoading && 'Loading...'}
      {!isLoading && data !== null && (
        <>
          <StyledBrowserView>
            <DesktopTemplateWrapper>
              <StyledGrid gap={0}>
                <GridColumn size={6} alignItems='center'>
                  <EditorWrapper isForm={true}>
                    <PageForm
                      data={data}
                      templateSlug={templateSlug}
                      isUpdating={isUpdating}
                      onUpdateForm={onUpdateTemplateForm}
                      onDragEndAction={onDragEndAction}
                      createBlockAction={createBlockAction}
                      deleteBlockAction={deleteBlockAction}
                      updateBlockAction={updateBlockAction}
                      openSettingsModal={openTemplateSettingsModal}
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
                          templateSlug={templateSlug}
                        />
                      </DeviceContainer>
                    </ScaleBlock>
                  </PreviewWrapper>
                </GridColumn>
              </StyledGrid>
            </DesktopTemplateWrapper>
          </StyledBrowserView>
          <StyledMobileView>
            <FlexBlock appType={appType}>
              <PageForm
                data={data}
                isUpdating={isUpdating}
                templateSlug={templateSlug}
                onUpdateForm={onUpdateTemplateForm}
                onDragEndAction={onDragEndAction}
                createBlockAction={createBlockAction}
                deleteBlockAction={deleteBlockAction}
                updateBlockAction={updateBlockAction}
                openSettingsModal={openTemplateSettingsModal}
              />
            </FlexBlock>
          </StyledMobileView>
          {templateSettingsModalTab && (
            <TemplateSettingsModal
              templateType={templateType}
              onClose={closeTemplateSettingsModal}
              onSuccess={onUpdateTemplateForm}
              activeTabValue={templateSettingsModalTab as TabValue}
              templateData={data}
            />
          )}
        </>
      )}
    </SelectedThemeProvider>
  );
});
