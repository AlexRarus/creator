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
  blockType: string;
  setSelectedImages(images: IImage[]): void;
  selectedImages: IImage[];
  emptyListMessage?: string;
  dropZoneRefCallback?: any;
  isEditable?: boolean;
  isMulti?: boolean;
}

export const MyImagesList = observer((props: IProps) => {
  const {
    blockType,
    setSelectedImages,
    selectedImages,
    dropZoneRefCallback,
    isEditable = false,
    isMulti = false,
  } = props;
  const { myImages, getMyImagesByBlockTypeAction } = useMapStoreToProps();

  useEffect(() => {
    getMyImagesByBlockTypeAction(blockType);
  }, [blockType]);

  const refreshImages = () => getMyImagesByBlockTypeAction(blockType);

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
      />
    </MyImagesListWrapper>
  );
});
