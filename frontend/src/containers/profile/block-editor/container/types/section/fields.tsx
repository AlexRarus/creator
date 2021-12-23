import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import InputRange from 'src/components/input-range';
import ColorPicker from 'src/components/color-picker';
import { ImageUploaderModule } from 'src/modules/image-uploader-module';
import { Select } from 'src/components/select';
import { ColorPickerGradient } from 'src/components/color-picker-gradient';
import { IImage } from 'src/dal/images/interfaces';

import { backgroundTypes } from './utils';
import { FormInputs } from './interfaces';
import {
  MicroRow,
  MicroLabel,
  MicroInputWrapper,
  MicroPostfix,
  RangeLabel,
  ItemFieldPictureShape,
  PictureElement,
  PictureCell,
  Label,
} from './style';

interface IProps {
  formDefaultValues: FormInputs | null;
}

export const SectionFields = (props: IProps) => {
  const { formDefaultValues } = props;
  const [pictureElement, pictureRefCallback] = useState<HTMLElement | null>(null);
  const { control, watch } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const backgroundType = watch('backgroundType');
  const backgroundImage: IImage = watch('backgroundImage');

  return (
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

      <GridColumn size={4}>
        <ControlledField name='backgroundType' control={control}>
          <Select options={backgroundTypes} label='Тип фона' />
        </ControlledField>
      </GridColumn>
      <GridColumn size={4}>
        {backgroundType.value === 'color' && (
          <ControlledField name='backgroundColor' control={control}>
            <ColorPicker label='Цвет фона' />
          </ControlledField>
        )}
        {backgroundType.value === 'gradient' && (
          <ControlledField name='backgroundGradient' control={control}>
            <ColorPickerGradient label='Градиент фона' />
          </ControlledField>
        )}
      </GridColumn>
      <GridColumn size={8}>
        <PictureCell>
          <Label>Выберите картинку</Label>
          <ItemFieldPictureShape ref={pictureRefCallback}>
            {backgroundImage ? (
              <PictureElement src={`/media/${backgroundImage.preview || backgroundImage.src}`} />
            ) : (
              ''
            )}
          </ItemFieldPictureShape>
          <ControlledField control={control} name='backgroundImage'>
            <ImageUploaderModule
              openerElement={pictureElement}
              blockType='section'
              isEditable={true}
            />
          </ControlledField>
        </PictureCell>
      </GridColumn>
    </Grid>
  );
};
