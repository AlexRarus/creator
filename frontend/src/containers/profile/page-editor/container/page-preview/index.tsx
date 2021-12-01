import React from 'react';
import { PageContainer } from 'src/containers/app/page/container';
import { IPage } from 'src/dal/pages/interfaces';
import { ITheme } from 'src/dal/themes/interface';

import { PagePreviewWrapper } from './style';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  isUpdating: boolean;
  selectedTheme: ITheme | null;
}

export const PagePreview = (props: IProps) => {
  const { data: previewData, isUpdating, selectedTheme, ...restProps } = props;

  return (
    <PagePreviewWrapper>
      {isUpdating ? (
        'wait few seconds please'
      ) : (
        <PageContainer {...restProps} selectedTheme={selectedTheme} previewData={previewData} />
      )}
    </PagePreviewWrapper>
  );
};
