import { IMenuItem } from 'src/components/menu/interfaces';

export const menuItems: IMenuItem[] = [
  {
    label: 'Страница',
    url: '/profile/{{username}}/pages/{{pageSlug}}/',
  },
  {
    label: 'Заявки',
    url: '/profile/{{username}}/requests/',
  },
  {
    label: 'Темы',
    url: '/profile/{{username}}/themes/',
  },
  {
    label: 'Шаблоны',
    url: '/profile/templates/',
  },
];
