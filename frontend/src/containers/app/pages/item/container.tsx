import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';

import { useMapStoreToProps } from './selectors';
import { PagesItemPageWrapper } from './style';

interface IParams {
  username: string;
  pageSlug: string;
}

export const PagesItemPageContainer = observer(() => {
  const { user, getPageBySlugAction } = useMapStoreToProps();
  const { username, pageSlug } = useParams<IParams>();

  useEffect(() => {
    getPageBySlugAction(username, pageSlug);
  }, [username, pageSlug]);

  return (
    <PagesItemPageWrapper>
      <Grid>
        <GridColumn direction='row' alignItems='center'>
          Hello {user?.username}
        </GridColumn>
      </Grid>
    </PagesItemPageWrapper>
  );
});
