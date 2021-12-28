import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IAvatarData } from 'src/dal/blocks/data-interfaces';
import { AvatarPreview as AvatarPreviewComponent } from 'src/components/avatar-preview';

import { AvatarBlockWrapper } from './style';

interface IProps {
  block: IBlock<IAvatarData>;
}

export const AvatarPreview = (props: IProps) => {
  const { block } = props;

  return (
    <AvatarBlockWrapper>
      <AvatarPreviewComponent avatar={block?.author?.avatar} {...block.data} />
    </AvatarBlockWrapper>
  );
};
