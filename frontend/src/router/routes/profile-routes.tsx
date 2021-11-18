/* eslint import/dynamic-import-chunkname: 0 */
/* eslint react/display-name: 0 */
//
import { lazy } from 'react';

import { IRoute } from '../interfaces';

const appRoutes: IRoute[] = [
  {
    exact: true,
    path: `/profile/:username/pages/:pageSlug/blocks/`,
    component: lazy(() =>
      import(
        /* webpackChunkName: "page_landing_main" */ 'src/containers/profile/blocks/types-list/page'
      )
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/:pageSlug/blocks/:blockType/:blockId`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/profile/blocks/form/page')
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/:pageSlug`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/profile/pages/form/page')
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_landing_main" */ 'src/containers/profile/pages/list/page')
    ),
  },
];

export default appRoutes;
