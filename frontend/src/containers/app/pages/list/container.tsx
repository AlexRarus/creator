import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';

import { useMapStoreToProps } from './selectors';
import { PagesListPageWrapper } from './style';

interface IParams {
  username: string;
}

export const PagesListPageContainer = observer(() => {
  const { user, getPagesListByUsernameAction } = useMapStoreToProps();
  const { username } = useParams<IParams>();

  useEffect(() => {
    getPagesListByUsernameAction(username);
  }, [username]);

  return (
    <PagesListPageWrapper>
      <Grid>
        <GridColumn direction='row' alignItems='center'>
          Hello {user?.username}
        </GridColumn>
      </Grid>
    </PagesListPageWrapper>
  );
});
