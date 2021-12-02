import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { IAvatar } from 'src/dal/auth/interfaces';

import { AvatarPreviewWrapper, DefaultBackground, Image } from './style';

interface IProps {
  avatar?: IAvatar | null;
  size?: number;
}

export const AvatarPreview = (props: IProps) => {
  const { avatar, size } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => setIsLoaded(true);

  return (
    <AvatarPreviewWrapper size={size} borderRadius={avatar ? avatar.borderRadius : 100}>
      <DefaultBackground>
        <PersonIcon />
      </DefaultBackground>
      {avatar?.preview && (
        <Image src={`/media/${avatar.preview}`} onLoad={onLoad} isLoaded={isLoaded} />
      )}
    </AvatarPreviewWrapper>
  );
};
