import React from 'react';
import { useParams } from 'react-router-dom';
import { ProfileLayout } from 'src/apps/profile-app/layout';

import { PagesListContainer } from './container';

interface IParams {
  username: string;
  [key: string]: string | undefined;
}

// страница списка пользовательских страниц
const PagesList = (props: any) => {
  const params = useParams<IParams>();

  return (
    <ProfileLayout>
      <PagesListContainer {...props} {...params} />
    </ProfileLayout>
  );
};

export default PagesList;
