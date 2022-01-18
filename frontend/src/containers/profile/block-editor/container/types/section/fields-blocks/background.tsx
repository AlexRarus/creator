import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import { Grid, GridColumn } from 'src/components/grid';
import { ColorPicker } from 'src/components/color-picker';
import { ColorPickerGradient } from 'src/components/color-picker-gradient';
import { Select } from 'src/components/select';
import { ImageUploaderModule } from 'src/modules/image-uploader-module';
import { InputRange } from 'src/components/input-range';
import Button from 'src/components/button';

import { backgroundTypes, backgroundSizes, backgroundPositions, backgroundRepeats } from '../utils';

import {
  Block,
  BlockTitle,
  ItemFieldPictureShape,
  FieldLabel,
  PictureLabel,
  PictureCell,
  PictureElement,
} from './style';

interface IProps {
  formDefaultValues: any;
}

export const FieldBlockBackground = (props: IProps) => {
  const { formDefaultValues } = props;
  const [pictureElement, pictureRefCallback] = useState<HTMLDivElement | null>(null);
  const { control, watch, setValue } = useFormContext();
  const backgroundType = watch('backgroundType');
  const backgroundColor = watch('backgroundColor');
  const backgroundGradient = watch('backgroundGradient');
  const backgroundImage = watch('backgroundImage');
  const backgroundRepeat = watch('backgroundRepeat');
  const backgroundSmooth = watch('backgroundSmooth');
  const backgroundSize = watch('backgroundSize');
  const backgroundSizeCustomValue = watch('backgroundSizeCustomValue');
  const backgroundPosition = watch('backgroundPosition');

  const clearBackgroundImage = () => {
    setValue('backgroundImage', null);
  };

  return (
    <Block>
      <BlockTitle>Фон</BlockTitle>
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
          <ControlledField
            name='backgroundType'
            control={control}
            formDefaultValues={formDefaultValues}>
            <Select options={backgroundTypes} label='Тип фона' />
          </ControlledField>
        </GridColumn>
        <GridColumn size={4}>
          {backgroundType?.value === 'color' && (
            <ControlledField
              name='backgroundColor'
              control={control}
              formDefaultValues={formDefaultValues}>
              <ColorPicker label='Цвет фона' />
            </ControlledField>
          )}
          {backgroundType?.value === 'gradient' && (
            <ControlledField
              name='backgroundGradient'
              control={control}
              formDefaultValues={formDefaultValues}>
              <ColorPickerGradient label='Градиент фона' />
            </ControlledField>
          )}
        </GridColumn>
        <GridColumn size={4}>
          <FieldLabel>Картинка</FieldLabel>
          <PictureCell>
            <ItemFieldPictureShape ref={pictureRefCallback}>
              {backgroundImage ? (
                <PictureElement
                  backgroundType={backgroundType}
                  backgroundColor={backgroundColor}
                  backgroundGradient={backgroundGradient}
                  backgroundImage={backgroundImage}
                  backgroundRepeat={backgroundRepeat}
                  backgroundSmooth={backgroundSmooth}
                  backgroundSize={backgroundSize}
                  backgroundSizeCustomValue={backgroundSizeCustomValue}
                  backgroundPosition={backgroundPosition}
                />
              ) : (
                <PictureLabel>Загрузить</PictureLabel>
              )}
            </ItemFieldPictureShape>
            <ControlledField
              control={control}
              name='backgroundImage'
              formDefaultValues={formDefaultValues}>
              <ImageUploaderModule
                openerElement={pictureElement}
                blockType='section'
                isEditable={true}
                isEditBorder={true}
              />
            </ControlledField>
          </PictureCell>
        </GridColumn>
        <GridColumn size={4}>
          <Grid staticSize={4} verticalGap={10}>
            <GridColumn>
              <ControlledField
                name='backgroundSize'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select options={backgroundSizes} label='Масштабирование' />
              </ControlledField>
            </GridColumn>
            {backgroundSize.value === 'custom' && (
              <GridColumn>
                <ControlledField
                  control={control}
                  name='backgroundSizeCustomValue'
                  formDefaultValues={formDefaultValues}>
                  <InputRange
                    label='Масштаб'
                    min={10}
                    max={100}
                    step={1}
                    minValueLabel='10%'
                    maxValueLabel='100%'
                    valueLabel={`${backgroundSizeCustomValue || 10}%`}
                  />
                </ControlledField>
              </GridColumn>
            )}
            <GridColumn>
              <ControlledField
                name='backgroundRepeat'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select options={backgroundRepeats} label='Зациклить' />
              </ControlledField>
            </GridColumn>
            <GridColumn>
              <ControlledField
                name='backgroundPosition'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select options={backgroundPositions} label='Расположение' />
              </ControlledField>
            </GridColumn>
            <GridColumn>
              <Button
                block={true}
                disabled={!backgroundImage}
                kind='danger'
                onClick={clearBackgroundImage}>
                Удалить фоновую картинку
              </Button>
            </GridColumn>
            {/*<GridColumn>*/}
            {/*  <ControlledField*/}
            {/*    control={control}*/}
            {/*    name='backgroundParallax'*/}
            {/*    formDefaultValues={formDefaultValues}>*/}
            {/*    <Switch>Паралакс</Switch>*/}
            {/*  </ControlledField>*/}
            {/*</GridColumn>*/}
          </Grid>
        </GridColumn>
      </Grid>
    </Block>
  );
};
