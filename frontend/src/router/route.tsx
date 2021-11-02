import React, { Suspense } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { IRoute } from './interfaces';

export default function RouteComponent(route: IRoute) {
  const { componentExtraProps = {} } = route;

  return (
    <Suspense fallback={route.fallback || ''}>
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
    </Suspense>
  );
}
