import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { BrowserView } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';

import { PageForm } from './page-form';
import { PagePreview } from './page-preview';
import { useMapStoreToProps } from './selectors';
import {
  DesktopPageWrapper,
  BlockWrapper,
  PhoneWrapper,
  StyledMobileView,
  FlexBlock,
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
    data,
    selectPageAction,
    updateMyPageAction,
  } = useMapStoreToProps();
  const { username, pageSlug } = props;
  const { replace } = useHistory();
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    if (isAuthor) {
      getMyPageBySlugAction(pageSlug);
    }
  }, [isAuthor, pageSlug]);

  useEffect(() => {
    if (!isLoading && data) {
      selectPageAction(data);
    }
  }, [pageSlug, data]);

  const onUpdatePageForm = (slug?: string) => {
    if (slug) {
      replace(`/profile/${username}/pages/${slug}`);
    } else {
      getMyPageBySlugAction(pageSlug);
    }
  };

  const onDragEndPagesAction = (listIds?: any[]) => {
    const reqData = {
      id: data?.id,
      label: data?.label,
      blocks: listIds, // id блоков в том порядке в котором они должны сохраниться
      slug: pageSlug,
    };
    updateMyPageAction(reqData);
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
                  <BlockWrapper>
                    <PhoneWrapper isForm={true}>
                      <PageForm
                        data={data}
                        username={username}
                        pageSlug={pageSlug}
                        isUpdating={isUpdating}
                        onUpdatePageForm={onUpdatePageForm}
                        onDragEndPagesAction={onDragEndPagesAction}
                      />
                    </PhoneWrapper>
                  </BlockWrapper>
                </GridColumn>
                <GridColumn size={6} alignItems='center'>
                  <BlockWrapper>
                    <PhoneWrapper isForm={false}>
                      <PagePreview
                        data={data}
                        isUpdating={isUpdating}
                        username={username}
                        pageSlug={pageSlug}
                      />
                    </PhoneWrapper>
                  </BlockWrapper>
                </GridColumn>
              </Grid>
            </DesktopPageWrapper>
          </BrowserView>
          <StyledMobileView>
            <FlexBlock>
              <PageForm
                data={data}
                username={username}
                isUpdating={isUpdating}
                pageSlug={pageSlug}
                onUpdatePageForm={onUpdatePageForm}
                onDragEndPagesAction={onDragEndPagesAction}
              />
            </FlexBlock>
          </StyledMobileView>
        </>
      )}
    </>
  );
});
