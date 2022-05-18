/* eslint import/dynamic-import-chunkname: 0 */
/* eslint react/display-name: 0 */
//
import { lazy } from 'react';

import { IRoute } from '../interfaces';

const authRoutes: IRoute[] = [
  {
    path: `/auth/login`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_auth_login" */ 'src/containers/auth/login')
    ),
  },
  {
    path: `/auth/registration`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_auth_registration" */ 'src/containers/auth/registration')
    ),
  },
  {
    path: `/auth/registration-confirm/:uid/:token`,
    Component: lazy(() =>
      import(
        /* webpackChunkName: "page_auth_registration_confirm" */ 'src/containers/auth/registration-confirm'
      )
    ),
  },
  {
    path: `/auth/reset-password`,
    Component: lazy(() =>
      import(
        /* webpackChunkName: "page_auth_reset_password" */ 'src/containers/auth/reset-password'
      )
    ),
  },
  {
    path: `/auth/reset-password-confirm/:uid/:token`,
    Component: lazy(() =>
      import(
        /* webpackChunkName: "page_auth_reset_password_confiem" */ 'src/containers/auth/reset-password-confirm'
      )
    ),
  },
  {
    path: `/auth/message`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_auth_message" */ 'src/containers/auth/message')
    ),
  },
];

export default authRoutes;
