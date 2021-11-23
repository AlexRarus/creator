import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { IPage } from 'src/dal/pages/interfaces';
import AddIcon from '@mui/icons-material/Add';

import { PagePreviewItem } from './page-preview-item';
import { useMapStoreToProps } from './selectors';
import { PagesListWrapper, NewPageButton } from './style';

interface IProps {
  username: string;
}

export const PagesListContainer = observer((props: IProps) => {
  const { isLoading, pages, getMyPagesAction, selectedPage } = useMapStoreToProps();
  const { username } = props;
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    if (isAuthor) {
      getMyPagesAction();
    }
  }, [username, isAuthor]);

  return (
    <PagesListWrapper>
      {!isAuthor && 'PagesListContainer Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && pages !== null && (
        <Grid>
          {pages.map((page: IPage) => (
            <GridColumn size={2} alignItems='center' key={page.slug}>
              <PagePreviewItem username={username} page={page} selectedPage={selectedPage} />
            </GridColumn>
          ))}
          <GridColumn size={2} alignItems='center'>
            <NewPageButton>
              <AddIcon />
            </NewPageButton>
          </GridColumn>
        </Grid>
      )}
    </PagesListWrapper>
  );
});
