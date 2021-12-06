import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import InputRange from 'src/components/input-range';
import ColorPicker from 'src/components/color-picker';
import { ITheme } from 'src/dal/themes/interface';
import { IBlock } from 'src/dal/blocks/interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';

import { FormInputs } from './interfaces';
import {
  MicroRow,
  MicroLabel,
  MicroInputWrapper,
  MicroPostfix,
  BackgroundPreview,
  RangeLabel,
} from './style';

interface IProps {
  formDefaultValues: FormInputs | null;
  selectedTheme: ITheme | null;
  previewList?: any[];
}

export const SectionFields = (props: IProps) => {
  const { formDefaultValues, selectedTheme, previewList } = props;
  const { watch, control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const paddingTop = watch('paddingTop');
  const paddingBottom = watch('paddingBottom');
  const paddingLeft = watch('paddingLeft');
  const paddingRight = watch('paddingRight');
  const background = watch('background');
  const borderRadius = watch('borderRadius');

  const previewSection: IBlock<any> = {
    id: 0,
    type: 'section',
    data: {
      blocks: previewList,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      background,
      borderRadius,
    },
  };

  return (
    <Grid
      gap={20}
      breakPoints={{
        // все переданные здесь значения выставлены по-умолчанию
        // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
        '320px': 6, // 6 колонки при ширине экрана 320 и меньше
        '530px': 6, // 6 колонок при ширине экрана 530 и меньше
        '950px': 12, // 12 колонок при ширине экрана 950 и меньше
        '1024px': 12, // 12 колонок при ширине экрана 1024 и меньше
        '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
      }}>
      <GridColumn size={5}>
        <MicroRow>
          <MicroLabel>Отступ сверху:</MicroLabel>
          <MicroInputWrapper>
            <ControlledField
              name='paddingTop'
              control={control}
              rules={{ ...maxLength(99) }}
              formDefaultValues={formDefaultValues}>
              <InputText
                textAlign={'right'}
                type={'number'}
                dimension={'m'}
                kind={'formed'}
                align={'right'}
              />
            </ControlledField>
          </MicroInputWrapper>
          <MicroPostfix>px</MicroPostfix>
        </MicroRow>
      </GridColumn>
      <GridColumn size={5}>
        <MicroRow>
          <MicroLabel>Отступ снизу:</MicroLabel>
          <MicroInputWrapper>
            <ControlledField
              name='paddingBottom'
              control={control}
              rules={{ ...maxLength(99) }}
              formDefaultValues={formDefaultValues}>
              <InputText
                textAlign={'right'}
                type={'number'}
                dimension={'m'}
                kind={'formed'}
                align={'right'}
              />
            </ControlledField>
          </MicroInputWrapper>
          <MicroPostfix>px</MicroPostfix>
        </MicroRow>
      </GridColumn>
      <GridColumn size={5}>
        <MicroRow>
          <MicroLabel>Отступ слева:</MicroLabel>
          <MicroInputWrapper>
            <ControlledField
              name='paddingLeft'
              control={control}
              rules={{ ...maxLength(99) }}
              formDefaultValues={formDefaultValues}>
              <InputText
                textAlign={'right'}
                type={'number'}
                dimension={'m'}
                kind={'formed'}
                align={'right'}
              />
            </ControlledField>
          </MicroInputWrapper>
          <MicroPostfix>px</MicroPostfix>
        </MicroRow>
      </GridColumn>
      <GridColumn size={5}>
        <MicroRow>
          <MicroLabel>Отступ справа:</MicroLabel>
          <MicroInputWrapper>
            <ControlledField
              name='paddingRight'
              control={control}
              rules={{ ...maxLength(99) }}
              formDefaultValues={formDefaultValues}>
              <InputText
                textAlign={'right'}
                type={'number'}
                dimension={'m'}
                kind={'formed'}
                align={'right'}
              />
            </ControlledField>
          </MicroInputWrapper>
          <MicroPostfix>px</MicroPostfix>
        </MicroRow>
      </GridColumn>
      <GridColumn size={3}>
        <ControlledField
          name='background'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <ColorPicker label={'Цвет фона'} />
        </ControlledField>
      </GridColumn>
      <GridColumn size={6}>
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
      <GridColumn>
        <BackgroundPreview selectedTheme={selectedTheme}>
          <TargetBlockTypePreview block={previewSection} selectedTheme={selectedTheme} />
        </BackgroundPreview>
      </GridColumn>
    </Grid>
  );
};
