import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import AuthApp from 'src/apps/auth-app';
import ProfileApp from 'src/apps/profile-app';
import App from 'src/apps/app';
import Notification from 'src/components/notification';
import { ScrollGlobalStyle } from 'src/utils/scroll';
import API from 'src/api';

import { useMapStoreToProps } from './selectors';
import { GlobalStyleApp } from './style';

const Root = observer((props: any) => {
  const { initAuthAction, logoutAction, access } = useMapStoreToProps();

  useEffect(() => {
    const responseSuccess = (response: any) => {
      const status: any = response?.status;
      if (status === 401) {
        logoutAction();
      }

      try {
        return JSON.parse(response);
      } catch (err) {
        return response;
      }
    };
    const responseFail = (error: any) => {
      const status: any = error?.response?.status;
      if (status === 401) {
        logoutAction();
      }
      return Promise.reject(error);
    };

    API.init(responseSuccess, responseFail);
  }, []);

  useEffect(() => {
    if (access) {
      initAuthAction();
    }
  }, [access]);

  return (
    <>
      <GlobalStyleApp />
      <ScrollGlobalStyle />
      <Notification maxShowItems={5} />
      <Switch>
        {!access && <Route path='/auth' render={() => <AuthApp />} />}
        {access && <Route path='/profile' render={() => <ProfileApp />} />}
        <Route path='/' render={() => <App />} />
      </Switch>
    </>
  );
});

export default Root;
