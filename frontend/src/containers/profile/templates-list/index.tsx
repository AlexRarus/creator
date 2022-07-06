import React from 'react';
import { ProfileLayout } from 'src/apps/profile-app/layout';
import { useParams } from 'react-router-dom';

import { TemplatesListContainer } from './container';

interface IParams {
  username?: string;
  templateType?: string;
  [key: string]: string | undefined;
}

// страница списка шаблонов
const TemplatesList = (props: any) => {
  const params = useParams<IParams>();

  return (
    <ProfileLayout>
      <TemplatesListContainer {...props} {...params} />
    </ProfileLayout>
  );
};

export default TemplatesList;
