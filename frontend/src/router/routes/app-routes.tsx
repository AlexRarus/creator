import Landing from 'src/containers/app/main';
import UserPage from 'src/containers/app/page';
import Page404 from 'src/containers/404';

import { IRoute } from '../interfaces';

export const pageNotFoundPath = (path?: string) =>
  `/404_page_not_found${path ? `?path=${path}` : ''}`;
const appRoutes: IRoute[] = [
  {
    index: true,
    path: `/`,
    Component: Landing,
  },
  {
    path: pageNotFoundPath(), // нужно для рендера страницы при SSR
    Component: Page404,
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
