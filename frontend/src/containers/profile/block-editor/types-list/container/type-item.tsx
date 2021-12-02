import React from 'react';
import { IBlockType } from 'src/dal/blocks/interfaces';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { TypeItemStyled, TypeLabel } from './style';

interface IProps {
  type: IBlockType;
  onClick(type: IBlockType): void;
}

const typeIconsMap = {
  1: <TextFieldsIcon />,
};

export const BlockTypeItem = (props: IProps) => {
  const { type, onClick } = props;

  const onClickHandler = () => onClick(type);

  return (
    <TypeItemStyled onClick={onClickHandler}>
      {typeIconsMap[type.id]}
      <TypeLabel>{type.label}</TypeLabel>
    </TypeItemStyled>
  );
};
