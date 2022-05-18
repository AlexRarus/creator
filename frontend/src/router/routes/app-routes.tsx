import Landing from 'src/containers/app/main';
import UserPage from 'src/containers/app/page';
import Page404 from 'src/containers/404';

import { IRoute } from '../interfaces';

const appRoutes: IRoute[] = [
  {
    exact: true,
    path: `/`,
    component: Landing,
  },
  {
    exact: true,
    path: `/:username/:pageSlug?`,
    component: UserPage,
  },
  {
    path: `*`,
    component: Page404,
  },
];

export default appRoutes;
