import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ICollapsedListData, ICollapsedListItem } from 'src/dal/blocks/data-interfaces';

import { CollapsedListItem } from './collapsed-list-item';
import { CollapsedListBlockWrapper } from './style';

interface IProps {
  block: IBlock<ICollapsedListData>;
}

export const CollapsedListPreview = (props: IProps) => {
  const { block } = props;

  return (
    <CollapsedListBlockWrapper>
      {block.data.items.map((item: ICollapsedListItem) => (
        <CollapsedListItem key={item.id} item={item} {...block.data} />
      ))}
    </CollapsedListBlockWrapper>
  );
};
