import React, { useState } from 'react';
import { IImage } from 'src/dal/images/interfaces';
import Replies from 'src/components/replies';

import { ImageItemOuter, ImageItemInner, ImageElement } from './style';

interface IProps {
  image: IImage;
  onClickImage(image: IImage): void;
  isSelected: boolean;
}

export const ImageItem = (props: IProps) => {
  const { image, onClickImage, isSelected } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => setIsLoaded(true);
  const onClick = () => onClickImage(image);

  return (
    <ImageItemOuter isSelected={isSelected} onClick={onClick}>
      <ImageItemInner isSelected={isSelected}>
        <ImageElement src={`/media/${image.src}`} onLoad={onLoad} isLoaded={isLoaded} />
        <Replies />
      </ImageItemInner>
    </ImageItemOuter>
  );
};
