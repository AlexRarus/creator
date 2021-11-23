import React from 'react';
import { useParams } from 'react-router-dom';

import { PagesListContainer } from './container';

interface IParams {
  username: string;
}

// страница списка пользовательских страниц
const PagesList = (props: any) => {
  const params = useParams<IParams>();

  return <PagesListContainer {...props} {...params} />;
};

export default PagesList;
