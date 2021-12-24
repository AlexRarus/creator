import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import { Grid, GridColumn } from 'src/components/grid';
import { ColorPicker } from 'src/components/color-picker';

import { Block, BlockTitle } from './style';

interface IProps {
  formDefaultValues: any;
}

export const FieldBlockFont = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext();

  return (
    <Block>
      <BlockTitle>Текст</BlockTitle>
      <Grid
        verticalGap={10}
        breakPoints={{
          // все переданные здесь значения выставлены по-умолчанию
          // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
          '320px': 4, // 4 колонки при ширине экрана 320 и меньше
          '530px': 4, // 4 колонок при ширине экрана 530 и меньше
          '950px': 8, // 8 колонок при ширине экрана 950 и меньше
          '1024px': 8, // 8 колонок при ширине экрана 1024 и меньше
          '1280px': 8, // 8 колонок при ширине экрана 1280 и меньше
        }}>
        <GridColumn size={4}>
          <ControlledField name='color' control={control} formDefaultValues={formDefaultValues}>
            <ColorPicker label='Цвет текста' />
          </ControlledField>
        </GridColumn>
        <GridColumn size={4}>
          <ControlledField
            name='headerColor'
            control={control}
            formDefaultValues={formDefaultValues}>
            <ColorPicker label='Цвет заголовков' />
          </ControlledField>
        </GridColumn>
      </Grid>
    </Block>
  );
};
