import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';

import { useMapStoreToProps } from '../../selectors';
import { ImagesList } from '../images-list';

import { CommonImagesListWrapper } from './style';

interface IProps {
  setSelectedImages(images: IImage[]): void;
  selectedImages: IImage[];
  emptyListMessage: string;
  isMulti?: boolean;
  blockType?: string; // для какого типа блока (создать) изображения
  getBlockTypes?: string[]; // для какого типа блока запросить изображения
  getTags?: string[]; // с какими тегами запросить изображения
}

export const CommonImagesList = observer((props: IProps) => {
  const {
    blockType,
    getBlockTypes = [blockType] as string[],
    getTags,
    setSelectedImages,
    selectedImages,
    emptyListMessage,
    isMulti,
  } = props;
  const { commonImages, getCommonImagesAction } = useMapStoreToProps();

  useEffect(() => {
    getCommonImagesAction(getBlockTypes, getTags);
  }, [blockType, getTags]);

  const refreshImages = () => getCommonImagesAction(getBlockTypes, getTags);

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
