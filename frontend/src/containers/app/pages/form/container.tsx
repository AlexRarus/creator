import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import ButtonLink from 'src/components/button-link';

import { useMapStoreToProps } from './selectors';
import { PagesFormWrapper } from './style';

interface IParams {
  username: string;
  pageSlug: string;
}

export const PagesFormContainer = observer(() => {
  const { isLoading, getMyPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug } = useParams<IParams>();
  const isAuthor = useIsAuthor(username); // show 404 page

  useEffect(() => {
    if (isAuthor) {
      getMyPageBySlugAction(pageSlug);
    }
  }, [isAuthor, pageSlug]);

  return (
    <PagesFormWrapper>
      {!isAuthor && 'Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && data !== null && (
        <Grid>
          <GridColumn size={12} direction='row' alignItems='center'>
            <div>Form "{data.slug}"</div>
            <ButtonLink to={`/${username}/${data.slug}`} style={{ marginLeft: '10px' }}>
              Show Preview
            </ButtonLink>
          </GridColumn>
        </Grid>
      )}
    </PagesFormWrapper>
  );
});
