import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { IPage } from 'src/dal/pages/interfaces';

import { useMapStoreToProps } from './selectors';
import { PagesListWrapper } from './style';

interface IProps {
  username: string;
  pageSlug: string;
}

export const PagesListContainer = observer((props: IProps) => {
  const { isLoading, pages, getMyPagesAction, selectedPage } = useMapStoreToProps();
  const { username, pageSlug } = props;
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    if (isAuthor) {
      getMyPagesAction(pageSlug);
    }
  }, [username, isAuthor]);

  return (
    <PagesListWrapper>
      {!isAuthor && 'PagesListContainer Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && pages !== null && (
        <Grid>
          {pages.map((page: IPage) => (
            <GridColumn size={12} direction='row' alignItems='center' key={page.slug}>
              <Link to={`/profile/${username}/pages/${page.slug}/`}>
                Страница "{page.slug}" {selectedPage?.slug === page.slug ? '(Активная)' : ''}
              </Link>
            </GridColumn>
          ))}
        </Grid>
      )}
    </PagesListWrapper>
  );
});
