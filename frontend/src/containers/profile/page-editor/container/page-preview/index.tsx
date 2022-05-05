import React from 'react';
import { PageContainer } from 'src/containers/app/page/container';
import { IPage } from 'src/dal/pages/interfaces';
import { ITemplate } from 'src/dal/templates/interfaces';

import { PagePreviewWrapper } from './style';

interface IProps {
  data: IPage | ITemplate;
  username?: string;
  pageSlug?: string;
  templateSlug?: string;
  isUpdating: boolean;
}

export const PagePreview = (props: IProps) => {
  const { data: previewData, isUpdating, ...restProps } = props;

  return (
    <PagePreviewWrapper>
      {isUpdating ? (
        'wait few seconds please'
      ) : (
        <PageContainer {...restProps} previewData={previewData} />
      )}
    </PagePreviewWrapper>
  );
};
