import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import { Grid, GridColumn } from 'src/components/grid';
import { maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import { InputRange } from 'src/components/input-range';
import { ColorPicker } from 'src/components/color-picker';
import { Switch } from 'src/components/switch';

import { MicroInputWrapper, MicroLabel, MicroPostfix, MicroRow, RangeLabel } from '../style';

import { Block, BlockTitle, SwitchWrap } from './style';

interface IProps {
  formDefaultValues: any;
}

export const FieldBlockMain = (props: IProps) => {
  const { formDefaultValues } = props;
  const hasVertical = formDefaultValues?.paddingTop > 0 || formDefaultValues?.paddingBottom > 0;
  const hasHorizontal = formDefaultValues?.paddingRight > 0 || formDefaultValues?.paddingLeft > 0;
  const [isVertical, setVertical] = useState(hasVertical);
  const [isHorizontal, setHorizontal] = useState(hasHorizontal);
  const { control, setValue } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  useEffect(() => {
    if (isVertical) {
      setValue('paddingTop', formDefaultValues?.paddingTop);
      setValue('paddingBottom', formDefaultValues?.paddingBottom);
    } else {
      setValue('paddingTop', 0);
      setValue('paddingBottom', 0);
    }
  }, [isVertical]);

  useEffect(() => {
    if (isHorizontal) {
      setValue('paddingRight', formDefaultValues?.paddingRight);
      setValue('paddingLeft', formDefaultValues?.paddingLeft);
    } else {
      setValue('paddingRight', 0);
      setValue('paddingLeft', 0);
    }
  }, [isHorizontal]);

  return (
    <Block>
      <BlockTitle>Расположение</BlockTitle>
      <Grid
        gap={20}
        verticalGap={8}
        breakPoints={{
          // все переданные здесь значения выставлены по-умолчанию
          // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
          '320px': 4, // 4 колонки при ширине экрана 320 и меньше
          '530px': 4, // 4 колонок при ширине экрана 530 и меньше
          '950px': 8, // 8 колонок при ширине экрана 950 и меньше
          '1024px': 8, // 8 колонок при ширине экрана 1024 и меньше
          '1280px': 8, // 8 колонок при ширине экрана 1280 и меньше
          '3840px': 8, // 8 колонок при ширине экрана 3840 и меньше
        }}>
        <GridColumn size={5}>
          <SwitchWrap>
            <Switch onChange={setVertical} value={isVertical}>
              Отступы по вертикали
            </Switch>
          </SwitchWrap>
        </GridColumn>
        {isVertical && (
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
        )}
        {isVertical && (
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
        )}
        <GridColumn size={5}>
          <SwitchWrap>
            <Switch onChange={setHorizontal} value={isHorizontal}>
              Отступы по горизонтали
            </Switch>
          </SwitchWrap>
        </GridColumn>
        {isHorizontal && (
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
        )}
        {isHorizontal && (
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
        )}
        <GridColumn size={8}>
          <RangeLabel>Скругление углов</RangeLabel>
          <ControlledField
            name='borderRadius'
            control={control}
            rules={{ ...maxLength(99) }}
            formDefaultValues={formDefaultValues}>
            <InputRange min={0} max={50} minValueLabel={'0px'} maxValueLabel={'50px'} />
          </ControlledField>
        </GridColumn>
        <GridColumn>
          <ControlledField name='color' control={control} formDefaultValues={formDefaultValues}>
            <ColorPicker label='Цвет текста' disableAlpha={true} />
          </ControlledField>
        </GridColumn>
      </Grid>
    </Block>
  );
};
