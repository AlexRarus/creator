import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interface';

import { TextData } from './interfaces';
import { TextBlockStyled } from './style';

interface IProps {
  block: IBlock<TextData>;
  selectedTheme: ITheme | null;
}

export const TextPreview = (props: IProps) => {
  const { block, selectedTheme } = props;

  return (
    <TextBlockStyled
      selectedTheme={selectedTheme}
      dangerouslySetInnerHTML={{ __html: block.data.text }}
    />
  );
};
