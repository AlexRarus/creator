import React from 'react';
import { PageContainer } from 'src/containers/app/page/container';
import { IPage } from 'src/dal/pages/interfaces';

import { PagePreviewWrapper } from './style';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
}

export const PagePreview = (props: IProps) => {
  const { data: previewData, ...restProps } = props;

  return (
    <PagePreviewWrapper>
      <PageContainer {...restProps} previewData={previewData} />
    </PagePreviewWrapper>
  );
};
