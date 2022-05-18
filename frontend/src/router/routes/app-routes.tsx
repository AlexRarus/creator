import Landing from 'src/containers/app/main';
import UserPage from 'src/containers/app/page';
import Page404 from 'src/containers/404';

import { IRoute } from '../interfaces';

const appRoutes: IRoute[] = [
  {
    index: true,
    path: `/`,
    Component: Landing,
  },
  {
    path: `/:username/:pageSlug`,
    Component: UserPage,
  },
  {
    path: `/:username`,
    Component: UserPage,
  },
  {
    path: `*`,
    Component: Page404,
  },
];

export default appRoutes;
