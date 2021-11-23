import React from 'react';
import { IPage } from 'src/dal/pages/interfaces';
import { IBlock } from 'src/dal/blocks/interfaces';

import { PagePreviewItemWrapper, PageContentPreview, PageLabel, BlockMock } from './style';

interface IProps {
  username: string;
  page: IPage;
  selectedPage: IPage | null;
}

export const PagePreviewItem = (props: IProps) => {
  const { username, page } = props;

  return (
    <PagePreviewItemWrapper to={`/profile/${username}/pages/${page.slug}/`}>
      <PageContentPreview>
        {page.blocks.map((block: IBlock<any>) => (
          <BlockMock key={block.id} />
        ))}
      </PageContentPreview>
      <PageLabel>{page.label}</PageLabel>
    </PagePreviewItemWrapper>
  );
};
