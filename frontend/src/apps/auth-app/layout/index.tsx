import React, { ReactNode } from 'react';

import { Footer } from './footer';
import { AuthLayoutWrapper, PageWrapper } from './style';

interface IProps {
  children: ReactNode;
}

export function AuthLayout(props: IProps) {
  const { children } = props;

  return (
    <AuthLayoutWrapper>
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </AuthLayoutWrapper>
  );
}
