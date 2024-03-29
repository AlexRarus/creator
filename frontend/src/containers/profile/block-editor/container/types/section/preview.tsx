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
  const backgroundType = watch('backgroundType');
  const backgroundColor = watch('backgroundColor');
  const backgroundGradient = watch('backgroundGradient');
  const backgroundImage = watch('backgroundImage');
  const backgroundRepeat = watch('backgroundRepeat');
  const backgroundSmooth = watch('backgroundSmooth');
  const backgroundParallax = watch('backgroundParallax');
  const backgroundSize = watch('backgroundSize');
  const backgroundSizeCustomValue = watch('backgroundSizeCustomValue');
  const backgroundPosition = watch('backgroundPosition');
  const color = watch('color');
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
      backgroundType: backgroundType.value,
      backgroundColor,
      backgroundGradient,
      backgroundImage,
      backgroundRepeat: backgroundRepeat.value,
      backgroundSmooth,
      backgroundParallax,
      backgroundSize:
        backgroundSize.value === 'custom' ? `${backgroundSizeCustomValue}%` : backgroundSize.value,
      backgroundPosition: backgroundPosition.value,
      color,
      borderRadius,
    },
  };

  return (
    <BackgroundPreview selectedTheme={selectedTheme}>
      <TargetBlockTypePreview block={previewData} />
    </BackgroundPreview>
  );
};
