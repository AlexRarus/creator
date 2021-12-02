import React, { ReactNode } from 'react';
import { useAppTypeContext } from 'src/providers/app-type-provider';

import { Footer } from './footer';
import { ProfileLayoutWrapper, PageWrapper } from './style';

interface IProps {
  children: ReactNode;
}

export function ProfileLayout(props: IProps) {
  const { children } = props;
  // определяем тип приложения (для телефонов чтобы корректно работал днд и скролл приложения)
  const { appType } = useAppTypeContext();

  return (
    <ProfileLayoutWrapper isApp={appType === 'app'} height={window.innerHeight}>
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </ProfileLayoutWrapper>
  );
}
