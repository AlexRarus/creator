import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IAvatarData } from 'src/dal/blocks/data-interfaces';
import { ITheme } from 'src/dal/themes/interfaces';
import { AvatarPreview as AvatarPreviewComponent } from 'src/components/avatar-preview';

import { AvatarBlockWrapper } from './style';

interface IProps {
  block: IBlock<IAvatarData>;
  selectedTheme?: ITheme | null;
}

export const AvatarPreview = (props: IProps) => {
  const { block, selectedTheme } = props;

  return (
    <AvatarBlockWrapper selectedTheme={selectedTheme}>
      <AvatarPreviewComponent avatar={block?.author?.avatar} {...block.data} />
    </AvatarBlockWrapper>
  );
};
