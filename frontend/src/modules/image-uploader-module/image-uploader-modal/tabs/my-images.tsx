import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { useMapStoreToProps } from '../../selectors';
import { ImagesList } from '../images-list';
import { IAction } from '../images-list/item';

import { MyImagesListWrapper } from './style';

const getImageActions = (isEditable: boolean) => {
  const actions: IAction[] = [
    {
      id: 'delete',
      label: 'Удалить',
      kind: 'delete',
      Icon: DeleteForeverOutlinedIcon,
      needConfirm: true,
    },
  ];

  if (isEditable) {
    actions.push({
      id: 'edit',
      label: 'Редактировать',
      Icon: AutoAwesomeIcon,
    });
  }

  return actions;
};

interface IProps {
  setSelectedImages(images: IImage[]): void;
  selectedImages: IImage[];
  emptyListMessage?: string;
  dropZoneRefCallback?: any;
  isCommon?: boolean;
  isEditable?: boolean;
  isMulti?: boolean;
  blockType?: string; // для какого типа блока (создать) изображения
  getBlockTypes?: string[]; // для какого типа блока запросить изображения
  getTags?: string[]; // с какими тегами запросить изображения
  createTags?: string[]; // с какими тегами создать изображения
  isEditBorderRadius?: boolean;
  isEditBorder?: boolean;
}

export const MyImagesList = observer((props: IProps) => {
  const {
    setSelectedImages,
    selectedImages,
    dropZoneRefCallback,
    isCommon = false,
    isEditable = false,
    isMulti = false,
    blockType,
    getBlockTypes = [blockType] as string[],
    getTags,
    createTags,
    isEditBorderRadius,
    isEditBorder,
  } = props;
  const { myImages, getMyImagesAction } = useMapStoreToProps();

  useEffect(() => {
    getMyImagesAction(getBlockTypes, getTags);
  }, [blockType, getTags]);

  const refreshImages = () => getMyImagesAction(getBlockTypes, getTags);

  const onClickImage = (image: IImage) => {
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

  const deleteImage = (image: IImage) =>
    setSelectedImages(
      selectedImages.filter((selectedImage: IImage) => selectedImage.id !== image.id)
    );

  const updateImage = (image: IImage) =>
    setSelectedImages(
      selectedImages.map((selectedImage: IImage) =>
        selectedImage.id === image.id ? image : selectedImage
      )
    );

  return (
    <MyImagesListWrapper>
      <ImagesList
        blockType={blockType}
        images={myImages}
        onClickImage={onClickImage}
        deleteImage={deleteImage}
        updateImage={updateImage}
        selectedImages={selectedImages}
        refreshImages={refreshImages}
        addButton={true}
        dropZoneRefCallback={dropZoneRefCallback}
        imageActions={getImageActions(isEditable)}
        createTags={createTags}
        isCommon={isCommon}
        isEditBorderRadius={isEditBorderRadius}
        isEditBorder={isEditBorder}
      />
    </MyImagesListWrapper>
  );
});
