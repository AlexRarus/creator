import React from 'react';
import { IUser } from 'src/dal/auth/interfaces';
import { AvatarPreview } from 'src/components/avatar-preview';
import { AvatarEditModule } from 'src/containers/profile/settings/avatar-edit-module';

import { BlockWrapper, BlockHeader, BlockTitle, BlockDescription, BlockContent } from '../style';

import { AvatarWrapper, AvatarEditModuleWrapper } from './style';

interface IProps {
  user: IUser;
}

export const AvatarBlock = (props: IProps) => {
  const { user } = props;

  return (
    <BlockWrapper>
      <BlockHeader>
        <BlockTitle>Аватар</BlockTitle>
        <BlockDescription>Аватар можно разместить на любой из ваших страниц</BlockDescription>
      </BlockHeader>
      <BlockContent>
        <AvatarWrapper>
          <AvatarPreview avatar={user.avatar} />
          <AvatarEditModuleWrapper>
            <AvatarEditModule />
          </AvatarEditModuleWrapper>
        </AvatarWrapper>
      </BlockContent>
    </BlockWrapper>
  );
};
