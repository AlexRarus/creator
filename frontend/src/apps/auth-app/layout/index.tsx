import React, { ReactNode } from 'react';
import { Menu } from 'src/components/menu';

import { Footer } from './footer';
import { AuthLayoutWrapper, PageWrapper } from './style';

interface IProps {
  children: ReactNode;
}

export function AuthLayout(props: IProps) {
  const { children } = props;

  return (
    <AuthLayoutWrapper>
      <Menu isProfile={false} />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </AuthLayoutWrapper>
  );
}
