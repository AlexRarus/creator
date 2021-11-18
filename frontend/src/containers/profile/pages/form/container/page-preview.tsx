import React from 'react';
import { PageContainer } from 'src/containers/app/page/container';

interface IProps {
  username: string;
  pageSlug: string;
}

export const PagePreview = (props: IProps) => {
  return <PageContainer {...props} />;
};
