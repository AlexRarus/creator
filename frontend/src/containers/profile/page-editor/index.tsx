import React from 'react';
import { useParams } from 'react-router-dom';
import { ProfileLayout } from 'src/apps/profile-app/layout';

import { PageEditorContainer } from './container';

interface IParams {
  username: string;
  pageSlug: string;
  [key: string]: string | undefined;
}

// страница редактирования пользовательских страниц
const PageEditor = (props: any) => {
  const params = useParams<IParams>();

  return (
    <ProfileLayout>
      <PageEditorContainer {...props} {...params} />
    </ProfileLayout>
  );
};

export default PageEditor;
