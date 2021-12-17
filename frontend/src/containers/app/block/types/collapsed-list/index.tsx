import React, { useState } from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ICollapsedListData, ICollapsedListItem } from 'src/dal/blocks/data-interfaces';
import { ITheme } from 'src/dal/themes/interface';

import { CollapsedListItem } from './collapsed-list-item';
import { CollapsedListBlockWrapper } from './style';

interface IProps {
  block: IBlock<ICollapsedListData>;
  selectedTheme: ITheme | null;
}

export const CollapsedListPreview = (props: IProps) => {
  const { block } = props;
  const [expandItemId, setExpandItemId] = useState<number | null>(null);

  const onExpandToggle = (itemId: number) => {
    setExpandItemId(expandItemId === itemId ? null : itemId);
  };

  return (
    <CollapsedListBlockWrapper>
      {block.data.items.map((item: ICollapsedListItem) => (
        <CollapsedListItem
          key={item.id}
          item={item}
          {...block.data}
          isExpand={expandItemId === item.id}
          onExpandToggle={onExpandToggle}
        />
      ))}
    </CollapsedListBlockWrapper>
  );
};
