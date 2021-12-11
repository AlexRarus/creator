import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interface';

import { ButtonBlock, Title, SubTitle } from './style';

interface IProps {
  block: IBlock<any>;
  selectedTheme: ITheme | null;
}

export const ButtonPreview = (props: IProps) => {
  const { block, selectedTheme } = props;

  return (
    <ButtonBlock {...selectedTheme?.button}>
      <Title>{block?.data?.label}</Title>
      <SubTitle>{block?.data?.description}</SubTitle>
    </ButtonBlock>
  );
};
