import React from 'react';
import { IPage } from 'src/dal/pages/interfaces';
import { IBlock } from 'src/dal/blocks/interfaces';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import {
  PagePreviewWrapper,
  PagePreviewItemWrapper,
  PageContentPreview,
  PageLabel,
  BlockMock,
  RemoveIconWrapper,
} from './style';

interface IProps {
  username: string;
  page: IPage;
  selectedPage: IPage | null;
  isLastPage: boolean;
  onRemovePage(page: IPage): void;
}

export const PagePreviewItem = (props: IProps) => {
  const { username, page, isLastPage, onRemovePage } = props;

  const removeHandler = () => {
    onRemovePage(page);
  };

  return (
    <PagePreviewWrapper>
      <PagePreviewItemWrapper to={`/profile/${username}/pages/${page.slug}/`}>
        <PageContentPreview>
          {page.blocks.map((block: IBlock<any>) => (
            <BlockMock key={block.id} />
          ))}
        </PageContentPreview>
        <PageLabel>{page.label}</PageLabel>
      </PagePreviewItemWrapper>
      <RemoveIconWrapper disabled={isLastPage} onClick={removeHandler}>
        <DeleteForeverOutlinedIcon />
      </RemoveIconWrapper>
    </PagePreviewWrapper>
  );
};
