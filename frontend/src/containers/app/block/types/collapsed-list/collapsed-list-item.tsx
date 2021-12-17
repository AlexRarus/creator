import React from 'react';
import { ICollapsedListItem } from 'src/dal/blocks/data-interfaces';
import AddIcon from '@mui/icons-material/Add';
import { AnimationHeight } from 'src/components/animation-height';

import {
  CollapsedListItemWrapper,
  CollapsedListItemTitle,
  CollapsedListItemDescription,
  CollapsedTrigger,
  Content,
} from './style';

interface IProps {
  item: ICollapsedListItem;
  isExpand: boolean;
  onExpandToggle(itemId: number): void;
}

export const CollapsedListItem = (props: IProps) => {
  const { item, isExpand, onExpandToggle } = props;

  return (
    <CollapsedListItemWrapper>
      <CollapsedTrigger isExpand={isExpand}>
        <AddIcon onClick={() => onExpandToggle(item.id)} />
      </CollapsedTrigger>
      <Content>
        <CollapsedListItemTitle>{item.title}</CollapsedListItemTitle>
        <AnimationHeight isOpen={isExpand} time={200}>
          <CollapsedListItemDescription>{item.description}</CollapsedListItemDescription>
        </AnimationHeight>
      </Content>
    </CollapsedListItemWrapper>
  );
};
