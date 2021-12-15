import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';

import { useMapStoreToProps } from '../../selectors';
import { ImagesList } from '../images-list';

import { MyImagesListWrapper } from './style';

interface IProps {
  blockType: string;
  onClickImage(image: IImage): void;
  selectedImages: IImage[];
  emptyListMessage?: string;
  dropZoneRefCallback?: any;
}

export const MyImagesList = observer((props: IProps) => {
  const { blockType, onClickImage, selectedImages, dropZoneRefCallback } = props;
  const { myImages, getMyImagesByBlockTypeAction } = useMapStoreToProps();

  useEffect(() => {
    getMyImagesByBlockTypeAction(blockType);
  }, [blockType]);

  const refreshImages = () => getMyImagesByBlockTypeAction(blockType);

  return (
    <MyImagesListWrapper>
      <ImagesList
        blockType={blockType}
        images={myImages}
        onClickImage={onClickImage}
        selectedImages={selectedImages}
        refreshImages={refreshImages}
        addButton={true}
        dropZoneRefCallback={dropZoneRefCallback}
      />
    </MyImagesListWrapper>
  );
});
