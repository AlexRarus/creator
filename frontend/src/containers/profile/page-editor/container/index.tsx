import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { BrowserView } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { DeviceContainer } from 'src/containers/profile/device-wrapper';

import { PageForm } from './page-form';
import { PagePreview } from './page-preview';
import { useMapStoreToProps } from './selectors';
import {
  DesktopPageWrapper,
  // BlockWrapper,
  EditorWrapper,
  StyledMobileView,
  FlexBlock,
  ScaleBlock,
} from './style';

interface IProps {
  username: string;
  pageSlug: string;
}

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
    selectedTheme,
    createBlockAction,
    updateBlockAction,
    user,
  } = useMapStoreToProps();
  const { username, pageSlug } = props;
  const { replace } = useHistory();
  const isAuthor = useIsAuthor(username);
  const [initialized, setInitialized] = useState(false);

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
  const onUpdatePageForm = (slug?: string) => {
    if (slug) {
      replace(`/profile/${username}/pages/${slug}`);
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

  return (
    <>
      {!isAuthor && 'PageEditorContainer Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && data !== null && (
        <>
          <BrowserView>
            <DesktopPageWrapper>
              <Grid verticalGap={32}>
                <GridColumn size={6} alignItems='center'>
                  <EditorWrapper isForm={true}>
                    <PageForm
                      data={data}
                      selectedTheme={selectedTheme}
                      username={username}
                      pageSlug={pageSlug}
                      isUpdating={isUpdating}
                      onUpdatePageForm={onUpdatePageForm}
                      onDragEndAction={onDragEndAction}
                      createBlockAction={createBlockAction}
                      deleteBlockAction={deleteBlockAction}
                      updateBlockAction={updateBlockAction}
                    />
                  </EditorWrapper>
                </GridColumn>
                <GridColumn size={6} alignItems='center'>
                  <ScaleBlock>
                    <DeviceContainer>
                      <PagePreview
                        data={data}
                        selectedTheme={selectedTheme}
                        isUpdating={isUpdating}
                        username={username}
                        pageSlug={pageSlug}
                      />
                    </DeviceContainer>
                  </ScaleBlock>
                </GridColumn>
              </Grid>
            </DesktopPageWrapper>
          </BrowserView>
          <StyledMobileView>
            <FlexBlock>
              <PageForm
                data={data}
                selectedTheme={selectedTheme}
                username={username}
                isUpdating={isUpdating}
                pageSlug={pageSlug}
                onUpdatePageForm={onUpdatePageForm}
                onDragEndAction={onDragEndAction}
                createBlockAction={createBlockAction}
                deleteBlockAction={deleteBlockAction}
                updateBlockAction={updateBlockAction}
              />
            </FlexBlock>
          </StyledMobileView>
        </>
      )}
    </>
  );
});
