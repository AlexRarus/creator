import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import Button from 'src/components/button';

import { useMapStoreToProps } from './selectors';
import { MainPageWrapper } from './style';
import { MainPageMenu } from './menu';

export const MainPageContainer = observer(() => {
  const { user, logoutAction } = useMapStoreToProps();

  return (
    <>
      <MainPageMenu />
      <MainPageWrapper>
        <Grid>
          <GridColumn direction='row' alignItems='center'>
            {user && (
              <>
                <div>Hello {user.username}</div>
                <Button onClick={logoutAction} dimension='s' style={{ marginLeft: '10px' }}>
                  Logout
                </Button>
              </>
            )}
            {!user && (
              <>
                <div>You are not authorized</div>
                <Link to='/auth/login/' style={{ marginLeft: '10px' }}>
                  Login
                </Link>
              </>
            )}
          </GridColumn>
        </Grid>
      </MainPageWrapper>
    </>
  );
});
