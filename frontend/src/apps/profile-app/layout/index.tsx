import React, { ReactNode, useEffect } from 'react';
import { Menu } from 'src/components/menu';
import { isMobile } from 'react-device-detect';
import { useAppTypeContext } from 'src/providers/app-type-provider';

import { menuItems } from './menu-items';
import { ProfileLayoutWrapper, PageWrapper } from './style';

interface IProps {
  children: ReactNode;
}

export function ProfileLayout(props: IProps) {
  const { children } = props;
  const { setAppType } = useAppTypeContext();

  useEffect(() => {
    if (isMobile) {
      // блокировка скролла для нормальной работы dnd
      setAppType('app');
      window.scrollTo(0, 0);
    }

    return () => setAppType('web');
  }, [isMobile]);

  return (
    <ProfileLayoutWrapper>
      <Menu isProfile={true} menuItems={menuItems} />
      <PageWrapper>{children}</PageWrapper>
      {/*<Footer />*/}
    </ProfileLayoutWrapper>
  );
}
