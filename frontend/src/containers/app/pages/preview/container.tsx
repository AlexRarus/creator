import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import ButtonLink from 'src/components/button-link';

import { useMapStoreToProps } from './selectors';
import { PagesPreviewWrapper } from './style';

interface IParams {
  username: string;
  pageSlug: string;
}

export const PagesPreviewContainer = observer(() => {
  const { isLoading, getPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug } = useParams<IParams>();
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    getPageBySlugAction(username, pageSlug);
  }, [isAuthor, pageSlug]);

  return (
    <PagesPreviewWrapper>
      {isLoading && 'Loading...'}
      {!isLoading && data !== null && (
        <Grid>
          <GridColumn size={12} direction='row' alignItems='center'>
            <div>
              Preview page "{data.id}" - "{data.slug}"
            </div>
            {isAuthor && (
              <ButtonLink
                to={`/profile/${username}/pages/${data.slug}/`}
                style={{ marginLeft: '10px' }}>
                Edit Page
              </ButtonLink>
            )}
          </GridColumn>
        </Grid>
      )}
    </PagesPreviewWrapper>
  );
});
