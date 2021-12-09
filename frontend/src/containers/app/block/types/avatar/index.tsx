import React from 'react';
import { observer } from 'mobx-react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IAvatarData } from 'src/dal/blocks/data-interfaces';
import { ITheme } from 'src/dal/themes/interface';
import { AvatarPreview as AvatarPreviewComponent } from 'src/components/avatar-preview';

import { useMapStoreToProps } from './selectors';
import { AvatarBlockWrapper } from './style';

interface IProps {
  block: IBlock<IAvatarData>;
  selectedTheme: ITheme | null;
}

export const AvatarPreview = observer((props: IProps) => {
  const { block, selectedTheme } = props;
  const { user } = useMapStoreToProps();

  return (
    <AvatarBlockWrapper selectedTheme={selectedTheme}>
      <AvatarPreviewComponent avatar={user?.avatar} {...block.data} />
    </AvatarBlockWrapper>
  );
});
