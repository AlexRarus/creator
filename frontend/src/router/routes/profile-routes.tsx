/* eslint import/dynamic-import-chunkname: 0 */
/* eslint react/display-name: 0 */
//
import { lazy } from 'react';

import { IRoute } from '../interfaces';

const appRoutes: IRoute[] = [
  {
    path: `/profile/templates/`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_templates_list" */ 'src/containers/profile/templates-list/')
    ),
  },
  {
    path: `/profile/templates/:templateSlug`,
    Component: lazy(() =>
      import(
        /* webpackChunkName: "page_template_editor" */ 'src/containers/profile/template-editor/'
      )
    ),
  },
  {
    path: `/profile/:username/settings/`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_settings" */ 'src/containers/profile/settings/')
    ),
  },
  {
    path: `/profile/:username/pages/`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_pages_list" */ 'src/containers/profile/pages-list/')
    ),
  },
  {
    path: `/profile/:username/pages/:pageSlug`,
    Component: lazy(() =>
      import(
        /* webpackChunkName: "page_selected_page_editor" */ 'src/containers/profile/page-editor/'
      )
    ),
  },
  {
    path: `/profile/:username/themes`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_themes" */ 'src/containers/profile/themes/')
    ),
  },
  {
    path: `/profile/:username/themes/:themeType`,
    Component: lazy(() =>
      import(/* webpackChunkName: "page_themes" */ 'src/containers/profile/themes/')
    ),
  },
];

export default appRoutes;
