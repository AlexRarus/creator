import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

import { AvatarPreviewWrapper, DefaultBackground, Image } from './style';

interface IProps {
  src?: string;
  borderRadius?: string;
}

export const AvatarPreview = (props: IProps) => {
  const { src, borderRadius = '100%' } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => setIsLoaded(true);

  return (
    <AvatarPreviewWrapper borderRadius={borderRadius}>
      <DefaultBackground>
        <PersonIcon />
      </DefaultBackground>
      {src && <Image src={src} onLoad={onLoad} isLoaded={isLoaded} />}
    </AvatarPreviewWrapper>
  );
};
