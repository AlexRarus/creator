import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';

import { BlockWrapper, BlockHeader, BlockTitle, BlockDescription, BlockContent } from '../style';

import { AvatarPreview } from './avatar-preview';
import { AvatarWrapper, ChangeButton } from './style';

interface IProps {
  user: IUser;
}

export const AvatarBlock = (props: IProps) => {
  return (
    <BlockWrapper>
      <BlockHeader>
        <BlockTitle>Аватар</BlockTitle>
        <BlockDescription>Аватар можно разместить на любой из ваших страниц</BlockDescription>
      </BlockHeader>
      <BlockContent>
        <AvatarWrapper>
          <AvatarPreview />
          <ChangeButton>изменить</ChangeButton>
        </AvatarWrapper>
      </BlockContent>
    </BlockWrapper>
  );
};
