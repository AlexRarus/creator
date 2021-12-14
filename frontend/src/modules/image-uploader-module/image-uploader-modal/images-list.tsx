import React, { useEffect } from 'react';
import { IImage } from 'src/dal/images/interfaces';
import { useUploadImages, IUploadingFile } from 'src/api/hooks/submit-forms/images/useUploadImages';

import { ImagesListWrapper, ImagesListEmptyMessage } from './style';
import { ImageItem } from './image-item';
import { UploadingImageItem } from './uploading-image-item';
import { DropZone } from './drop-zone';

interface IProps {
  blockType: string;
  images: IImage[];
  onClickImage(image: IImage): void;
  selectedImages: IImage[];
  refreshImages: () => void;
  emptyListMessage?: string;
  addButton?: boolean;
  isMulti?: boolean;
  dropZoneRefCallback?: any;
}

export const ImagesList = (props: IProps) => {
  const {
    blockType,
    images,
    onClickImage,
    selectedImages,
    refreshImages,
    emptyListMessage,
    addButton = false,
    isMulti = false,
    dropZoneRefCallback,
  } = props;
  const [uploadImages, isLoading, uploadingImages, clear] = useUploadImages(blockType);

  useEffect(() => {
    if (!isLoading && uploadingImages.length) {
      // выгрузка изображений только что закончилась
      refreshImages();
    }
  }, [isLoading, uploadingImages]);

  useEffect(() => {
    clear();
  }, [images]);

  const onChangeDropZone = async (value: File | File[] | null) => {
    if (value) {
      uploadImages(Array.isArray(value) ? value : [value]);
    }
  };

  return (
    <ImagesListWrapper>
      {!images.length && emptyListMessage && (
        <ImagesListEmptyMessage>{emptyListMessage}</ImagesListEmptyMessage>
      )}
      {images.map((image: IImage) => (
        <ImageItem
          key={image.id}
          image={image}
          onClickImage={onClickImage}
          isSelected={selectedImages.some((selectedImage: IImage) => selectedImage.id === image.id)}
        />
      ))}
      {uploadingImages.map((uploadingImage: IUploadingFile) => (
        <UploadingImageItem key={uploadingImage.guid} uploadingImage={uploadingImage} />
      ))}
      {addButton && (
        <DropZone onChange={onChangeDropZone} multiple={isMulti} ref={dropZoneRefCallback} />
      )}
    </ImagesListWrapper>
  );
};
