import React from 'react';
import { ProfileLayout } from 'src/apps/profile-app/layout';

import { TemplatesListContainer } from './container';

// страница списка шаблонов
const TemplatesList = (props: any) => {
  return (
    <ProfileLayout>
      <TemplatesListContainer {...props} />
    </ProfileLayout>
  );
};

export default TemplatesList;
