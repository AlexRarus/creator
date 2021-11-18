import React from 'react';
import { PagesListPageContainer } from 'src/containers/profile/pages/list/container';

interface IProps {
  username: string;
  pageSlug: string;
}

export const PageList = (props: IProps) => {
  return <PagesListPageContainer {...props} />;
};
