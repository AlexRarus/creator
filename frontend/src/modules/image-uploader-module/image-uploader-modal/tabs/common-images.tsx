import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';

import { useMapStoreToProps } from '../../selectors';
import { ImagesList } from '../images-list';

import { CommonImagesListWrapper } from './style';

interface IProps {
  blockType: string;
  setSelectedImages(images: IImage[]): void;
  selectedImages: IImage[];
  emptyListMessage: string;
  isMulti?: boolean;
}

export const CommonImagesList = observer((props: IProps) => {
  const { blockType, setSelectedImages, selectedImages, emptyListMessage, isMulti } = props;
  const { commonImages, getCommonImagesByBlockTypeAction } = useMapStoreToProps();

  useEffect(() => {
    getCommonImagesByBlockTypeAction(blockType);
  }, [blockType]);

  const refreshImages = () => getCommonImagesByBlockTypeAction(blockType);

  const onClickCommonImage = (image: IImage) => {
    const imageHasSelected = selectedImages.some(
      (selectedImage: IImage) => selectedImage.id === image.id
    );
    if (imageHasSelected) {
      setSelectedImages(
        selectedImages.filter((selectedImage: IImage) => selectedImage.id !== image.id)
      );
    } else if (isMulti) {
      setSelectedImages([...selectedImages, image]);
    } else {
      setSelectedImages([image]);
    }
  };

  return (
    <CommonImagesListWrapper>
      <ImagesList
        blockType={blockType}
        images={commonImages}
        onClickImage={onClickCommonImage}
        selectedImages={selectedImages}
        refreshImages={refreshImages}
        emptyListMessage={emptyListMessage}
      />
    </CommonImagesListWrapper>
  );
});
