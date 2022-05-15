import { IPage } from 'src/dal/pages/interfaces';
import { IUser } from 'src/dal/auth/interfaces';

export const useDefaultValues = (pageData: IPage, user: IUser | null) => {
  return {
    isIndex: pageData.id === user?.index_page?.id,
    slug: pageData.slug,
    title: '',
    username: user?.username || '',
  };
};
