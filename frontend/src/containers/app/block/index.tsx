import React, { useEffect, useState } from 'react';
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
  const { isFakeBlock } = props;
  const [fakeBlock, fakeBlockRefCallback] = useState<HTMLElement | null>(null);

  // останавливаем клик по блоку в dnd обертках, чтобы не прокликивались кнопки и списки
  const onClickFakeBlock = (event: any) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (fakeBlock && isFakeBlock) {
      fakeBlock.addEventListener('click', onClickFakeBlock, true);
    }

    return () => fakeBlock?.removeEventListener('click', onClickFakeBlock);
  }, [fakeBlock, isFakeBlock]);

  const { block } = props;

  const getBlock = (block: any) => {
    switch (block.type) {
      case 'text':
        return <TextPreview {...props} />;
      case 'section':
        return <SectionPreview {...props} />;
      case 'avatar':
        return <AvatarPreview {...props} />;
      case 'list':
        return <ListPreview {...props} />;
      case 'collapsed_list':
        return <CollapsedListPreview {...props} />;
      case 'button':
        return <ButtonPreview {...props} />;
      case 'separator':
        return <SeparatorPreview {...props} />;
      default:
        return <div>Unknown block type</div>;
    }
  };

  return <div ref={fakeBlockRefCallback}>{getBlock(block)}</div>;
};
