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
    path: `/:username/:page_slug`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/app/pages/item')
    ),
  },
  {
    exact: true,
    path: `/:username`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/app/pages/list')
    ),
  },
  {
    path: `*`,
    component: lazy(() => import(/* webpackChunkName: "page_404" */ 'src/containers/404')),
  },
];

export default appRoutes;
