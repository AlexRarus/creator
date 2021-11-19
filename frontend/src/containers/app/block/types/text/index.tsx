import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';

import { TextData } from './interfaces';
import { TextBlockStyled } from './style';

interface IProps {
  block: IBlock<TextData>;
}

export const TextPreview = (props: IProps) => {
  const { block } = props;

  return <TextBlockStyled dangerouslySetInnerHTML={{ __html: block.data.text }} />;
};
