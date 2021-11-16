import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams, Link } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { IPage } from 'src/dal/pages/interfaces';
import { useQuery } from 'src/hooks/useQuery';

import { useMapStoreToProps } from './selectors';
import { PagesListPageWrapper } from './style';

interface IParams {
  username: string;
}

export const PagesListPageContainer = observer(() => {
  const { isLoading, pages, getMyPagesAction } = useMapStoreToProps();
  const { username } = useParams<IParams>();
  const { redirectFrom } = useQuery();
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    if (isAuthor) {
      getMyPagesAction(username, redirectFrom);
    }
  }, [username, isAuthor, redirectFrom]);

  return (
    <PagesListPageWrapper>
      {!isAuthor && 'Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && pages !== null && (
        <Grid>
          {pages.map((page: IPage) => (
            <GridColumn size={12} direction='row' alignItems='center' key={page.slug}>
              <Link to={`${page.slug}`}>Страница "{page.slug}"</Link>
            </GridColumn>
          ))}
        </Grid>
      )}
    </PagesListPageWrapper>
  );
});
