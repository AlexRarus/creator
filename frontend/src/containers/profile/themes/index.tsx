import React from 'react';
import { useParams } from 'react-router-dom';
import { ProfileLayout } from 'src/apps/profile-app/layout';

import { ThemesContainer } from './container';

interface IParams {
  username?: string;
  themeType?: string;
  [key: string]: string | undefined;
}

// страница списка тем
const ThemesPage = (props: any) => {
  const params = useParams<IParams>();

  return (
    <ProfileLayout>
      <ThemesContainer {...props} {...params} />
    </ProfileLayout>
  );
};

export default ThemesPage;
