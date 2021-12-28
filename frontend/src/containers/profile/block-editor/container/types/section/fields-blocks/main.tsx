import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import { Grid, GridColumn } from 'src/components/grid';
import { maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import { InputRange } from 'src/components/input-range';

import { MicroInputWrapper, MicroLabel, MicroPostfix, MicroRow, RangeLabel } from '../style';

import { Block, BlockTitle } from './style';

interface IProps {
  formDefaultValues: any;
}

export const FieldBlockMain = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Block>
      <BlockTitle>Расположение</BlockTitle>
      <Grid
        gap={20}
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
          <MicroRow>
            <MicroLabel>Отступ сверху:</MicroLabel>
            <MicroInputWrapper>
              <ControlledField
                name='paddingTop'
                control={control}
                rules={{ ...maxLength(99) }}
                formDefaultValues={formDefaultValues}>
                <InputText
                  textAlign='right'
                  type='number'
                  dimension='m'
                  kind='formed'
                  align='right'
                />
              </ControlledField>
            </MicroInputWrapper>
            <MicroPostfix>px</MicroPostfix>
          </MicroRow>
        </GridColumn>
        <GridColumn size={4}>
          <MicroRow>
            <MicroLabel>Отступ снизу:</MicroLabel>
            <MicroInputWrapper>
              <ControlledField
                name='paddingBottom'
                control={control}
                rules={{ ...maxLength(99) }}
                formDefaultValues={formDefaultValues}>
                <InputText
                  textAlign='right'
                  type='number'
                  dimension='m'
                  kind='formed'
                  align='right'
                />
              </ControlledField>
            </MicroInputWrapper>
            <MicroPostfix>px</MicroPostfix>
          </MicroRow>
        </GridColumn>
        <GridColumn size={4}>
          <MicroRow>
            <MicroLabel>Отступ слева:</MicroLabel>
            <MicroInputWrapper>
              <ControlledField
                name='paddingLeft'
                control={control}
                rules={{ ...maxLength(99) }}
                formDefaultValues={formDefaultValues}>
                <InputText
                  textAlign='right'
                  type='number'
                  dimension='m'
                  kind='formed'
                  align='right'
                />
              </ControlledField>
            </MicroInputWrapper>
            <MicroPostfix>px</MicroPostfix>
          </MicroRow>
        </GridColumn>
        <GridColumn size={4}>
          <MicroRow>
            <MicroLabel>Отступ справа:</MicroLabel>
            <MicroInputWrapper>
              <ControlledField
                name='paddingRight'
                control={control}
                rules={{ ...maxLength(99) }}
                formDefaultValues={formDefaultValues}>
                <InputText
                  textAlign='right'
                  type='number'
                  dimension='m'
                  kind='formed'
                  align='right'
                />
              </ControlledField>
            </MicroInputWrapper>
            <MicroPostfix>px</MicroPostfix>
          </MicroRow>
        </GridColumn>
        <GridColumn size={8}>
          <MicroRow>
            <RangeLabel>Скругление углов</RangeLabel>
            <ControlledField
              name='borderRadius'
              control={control}
              rules={{ ...maxLength(99) }}
              formDefaultValues={formDefaultValues}>
              <InputRange isFakeLabel={true} min={0} max={50} />
            </ControlledField>
          </MicroRow>
        </GridColumn>
      </Grid>
    </Block>
  );
};