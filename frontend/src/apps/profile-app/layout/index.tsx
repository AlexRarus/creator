import React, { ReactNode } from 'react';
import { Menu } from 'src/components/menu';

import { menuItems } from './menu-items';
import { Footer } from './footer';
import { ProfileLayoutWrapper, PageWrapper } from './style';

interface IProps {
  children: ReactNode;
}

export function ProfileLayout(props: IProps) {
  const { children } = props;

  return (
    <ProfileLayoutWrapper>
      <Menu isProfile={true} menuItems={menuItems} />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </ProfileLayoutWrapper>
  );
}
