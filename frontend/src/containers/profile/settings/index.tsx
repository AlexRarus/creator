import React from 'react';
import { useParams } from 'react-router-dom';

import { SettingsContainer } from './container';

interface IParams {
  username: string;
}

// страница настроек пользователя
const Settings = (props: any) => {
  const params = useParams<IParams>();

  return <SettingsContainer {...props} {...params} />;
};

export default Settings;
