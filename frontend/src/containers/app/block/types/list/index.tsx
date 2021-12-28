import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IListData, IListItem } from 'src/dal/blocks/data-interfaces';

import { ListItem } from './list-item';
import { ListBlockWrapper } from './style';

interface IProps {
  block: IBlock<IListData>;
}

export const ListPreview = (props: IProps) => {
  const { block } = props;

  return (
    <ListBlockWrapper>
      {block.data.items.map((item: IListItem) => (
        <ListItem key={item.id} item={item} {...block.data} />
      ))}
    </ListBlockWrapper>
  );
};
