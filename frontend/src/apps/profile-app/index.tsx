import React from 'react';
import { observer } from 'mobx-react';
import Router from 'src/router';
import routes from 'src/router/routes/profile-routes';

const ProfileApp = observer(() => {
  return (
    <div>
      <Router routes={routes} />
    </div>
  );
});

export default ProfileApp;
