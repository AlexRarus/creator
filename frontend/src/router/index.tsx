import React from 'react';
import { Switch } from 'react-router';

import { IRoute } from './interfaces';
import Route from './route';

interface IProps {
  routes: IRoute[];
}

export default function Router(props: IProps) {
  const { routes } = props;

  return (
    <Switch>
      {routes.map((route: IRoute) => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );
}
