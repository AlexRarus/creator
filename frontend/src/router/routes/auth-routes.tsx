/* eslint import/dynamic-import-chunkname: 0 */
/* eslint react/display-name: 0 */
//
import { lazy } from 'react';

import { IRoute } from '../interfaces';

const authRoutes: IRoute[] = [
  {
    exact: true,
    path: `/auth/login`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_auth_login" */ 'src/containers/auth/login')
    ),
  },
  {
    exact: true,
    path: `/auth/registration`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_auth_registration" */ 'src/containers/auth/registration')
    ),
  },
  {
    exact: true,
    path: `/auth/registration/confirm`,
    component: lazy(() =>
      import(
        /* webpackChunkName: "page_auth_registration_confirm" */ 'src/containers/auth/registration-confirm'
      )
    ),
  },
  {
    exact: true,
    path: `/auth/forgot-password`,
    component: lazy(() =>
      import(
        /* webpackChunkName: "page_auth_reset_password" */ 'src/containers/auth/reset-password'
      )
    ),
  },
  {
    exact: true,
    path: `/auth/set-password`,
    component: lazy(() =>
      import(
        /* webpackChunkName: "page_auth_reset_password_confiem" */ 'src/containers/auth/reset-password-confirm'
      )
    ),
  },
  {
    exact: true,
    path: `/auth/message`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_auth_message" */ 'src/containers/auth/message')
    ),
  },
  {
    path: `*`,
    component: lazy(() => import(/* webpackChunkName: "page_404" */ 'src/containers/404')),
  },
];

export default authRoutes;
