import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interface';

import { TextPreview } from './types/text';
import { SectionPreview } from './types/section';
import { ButtonPreview } from './types/button';

interface IProps {
  block: IBlock<any>;
  selectedTheme: ITheme | null;
  onClick?: any;
}

// Отображение блоков на пользовательской странице
export const TargetBlockTypePreview = (props: IProps) => {
  const { block, selectedTheme, onClick } = props;
  switch (block.type) {
    case 'text':
      return <TextPreview onClick={onClick} selectedTheme={selectedTheme} {...props} />;
    case 'section':
      return <SectionPreview section={block} selectedTheme={selectedTheme} />;
    case 'button':
      return <ButtonPreview selectedTheme={selectedTheme} {...props} />;
    default:
      return <div onClick={onClick}>Unknown block type</div>;
  }
};
