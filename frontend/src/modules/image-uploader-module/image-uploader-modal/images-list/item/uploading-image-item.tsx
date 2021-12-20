import React, { useEffect, useState } from 'react';
import { Loader } from 'src/components/loader';
import { IUploadingFile } from 'src/api/hooks/submit-forms/images/useUploadImages';
import { COLORS } from 'src/components/theme';

import { ImageItemOuter, ImageItemInner, ImageLoader } from './style';

interface IProps {
  uploadingImage: IUploadingFile;
}

export const UploadingImageItem = (props: IProps) => {
  const { uploadingImage } = props;
  const [imageOuterElement, imageOuterRefCallback] = useState<HTMLElement | null>(null);
  const [imageOuterWidth, setImageOuterWidth] = useState(100);

  useEffect(() => {
    if (imageOuterElement) {
      setImageOuterWidth(imageOuterElement.getBoundingClientRect().width);
    }
  }, [imageOuterElement]);

  return (
    <ImageItemOuter isLoading={true} ref={imageOuterRefCallback} imageOuterWidth={imageOuterWidth}>
      <ImageItemInner isLoading={true}>
        <ImageLoader src={URL.createObjectURL(uploadingImage.file)} />
        <Loader type='ring' size={40} color={COLORS.blue[500]} />
      </ImageItemInner>
    </ImageItemOuter>
  );
};
