import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { BlockEditorModal } from 'src/containers/profile/block-editor';

import { PageForm } from './page-form';
import { PagePreview } from './page-preview';
import { useMapStoreToProps } from './selectors';
import { DesktopPageWrapper, BlockWrapper, PhoneWrapper } from './style';

interface IProps {
  username: string;
  pageSlug: string;
}

export const PageEditorContainer = observer((props: IProps) => {
  const {
    isLoading,
    getMyPageBySlugAction,
    data,
    selectPageAction,
    resetAction,
  } = useMapStoreToProps();
  const { username, pageSlug } = props;
  const { replace } = useHistory();
  const isAuthor = useIsAuthor(username);
  const [isOpenAddBlockModal, setIsOpenAddBlockModal] = useState(false);

  useEffect(() => {
    return () => resetAction();
  }, []);

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

  const updatePageData = () => {
    getMyPageBySlugAction(pageSlug);
  };

  const onSubmitPageFormSuccess = (pageData: any) => {
    if (pageData.slug) {
      replace(`/profile/${username}/pages/${pageData.slug}`);
    } else {
      console.warn('СТРАНИЦА НЕ ОБНОВИЛАСЬ');
    }
  };

  const openAddBlockModal = () => {
    setIsOpenAddBlockModal(true);
  };
  const closeAddBlockModal = () => setIsOpenAddBlockModal(false);

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
                        onClickAddBlock={openAddBlockModal}
                        onSubmitSuccess={onSubmitPageFormSuccess}
                      />
                    </PhoneWrapper>
                  </BlockWrapper>
                </GridColumn>
                <GridColumn size={6} alignItems='center'>
                  <BlockWrapper>
                    <PhoneWrapper isForm={false}>
                      <PagePreview data={data} username={username} pageSlug={pageSlug} />
                    </PhoneWrapper>
                  </BlockWrapper>
                </GridColumn>
              </Grid>
            </DesktopPageWrapper>
          </BrowserView>
          <MobileView>
            <Grid verticalGap={32}>
              <GridColumn size={12} alignItems='center'>
                <PageForm
                  data={data}
                  username={username}
                  pageSlug={pageSlug}
                  onClickAddBlock={openAddBlockModal}
                  onSubmitSuccess={onSubmitPageFormSuccess}
                />
              </GridColumn>
            </Grid>
          </MobileView>
        </>
      )}
      {isOpenAddBlockModal && (
        <BlockEditorModal
          onSuccess={updatePageData}
          onClose={closeAddBlockModal}
          username={username}
          pageSlug={pageSlug}
        />
      )}
    </>
  );
});
