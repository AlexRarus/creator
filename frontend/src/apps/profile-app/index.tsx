import React from 'react';
import { observer } from 'mobx-react';
import Router from 'src/router';
import routes from 'src/router/routes/profile-routes';

import { ProfileLayout } from './layout';

const ProfileApp = observer(() => {
  return (
    <ProfileLayout>
      <Router routes={routes} />
    </ProfileLayout>
  );
});

export default ProfileApp;
