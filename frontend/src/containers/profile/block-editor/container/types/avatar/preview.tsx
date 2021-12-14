import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IAvatarData } from 'src/dal/blocks/data-interfaces';
import { ITheme } from 'src/dal/themes/interface';
import { IUser } from 'src/dal/auth/interfaces';
import { AvatarEditModule } from 'src/modules/avatar-edit-module';

import { PreviewWrapper, AvatarEditModuleWrapper } from './style';

interface IProps {
  selectedTheme: ITheme | null;
  user: IUser;
}

export const AvatarPreview = (props: IProps) => {
  const { selectedTheme, user } = props;
  const { watch } = useFormContext(); // так как Preview рендерятся внутри FormProvider, в контексте доступны значения формы
  const dimension = watch('dimension');

  const previewData: IBlock<IAvatarData> = {
    id: 0,
    type: 'avatar',
    author: user,
    data: {
      dimension,
    },
  };

  return (
    <PreviewWrapper selectedTheme={selectedTheme}>
      <TargetBlockTypePreview selectedTheme={selectedTheme} block={previewData} />
      <AvatarEditModuleWrapper>
        <AvatarEditModule />
      </AvatarEditModuleWrapper>
    </PreviewWrapper>
  );
};
