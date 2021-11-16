/* eslint import/dynamic-import-chunkname: 0 */
/* eslint react/display-name: 0 */
//
import { lazy } from 'react';

import { IRoute } from '../interfaces';

const appRoutes: IRoute[] = [
  {
    exact: true,
    path: `/`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/app/main')
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/:pageSlug`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/app/pages/form')
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/app/pages/list')
    ),
  },
  {
    exact: true,
    path: `/:username/:pageSlug`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/app/pages/preview')
    ),
  },
  {
    path: `*`,
    component: lazy(() => import(/* webpackChunkName: "page_404" */ 'src/containers/404')),
  },
];

export default appRoutes;
