import React from 'react';
import { useParams } from 'react-router-dom';

import { PagesFormContainer } from '../container';

interface IParams {
  username: string;
  pageSlug: string;
}

const PagesForm = (props: any) => {
  const params = useParams<IParams>();

  return <PagesFormContainer {...props} {...params} />;
};

export default PagesForm;
