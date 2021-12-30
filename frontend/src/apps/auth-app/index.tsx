import React, { useEffect } from 'react';
import Router from 'src/router';
import routes from 'src/router/routes/auth-routes';
import { useAppTypeContext } from 'src/providers/app-type-provider';
import { isMobile } from 'react-device-detect';

import { AuthLayout } from './layout';

const AuthApp = () => {
  const { setAppType } = useAppTypeContext();

  useEffect(() => {
    if (isMobile) {
      // блокировка скролла для нормальной работы dnd
      setAppType('app');
      window.scrollTo(0, 0);
    }

    return () => setAppType('web');
  }, [isMobile]);
  return (
    <AuthLayout>
      <Router routes={routes} />
    </AuthLayout>
  );
};

export default AuthApp;
