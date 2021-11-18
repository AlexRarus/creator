import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { IPage } from 'src/dal/pages/interfaces';
import { isBrowser } from 'react-device-detect';

import { useMapStoreToProps } from './selectors';
import { PagesListPageWrapper } from './style';

interface IProps {
  username: string;
  pageSlug?: string; // передается на десктопе в profile/pages/form/container
  isPage?: boolean;
}

export const PagesListPageContainer = observer((props: IProps) => {
  const { isLoading, pages, getMyPagesAction, selectedPage } = useMapStoreToProps();
  const { username, pageSlug, isPage } = props;
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    if (isAuthor) {
      getMyPagesAction(username, pageSlug);
    }
  }, [username, isAuthor]);

  // если зашли на отдельную страницу в браузере, редиректим на форму выбранной страницы
  if (isPage && isBrowser && selectedPage) {
    return <Redirect to={`/profile/${username}/pages/${selectedPage.slug}/`} />;
  }

  return (
    <PagesListPageWrapper>
      {!isAuthor && 'PagesListPageContainer Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && pages !== null && (
        <Grid>
          {pages.map((page: IPage) => (
            <GridColumn size={12} direction='row' alignItems='center' key={page.slug}>
              <Link to={`/profile/${username}/pages/${page.slug}/`}>Страница "{page.slug}"</Link>
            </GridColumn>
          ))}
        </Grid>
      )}
    </PagesListPageWrapper>
  );
});
