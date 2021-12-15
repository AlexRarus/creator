import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { IImage } from 'src/dal/images/interfaces';

import { useMapStoreToProps } from '../../selectors';
import { ImagesList } from '../images-list';

import { CommonImagesListWrapper } from './style';

interface IProps {
  blockType: string;
  onClickImage(image: IImage): void;
  selectedImages: IImage[];
  emptyListMessage: string;
}

export const CommonImagesList = observer((props: IProps) => {
  const { blockType, onClickImage, selectedImages, emptyListMessage } = props;
  const { commonImages, getCommonImagesByBlockTypeAction } = useMapStoreToProps();

  useEffect(() => {
    getCommonImagesByBlockTypeAction(blockType);
  }, [blockType]);

  const refreshImages = () => getCommonImagesByBlockTypeAction(blockType);

  return (
    <CommonImagesListWrapper>
      <ImagesList
        blockType={blockType}
        images={commonImages}
        onClickImage={onClickImage}
        selectedImages={selectedImages}
        refreshImages={refreshImages}
        emptyListMessage={emptyListMessage}
      />
    </CommonImagesListWrapper>
  );
});
