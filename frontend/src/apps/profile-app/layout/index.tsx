import React, { ReactNode } from 'react';

import { ProfileMenu } from './menu';
import { Footer } from './footer';
import { ProfileLayoutWrapper, PageWrapper } from './style';

interface IProps {
  children: ReactNode;
}

export function ProfileLayout(props: IProps) {
  const { children } = props;

  return (
    <ProfileLayoutWrapper>
      <ProfileMenu />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </ProfileLayoutWrapper>
  );
}
