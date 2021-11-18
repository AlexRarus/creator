import React from 'react';
import { observer } from 'mobx-react';
import { BrowserView, MobileView } from 'react-device-detect';

import { DesktopMenu } from './desktop';
import { MobileMenu } from './mobile';
import { useMapStoreToProps } from './selectors';

export const Menu = observer(() => {
  const { user, logoutAction, selectedPage } = useMapStoreToProps();

  return (
    <>
      <BrowserView>
        <DesktopMenu user={user} logoutAction={logoutAction} selectedPage={selectedPage} />
      </BrowserView>
      <MobileView>
        <MobileMenu user={user} logoutAction={logoutAction} selectedPage={selectedPage} />
      </MobileView>
    </>
  );
});
