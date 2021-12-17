import React, { useState } from 'react';
import { ICollapsedListItem } from 'src/dal/blocks/data-interfaces';
import AddIcon from '@mui/icons-material/Add';
import { AnimationHeight } from 'src/components/animation-height';

import {
  CollapsedListItemWrapper,
  CollapsedListItemTitle,
  CollapsedListItemDescription,
  TitleWrapper,
  DescriptionWrapper,
} from './style';

interface IProps {
  item: ICollapsedListItem;
}

export const CollapsedListItem = (props: IProps) => {
  const { item } = props;
  const [expandItemId, setExpandItemId] = useState<number | null>(null);
  const isExpand = expandItemId === item.id;

  const onExpandToggle = (itemId: number) => {
    setExpandItemId(expandItemId === itemId ? null : itemId);
  };

  return (
    <CollapsedListItemWrapper>
      <TitleWrapper isExpand={isExpand} onClick={() => onExpandToggle(item.id)}>
        <AddIcon />
        <CollapsedListItemTitle>{item.title}</CollapsedListItemTitle>
      </TitleWrapper>
      <DescriptionWrapper>
        <AnimationHeight isOpen={isExpand} time={200}>
          <CollapsedListItemDescription>{item.description}</CollapsedListItemDescription>
        </AnimationHeight>
      </DescriptionWrapper>
    </CollapsedListItemWrapper>
  );
};
