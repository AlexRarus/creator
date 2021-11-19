import React from 'react';
import { useParams } from 'react-router-dom';

import { PageEditorContainer } from './container';

interface IParams {
  username: string;
  pageSlug: string;
}

// страница редактирования пользовательских страниц
const PageEditor = (props: any) => {
  const params = useParams<IParams>();

  return <PageEditorContainer {...props} {...params} />;
};

export default PageEditor;
