import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import Button from 'src/components/button';
import ButtonLink from 'src/components/button-link';
import { IBlock } from 'src/dal/blocks/interfaces';
import { BlockFormModal } from 'src/containers/profile/blocks/form/modal';

import { useMapStoreToProps } from './selectors';
import { PagesFormWrapper } from './style';

interface IProps {
  username: string;
  pageSlug: string;
}

export const PagesFormContainer = observer((props: IProps) => {
  const { isLoading, getMyPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug } = props;
  const isAuthor = useIsAuthor(username); // show 404 page
  const [isOpenAddBlockModal, setIsOpenAddBlockModal] = useState(false);

  useEffect(() => {
    if (isAuthor) {
      getMyPageBySlugAction(pageSlug);
    }
  }, [isAuthor, pageSlug]);

  const updatePageData = () => getMyPageBySlugAction(pageSlug);

  const openAddBlockModal = () => setIsOpenAddBlockModal(true);
  const closeAddBlockModal = () => setIsOpenAddBlockModal(false);

  return (
    <PagesFormWrapper>
      {!isAuthor && 'Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && data !== null && (
        <Grid verticalGap={32}>
          <GridColumn size={12} direction='row' alignItems='center'>
            <Grid>
              {data.blocks.map((block: IBlock<any>) => (
                <GridColumn key={block.id} size={12}>
                  {/*TODO ПОКА ТОЛЬКО ОДИН ТИП БЛОКОВ ТЕКСТ*/}
                  <div dangerouslySetInnerHTML={{ __html: block.data?.text }} />
                </GridColumn>
              ))}
            </Grid>
          </GridColumn>
          <GridColumn>
            <BrowserView>
              <Button onClick={openAddBlockModal}>Add block</Button>
            </BrowserView>
            <MobileView>
              <ButtonLink to={`blocks/`} style={{ marginLeft: '10px' }}>
                Add Block
              </ButtonLink>
            </MobileView>
          </GridColumn>
        </Grid>
      )}
      {isOpenAddBlockModal && (
        <BlockFormModal
          onSuccess={updatePageData}
          onClose={closeAddBlockModal}
          username={username}
          pageSlug={pageSlug}
        />
      )}
    </PagesFormWrapper>
  );
});
