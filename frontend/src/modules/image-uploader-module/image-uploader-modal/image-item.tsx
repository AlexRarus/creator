import React, { useState } from 'react';
import { IImage } from 'src/dal/images/interfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ImageItemWrapper, ImageElement, ImageItemSelectedIcon } from './style';

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
    <ImageItemWrapper isSelected={isSelected} onClick={onClick}>
      <ImageElement src={`/media/${image.src}`} onLoad={onLoad} isLoaded={isLoaded} />
      {isSelected && (
        <ImageItemSelectedIcon>
          <CheckCircleIcon />
        </ImageItemSelectedIcon>
      )}
    </ImageItemWrapper>
  );
};
