import React, { useEffect } from 'react';
import { IImage } from 'src/dal/images/interfaces';
import { useUploadImages, IUploadingFile } from 'src/api/hooks/submit-forms/images/useUploadImages';

import { DropZone } from './drop-zone';
import { ImagesListWrapper, ImagesListGrid, ImagesListEmptyMessage } from './style';
import { ImageItem, UploadingImageItem, IAction } from './item';

interface IProps {
  images: IImage[];
  onClickImage(image: IImage): void;
  selectedImages: IImage[];
  refreshImages: () => void;
  deleteImage?(image: IImage): void;
  updateImage?(image: IImage): void;
  emptyListMessage?: string;
  addButton?: boolean;
  isMulti?: boolean;
  dropZoneRefCallback?: any;
  imageActions?: IAction[];
  blockType?: string; // для какого типа блока запросить (создать) изображения
  createTags?: string[]; // с какими тегами создать изображения
  isCommon?: boolean;
}

export const ImagesList = (props: IProps) => {
  const {
    blockType,
    createTags,
    isCommon,
    images,
    onClickImage,
    deleteImage,
    updateImage,
    selectedImages,
    refreshImages,
    emptyListMessage,
    addButton = false,
    isMulti = false,
    dropZoneRefCallback,
    imageActions,
  } = props;
  const [uploadImages, isLoading, uploadingImages, clear] = useUploadImages(
    blockType,
    createTags,
    isCommon
  );

  useEffect(() => {
    if (!isLoading && uploadingImages.length) {
      // выгрузка изображений только что закончилась
      refreshImages();
    }
  }, [isLoading, uploadingImages]);

  useEffect(() => {
    if (uploadingImages.length) {
      // значит есть только что загруженные изображение, отмечаем их сразу как выбранные
      uploadingImages.forEach((uploadingImage: IUploadingFile) => {
        const targetImage = images.find((image: IImage) => image.id === uploadingImage.data?.id);
        if (targetImage) {
          onClickImage(targetImage);
        }
      });
    }
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
      <ImagesListGrid>
        {images.map((image: IImage) => (
          <ImageItem
            key={image.id}
            image={image}
            onClickImage={onClickImage}
            isSelected={selectedImages.some(
              (selectedImage: IImage) => selectedImage.id === image.id
            )}
            actions={imageActions}
            blockType={blockType}
            deleteImage={deleteImage}
            updateImage={updateImage}
          />
        ))}
        {uploadingImages.map((uploadingImage: IUploadingFile) => (
          <UploadingImageItem key={uploadingImage.guid} uploadingImage={uploadingImage} />
        ))}
        {addButton && (
          <DropZone onChange={onChangeDropZone} multiple={isMulti} ref={dropZoneRefCallback} />
        )}
      </ImagesListGrid>
    </ImagesListWrapper>
  );
};
