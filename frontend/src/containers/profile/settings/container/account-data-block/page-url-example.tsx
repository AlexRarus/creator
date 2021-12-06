import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { IPage } from 'src/dal/pages/interfaces';

import { PageUrlExampleWrapper, UrlDomain, UrlUsername, UrlPageSlug } from './style';

interface IProps {
  user: IUser;
  selectedPage: IPage | null;
}

export const PageUrlExample = (props: IProps) => {
  const { user, selectedPage } = props;

  return (
    <PageUrlExampleWrapper>
      <UrlDomain>{window.location.origin}</UrlDomain>/<UrlUsername>{user.username}</UrlUsername>/
      <UrlPageSlug>{selectedPage?.slug}</UrlPageSlug>
    </PageUrlExampleWrapper>
  );
};
