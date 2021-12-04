import React from 'react';
import { IBlockType } from 'src/dal/blocks/interfaces';
import { typeIconsMap } from 'src/containers/profile/block-editor/types-list/utils';

import { TypeItemStyled, TypeLabel } from './style';

interface IProps {
  type: IBlockType;
  onClick(type: IBlockType): void;
}

export const BlockTypeItem = (props: IProps) => {
  const { type, onClick } = props;

  const onClickHandler = () => onClick(type);

  return (
    <TypeItemStyled onClick={onClickHandler}>
      {typeIconsMap[type.slug]}
      <TypeLabel>{type.label}</TypeLabel>
    </TypeItemStyled>
  );
};
