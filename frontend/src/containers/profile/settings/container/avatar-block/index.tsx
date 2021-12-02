import React, { useState } from 'react';
import { IAvatar, IUser } from 'src/dal/auth/interfaces';
import { AvatarPreview } from 'src/components/avatar-preview';

import { BlockWrapper, BlockHeader, BlockTitle, BlockDescription, BlockContent } from '../style';

import { AvatarEditModal } from './avatar-edit-modal';
import { AvatarWrapper, ChangeButton } from './style';

interface IProps {
  user: IUser;
  onSuccessChange(): void;
}

export const AvatarBlock = (props: IProps) => {
  const { user, onSuccessChange } = props;
  const [isOpenAvatarEditModal, setIsOpenAvatarEditModal] = useState(false);

  const openAvatarEditModal = () => setIsOpenAvatarEditModal(true);
  const closeAvatarEditModal = () => setIsOpenAvatarEditModal(false);

  const onSuccess = (data: IAvatar) => {
    onSuccessChange();
  };

  return (
    <BlockWrapper>
      <BlockHeader>
        <BlockTitle>Аватар</BlockTitle>
        <BlockDescription>Аватар можно разместить на любой из ваших страниц</BlockDescription>
      </BlockHeader>
      <BlockContent>
        <AvatarWrapper>
          <AvatarPreview avatar={user.avatar} />
          <ChangeButton onClick={openAvatarEditModal}>редактировать</ChangeButton>
        </AvatarWrapper>
      </BlockContent>
      {isOpenAvatarEditModal && (
        <AvatarEditModal
          avatar={user.avatar}
          onClose={closeAvatarEditModal}
          onSuccess={onSuccess}
        />
      )}
    </BlockWrapper>
  );
};
