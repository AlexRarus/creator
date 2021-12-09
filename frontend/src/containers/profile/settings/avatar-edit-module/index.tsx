import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { IAvatar } from 'src/dal/auth/interfaces';
import Button from 'src/components/button';
import DownloadIcon from '@mui/icons-material/Download';

import { AvatarEditModal } from './avatar-edit-modal';
import { useMapStoreToProps } from './selectors';
import { ButtonLabelWrapper, ButtonLabel } from './style';

interface IProps {
  onSuccess?(data: any): void;
}

export const AvatarEditModule = observer((props: IProps) => {
  const { onSuccess } = props;
  const { user, updateMeAction } = useMapStoreToProps();
  const [isOpenAvatarEditModal, setIsOpenAvatarEditModal] = useState(false);

  const openAvatarEditModal = () => setIsOpenAvatarEditModal(true);
  const closeAvatarEditModal = () => setIsOpenAvatarEditModal(false);

  const onSuccessHandler = (data: IAvatar) => {
    onSuccess && onSuccess(data);
    updateMeAction();
  };

  return (
    <>
      <Button onClick={openAvatarEditModal} dimension='s'>
        <ButtonLabelWrapper>
          <DownloadIcon />
          <ButtonLabel>Загрузить изображение</ButtonLabel>
        </ButtonLabelWrapper>
      </Button>
      {isOpenAvatarEditModal && (
        <AvatarEditModal
          avatar={user?.avatar}
          onClose={closeAvatarEditModal}
          onSuccess={onSuccessHandler}
        />
      )}
    </>
  );
});
