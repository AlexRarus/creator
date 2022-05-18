import React, { Fragment, Suspense } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { isBrowser } from 'src/utils/detectEnvironment';

import { IRoute } from './interfaces';

// todo ssr костыль
const SsrCompatibleSuspense = isBrowser ? Suspense : Fragment;

export default function RouteComponent(route: IRoute) {
  const { componentExtraProps = {} } = route;

  return (
    <SsrCompatibleSuspense fallback={route.fallback || ''}>
      <Route
        exact={route.exact}
        path={route.path}
        render={(props: RouteComponentProps) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : (
            route.component && (
              <route.component {...props} {...componentExtraProps} routes={route.routes} />
            )
          )
        }
      />
    </SsrCompatibleSuspense>
  );
}
