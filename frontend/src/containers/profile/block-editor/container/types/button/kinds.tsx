import React from 'react';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { ITheme } from 'src/dal/themes/interface';
import { Grid, GridColumn } from 'src/components/grid';
import { buttonKinds } from 'src/containers/app/block/types/button/style';
import { useFormContext } from 'react-hook-form';

import { prepareDataForKinds } from './utils';
import { KindsList, KindWrapper } from './style';

interface IProps {
  selectedTheme: ITheme | null;
}

export const ButtonKinds = (props: IProps) => {
  const { selectedTheme } = props;
  const { watch, setValue } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const selectedKind = watch('kind');
  const buttons = prepareDataForKinds(buttonKinds, selectedKind);

  const onChangeKind = (kind: string) => () => {
    setValue('kind', kind);
  };

  return (
    <KindsList>
      <Grid
        gap={20}
        verticalGap={20}
        breakPoints={{
          // все переданные здесь значения выставлены по-умолчанию
          // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
          '320px': 6, // 8 колонки при ширине экрана 320 и меньше
          '530px': 6, // 8 колонок при ширине экрана 530 и меньше
          '950px': 12, // 12 колонок при ширине экрана 950 и меньше
          '1024px': 12, // 12 колонок при ширине экрана 1024 и меньше
          '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
        }}>
        {buttons.map((button, index) => (
          <GridColumn key={index} size={6}>
            <KindWrapper onClick={onChangeKind(button?.data?.kind)}>
              <TargetBlockTypePreview selectedTheme={selectedTheme} block={button} />
            </KindWrapper>
          </GridColumn>
        ))}
      </Grid>
    </KindsList>
  );
};
