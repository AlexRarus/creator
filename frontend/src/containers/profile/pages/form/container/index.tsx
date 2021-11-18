import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import ButtonLink from 'src/components/button-link';
import { BlockFormModal } from 'src/containers/profile/blocks/form/modal';

import { PageList } from './page-list';
import { PageForm } from './page-form';
import { PagePreview } from './page-preview';
import { LikePhoneWrapper } from './like-phone-wrapper';
import { useMapStoreToProps } from './selectors';
import { BlockWrapper } from './style';

interface IProps {
  username: string;
  pageSlug: string;
}

export const PagesFormContainer = observer((props: IProps) => {
  const { isLoading, getMyPageBySlugAction, data, selectPageAction } = useMapStoreToProps();
  const { username, pageSlug } = props;
  const isAuthor = useIsAuthor(username); // show 404 page
  const [isOpenAddBlockModal, setIsOpenAddBlockModal] = useState(false);

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

  const openAddBlockModal = () => setIsOpenAddBlockModal(true);
  const closeAddBlockModal = () => setIsOpenAddBlockModal(false);

  return (
    <>
      {!isAuthor && 'PagesFormContainer Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && data !== null && (
        <>
          <BrowserView>
            <Grid verticalGap={32}>
              <GridColumn size={4}>
                <BlockWrapper>
                  <PageList username={username} pageSlug={pageSlug} />
                </BlockWrapper>
              </GridColumn>
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
                    <PagePreview username={username} pageSlug={pageSlug} />
                  </LikePhoneWrapper>
                </BlockWrapper>
              </GridColumn>
            </Grid>
          </BrowserView>
          <MobileView>
            <Grid verticalGap={32}>
              <GridColumn size={12} direction='row' alignItems='center'>
                <PageForm data={data} username={username} pageSlug={pageSlug} />
              </GridColumn>
              <GridColumn>
                <ButtonLink to={`blocks/`} style={{ marginLeft: '10px' }}>
                  Add Block
                </ButtonLink>
              </GridColumn>
            </Grid>
          </MobileView>
        </>
      )}
      {isOpenAddBlockModal && (
        <BlockFormModal
          onSuccess={updatePageData}
          onClose={closeAddBlockModal}
          username={username}
          pageSlug={pageSlug}
        />
      )}
    </>
  );
});
