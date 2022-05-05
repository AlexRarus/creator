import React from 'react';
import { useParams } from 'react-router-dom';

import { TemplateEditorContainer } from './container';

interface IParams {
  templateSlug: string;
}

// страница редактирования шаблона
const TemplateEditor = (props: any) => {
  const params = useParams<IParams>();

  return <TemplateEditorContainer {...props} {...params} />;
};

export default TemplateEditor;
