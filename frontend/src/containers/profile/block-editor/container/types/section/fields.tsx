import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import InputRange from 'src/components/input-range';
import ColorPicker from 'src/components/color-picker';
import ButtonSelect from 'src/components/button-select';
import { ImageUploaderModule } from 'src/modules/image-uploader-module';

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

const backgroundTypes = [
  {
    value: 'background',
    label: 'Цвет',
  },
  {
    value: 'gradient',
    label: 'Градиент',
  },
  {
    value: 'picture',
    label: 'Картинка',
  },
];

export const SectionFields = (props: IProps) => {
  const [backgroundType, setBackgroundType] = useState('background');
  const [firstColor, setFirstColor] = useState('#ffffff');
  const [secondColor, setSecondColor] = useState('#ffffff');
  const [picture, setPicture] = useState<any>();
  const [pictureElement, pictureRefCallback] = useState<HTMLElement | null>(null);
  const { formDefaultValues } = props;
  const { control, setValue } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  useEffect(() => {
    if (backgroundType === 'gradient') {
      setValue('background', `linear-gradient(${firstColor}, ${secondColor})`);
    }
    if (backgroundType === 'background') {
      setValue('background', firstColor);
    }
    if (backgroundType === 'picture') {
      setValue('background', `url(/media/${picture?.preview || picture?.src})`);
    }
  }, [backgroundType, firstColor, secondColor, picture]);

  return (
    <Grid
      gap={20}
      breakPoints={{
        // все переданные здесь значения выставлены по-умолчанию
        // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
        '320px': 12, // 10 колонки при ширине экрана 320 и меньше
        '530px': 12, // 10 колонок при ширине экрана 530 и меньше
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
      <GridColumn size={12}>
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
      <GridColumn size={3}>
        <Label>Тип фона:</Label>
        <ButtonSelect
          dimension='l'
          kind='formed'
          width={'100%'}
          value={backgroundType}
          options={backgroundTypes}
          onChange={setBackgroundType}
        />
      </GridColumn>
      <GridColumn size={backgroundType === 'picture' ? 6 : 3}>
        {(backgroundType === 'gradient' || backgroundType === 'background') && (
          <>
            <Label>Цвет</Label>
            <ColorPicker onChange={setFirstColor} value={firstColor} />
          </>
        )}
        <PictureCell>
          <Label>{backgroundType === 'picture' ? 'Выберите картинку' : ''}</Label>
          {backgroundType === 'picture' && (
            <ItemFieldPictureShape ref={pictureRefCallback}>
              {picture ? <PictureElement src={`/media/${picture.preview || picture.src}`} /> : ''}
            </ItemFieldPictureShape>
          )}
          <ImageUploaderModule
            onChange={setPicture}
            openerElement={pictureElement}
            blockType='list'
            isEditable={true}
          />
        </PictureCell>
      </GridColumn>
      {(backgroundType === 'gradient' || backgroundType === 'background') && (
        <GridColumn size={3}>
          <Label>{backgroundType === 'gradient' ? 'Второй цвет' : ''}</Label>
          {backgroundType === 'gradient' && (
            <ColorPicker onChange={setSecondColor} value={secondColor} />
          )}
        </GridColumn>
      )}
    </Grid>
  );
};
