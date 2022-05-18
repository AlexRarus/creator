import React from 'react';
import { useParams } from 'react-router-dom';
import { ProfileLayout } from 'src/apps/profile-app/layout';

import { TemplateEditorContainer } from './container';

interface IParams {
  templateSlug: string;
  [key: string]: string | undefined;
}

// страница редактирования шаблона
const TemplateEditor = (props: any) => {
  const params = useParams<IParams>();

  return (
    <ProfileLayout>
      <TemplateEditorContainer {...props} {...params} />
    </ProfileLayout>
  );
};

export default TemplateEditor;
