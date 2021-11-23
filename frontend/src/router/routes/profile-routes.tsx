/* eslint import/dynamic-import-chunkname: 0 */
/* eslint react/display-name: 0 */
//
import { lazy } from 'react';

import { IRoute } from '../interfaces';

const appRoutes: IRoute[] = [
  {
    exact: true,
    path: `/profile/:username/pages/`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/profile/pages-list/')
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/:pageSlug`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/profile/page-editor/')
    ),
  },
  {
    path: `*`,
    component: lazy(() => import(/* webpackChunkName: "page_404" */ 'src/containers/404')),
  },
];

export default appRoutes;
