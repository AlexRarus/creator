import React from 'react';
import { useParams } from 'react-router-dom';

import { PageContainer } from './container';

interface IParams {
  username: string;
  pageSlug: string;
}

// отображение пользовательской страницы
const Page = (props: any) => {
  const params = useParams<IParams>();

  return <PageContainer {...props} {...params} />;
};

export default Page;
