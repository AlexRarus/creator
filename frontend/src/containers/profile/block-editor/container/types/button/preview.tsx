import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interface';

interface IProps {
  selectedTheme: ITheme | null;
}

export const SectionPreview = (props: IProps) => {
  const { selectedTheme } = props;
  const { watch } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const paddingTop = watch('paddingTop');
  const paddingBottom = watch('paddingBottom');
  const paddingLeft = watch('paddingLeft');
  const paddingRight = watch('paddingRight');
  const background = watch('background');
  const borderRadius = watch('borderRadius');

  const previewData: IBlock<any> = {
    id: 0,
    type: 'section',
    data: {
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      background,
      borderRadius,
    },
  };

  return (
    <div>
      <TargetBlockTypePreview selectedTheme={selectedTheme} block={previewData} />
    </div>
  );
};
