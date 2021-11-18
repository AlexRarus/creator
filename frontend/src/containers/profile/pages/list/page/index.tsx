import React from 'react';
import { useParams } from 'react-router-dom';

import { PagesListPageContainer } from '../container';

interface IParams {
  username: string;
}

const PagesListPage = (props: any) => {
  const params = useParams<IParams>();

  return <PagesListPageContainer {...props} {...params} isPage={true} />;
};

export default PagesListPage;
