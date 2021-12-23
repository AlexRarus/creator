import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ISectionData } from 'src/dal/blocks/section-interfaces';
import { ITheme } from 'src/dal/themes/interfaces';
import { IUser } from 'src/dal/auth/interfaces';

import { BackgroundPreview } from './style';

interface IProps {
  selectedTheme?: ITheme | null;
  blocks: IBlock<any>[];
  user: IUser;
}

export const SectionPreview = (props: IProps) => {
  const { selectedTheme, blocks, user } = props;
  const { watch } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const paddingTop = watch('paddingTop');
  const paddingBottom = watch('paddingBottom');
  const paddingLeft = watch('paddingLeft');
  const paddingRight = watch('paddingRight');
  const background = watch('background');
  const borderRadius = watch('borderRadius');

  const previewData: IBlock<ISectionData> = {
    id: 0,
    type: 'section',
    author: user,
    data: {
      blocks,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      background,
      borderRadius,
    },
  };

  return (
    <BackgroundPreview selectedTheme={selectedTheme}>
      <TargetBlockTypePreview selectedTheme={selectedTheme} block={previewData} />
    </BackgroundPreview>
  );
};
