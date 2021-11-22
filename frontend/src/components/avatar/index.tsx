import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';

import { AvatarWrapper, DefaultBackground, Image } from './style';

interface IProps {
  src?: string;
  size?: number;
}

export const Avatar = (props: IProps) => {
  const { src, size = 40 } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => setIsLoaded(true);

  return (
    <AvatarWrapper size={size}>
      <DefaultBackground>
        <PersonIcon />
      </DefaultBackground>
      {src && <Image src={src} onLoad={onLoad} isLoaded={isLoaded} />}
    </AvatarWrapper>
  );
};
