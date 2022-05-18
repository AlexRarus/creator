import React from 'react';
import { useParams } from 'react-router-dom';
import { ProfileLayout } from 'src/apps/profile-app/layout';

import { SettingsContainer } from './container';

interface IParams {
  username: string;
  [key: string]: string | undefined;
}

// страница настроек пользователя
const Settings = (props: any) => {
  const params = useParams<IParams>();

  return (
    <ProfileLayout>
      <SettingsContainer {...props} {...params} />
    </ProfileLayout>
  );
};

export default Settings;
