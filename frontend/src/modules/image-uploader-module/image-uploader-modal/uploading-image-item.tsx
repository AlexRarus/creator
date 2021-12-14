import React, { useState } from 'react';
import { Loader } from 'src/components/loader';
import { IUploadingFile } from 'src/api/hooks/submit-forms/images/useUploadImages';
import { COLORS } from 'src/components/theme';

import { UploadingImageItemWrapper, ImageElement } from './style';

interface IProps {
  uploadingImage: IUploadingFile;
}

export const UploadingImageItem = (props: IProps) => {
  const { uploadingImage } = props;

  return (
    <UploadingImageItemWrapper>
      <ImageElement src={URL.createObjectURL(uploadingImage.file)} />
      <Loader type='ring' size={30} color={COLORS.blue[300]} />
    </UploadingImageItemWrapper>
  );
};
