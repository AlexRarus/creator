import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { BlockEditorModal } from 'src/containers/profile/block-editor';

import { PageForm } from './page-form';
import { PagePreview } from './page-preview';
import { LikePhoneWrapper } from './like-phone-wrapper';
import { useMapStoreToProps } from './selectors';
import { BlockWrapper } from './style';

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

  const updatePageData = () => getMyPageBySlugAction(pageSlug);

  const openAddBlockModal = () => {
    console.log('openAddBlockModal');
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
            <Grid verticalGap={32}>
              <GridColumn size={4}>
                <BlockWrapper>
                  <LikePhoneWrapper>
                    <PageForm
                      data={data}
                      username={username}
                      pageSlug={pageSlug}
                      onClickAddBlock={openAddBlockModal}
                    />
                  </LikePhoneWrapper>
                </BlockWrapper>
              </GridColumn>
              <GridColumn size={4}>
                <BlockWrapper>
                  <LikePhoneWrapper>
                    <PagePreview data={data} username={username} pageSlug={pageSlug} />
                  </LikePhoneWrapper>
                </BlockWrapper>
              </GridColumn>
            </Grid>
          </BrowserView>
          <MobileView>
            <Grid verticalGap={32}>
              <GridColumn size={12} direction='row' alignItems='center'>
                <PageForm
                  data={data}
                  username={username}
                  pageSlug={pageSlug}
                  onClickAddBlock={openAddBlockModal}
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
