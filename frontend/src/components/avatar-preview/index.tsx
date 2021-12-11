import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { IAvatar } from 'src/dal/auth/interfaces';

import { TDimension } from '../input-components';

import { AvatarPreviewWrapper, DefaultBackground, Image } from './style';

interface IProps {
  avatar?: IAvatar | null;
  dimension?: TDimension;
}

export const AvatarPreview = (props: IProps) => {
  const { avatar, dimension = 'm' } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => setIsLoaded(true);

  return (
    <AvatarPreviewWrapper dimension={dimension} borderRadius={avatar ? avatar.borderRadius : 100}>
      <DefaultBackground dimension={dimension} borderRadius={avatar ? avatar.borderRadius : 100}>
        <PersonIcon />
      </DefaultBackground>
      {avatar?.preview && (
        <Image src={`/media/${avatar.preview}`} onLoad={onLoad} isLoaded={isLoaded} />
      )}
    </AvatarPreviewWrapper>
  );
};
