import React from 'react';
import { IBlockType } from 'src/dal/blocks/interfaces';

import { TypeItemStyled } from './style';

interface IProps {
  type: IBlockType;
  onClick(type: IBlockType): void;
}

export const BlockTypeItem = (props: IProps) => {
  const { type, onClick } = props;

  const onClickHandler = () => onClick(type);

  return <TypeItemStyled onClick={onClickHandler}>{type.label}</TypeItemStyled>;
};
