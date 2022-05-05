/* eslint import/dynamic-import-chunkname: 0 */
/* eslint react/display-name: 0 */
//
import { lazy } from 'react';

import { IRoute } from '../interfaces';

const appRoutes: IRoute[] = [
  {
    exact: true,
    path: `/profile/templates/`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_templates_list" */ 'src/containers/profile/templates-list/')
    ),
  },
  {
    exact: true,
    path: `/profile/templates/:templateSlug`,
    component: lazy(() =>
      import(
        /* webpackChunkName: "page_template_editor" */ 'src/containers/profile/template-editor/'
      )
    ),
  },
  {
    exact: true,
    path: `/profile/:username/settings/`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_settings" */ 'src/containers/profile/settings/')
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_pages_list" */ 'src/containers/profile/pages-list/')
    ),
  },
  {
    exact: true,
    path: `/profile/:username/pages/:pageSlug`,
    component: lazy(() =>
      import(
        /* webpackChunkName: "page_selected_page_editor" */ 'src/containers/profile/page-editor/'
      )
    ),
  },
  {
    exact: true,
    path: `/profile/:username/themes/:themeType?`,
    component: lazy(() =>
      import(/* webpackChunkName: "page_themes" */ 'src/containers/profile/themes/')
    ),
  },
  {
    path: `*`,
    component: lazy(() => import(/* webpackChunkName: "page_404" */ 'src/containers/404')),
  },
];

export default appRoutes;
