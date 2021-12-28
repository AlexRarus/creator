import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITextData } from 'src/dal/blocks/data-interfaces';

import { TextBlockStyled } from './style';

interface IProps {
  block: IBlock<ITextData>;
}

export const TextPreview = (props: IProps) => {
  const { block } = props;

  return <TextBlockStyled dangerouslySetInnerHTML={{ __html: block?.data?.text }} />;
};
