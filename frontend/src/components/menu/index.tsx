import React from 'react';
import { observer } from 'mobx-react';
import { BrowserView, MobileView } from 'react-device-detect';

import { DesktopMenu } from './desktop';
import { MobileMenu } from './mobile';
import { useMapStoreToProps } from './selectors';
import { IMenuItem } from './interfaces';

interface IProps {
  isProfile: boolean;
  menuItems?: IMenuItem[];
}

export const Menu = observer((props: IProps) => {
  const { isProfile, menuItems = [] } = props;
  const { user, logoutAction, selectedPage } = useMapStoreToProps();

  return (
    <>
      <BrowserView>
        <DesktopMenu
          user={user}
          logoutAction={logoutAction}
          selectedPage={selectedPage}
          isProfile={isProfile}
          menuItems={menuItems}
        />
      </BrowserView>
      <MobileView>
        <MobileMenu
          user={user}
          logoutAction={logoutAction}
          selectedPage={selectedPage}
          isProfile={isProfile}
          menuItems={menuItems}
        />
      </MobileView>
    </>
  );
});
