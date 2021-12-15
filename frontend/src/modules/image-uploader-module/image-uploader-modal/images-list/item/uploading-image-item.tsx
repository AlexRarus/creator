import React from 'react';
import { Loader } from 'src/components/loader';
import { IUploadingFile } from 'src/api/hooks/submit-forms/images/useUploadImages';
import { COLORS } from 'src/components/theme';

import { ImageItemOuter, ImageItemInner, ImageElement } from './style';

interface IProps {
  uploadingImage: IUploadingFile;
}

export const UploadingImageItem = (props: IProps) => {
  const { uploadingImage } = props;

  return (
    <ImageItemOuter isLoading={true}>
      <ImageItemInner isLoading={true}>
        <ImageElement src={URL.createObjectURL(uploadingImage.file)} />
        <Loader type='ring' size={40} color={COLORS.blue[500]} />
      </ImageItemInner>
    </ImageItemOuter>
  );
};
