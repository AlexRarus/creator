import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';

import { TextPreview } from './types/text';
import { SectionPreview } from './types/section';
import { AvatarPreview } from './types/avatar';
import { ListPreview } from './types/list';
import { CollapsedListPreview } from './types/collapsed-list';
import { ButtonPreview } from './types/button';
import { SeparatorPreview } from './types/separator';

interface IProps {
  block: IBlock<any>;
  isFakeBlock?: boolean;
  onClick?: any;
}

// Отображение блоков на пользовательской странице
export const TargetBlockTypePreview = (props: IProps) => {
  const { block, onClick, isFakeBlock } = props;
  switch (block.type) {
    case 'text':
      return <TextPreview onClick={onClick} {...props} />;
    case 'section':
      return <SectionPreview {...props} />;
    case 'avatar':
      return <AvatarPreview {...props} />;
    case 'list':
      return <ListPreview {...props} />;
    case 'collapsed_list':
      return <CollapsedListPreview {...props} />;
    case 'button':
      return <ButtonPreview {...props} isFakeBlock={isFakeBlock} />;
    case 'separator':
      return <SeparatorPreview {...props} />;
    default:
      return <div onClick={onClick}>Unknown block type</div>;
  }
};
