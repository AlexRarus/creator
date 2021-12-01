import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interface';

import { TextPreview } from './types/text';

interface IProps {
  block: IBlock<any>;
  selectedTheme: ITheme | null;
}

// Отображение блоков на пользовательской странице
export const TargetBlockTypePreview = (props: IProps) => {
  const { block, selectedTheme } = props;
  switch (block.type) {
    case 'text':
      return <TextPreview selectedTheme={selectedTheme} {...props} />;
    default:
      return <div>Unknown block type</div>;
  }
};
