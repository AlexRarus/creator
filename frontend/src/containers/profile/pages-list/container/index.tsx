import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { IPage } from 'src/dal/pages/interfaces';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

import { AddPageModal } from './add-page-modal';
import { PagePreviewItem } from './page-preview-item';
import { useMapStoreToProps } from './selectors';
import {
  PagesListWrapper,
  PagesListTitleDesktop,
  NewPageButtonWrapper,
  NewPageButton,
  PageLabel,
} from './style';

interface IProps {
  username: string;
}

export const PagesListContainer = observer((props: IProps) => {
  const { isLoading, pages, getMyPagesAction, selectedPage } = useMapStoreToProps();
  const { username } = props;
  const { push } = useHistory();
  const isAuthor = useIsAuthor(username);
  const [isOpenAddPageModal, setIsOpenAddPageModal] = useState(false);

  useEffect(() => {
    if (isAuthor) {
      getMyPagesAction();
    }
  }, [username, isAuthor]);

  const openAddPageModal = () => setIsOpenAddPageModal(true);
  const closeAddPageModal = () => setIsOpenAddPageModal(false);

  const onSuccessAddPage = (data: any) => push(`/profile/${username}/pages/${data.slug}/`);

  return (
    <PagesListWrapper>
      <PagesListTitleDesktop>Мои страницы</PagesListTitleDesktop>
      {!isAuthor && 'PagesListContainer Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && pages !== null && (
        <Grid>
          {pages.map((page: IPage) => (
            <GridColumn size={2} alignItems='center' key={page.slug}>
              <PagePreviewItem username={username} page={page} selectedPage={selectedPage} />
            </GridColumn>
          ))}
          {!isLoading && (
            <GridColumn size={2} alignItems='center'>
              <NewPageButtonWrapper>
                <NewPageButton onClick={openAddPageModal}>
                  <AddIcon />
                </NewPageButton>
                <PageLabel>Новая страница</PageLabel>
              </NewPageButtonWrapper>
            </GridColumn>
          )}
        </Grid>
      )}
      {isOpenAddPageModal && (
        <AddPageModal onClose={closeAddPageModal} onSuccess={onSuccessAddPage} />
      )}
    </PagesListWrapper>
  );
});
