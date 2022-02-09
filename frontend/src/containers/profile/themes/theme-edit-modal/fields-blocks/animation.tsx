import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import { Grid, GridColumn } from 'src/components/grid';
import { Select } from 'src/components/select';
import { InputRange } from 'src/components/input-range';
import Button from 'src/components/button';
import { DropZone } from 'src/components/drop-zone';
import Lottie from 'lottie-react';

import {
  animationSizes,
  animationPositions,
  animationPreserveAspectRatioXOptions,
  animationPreserveAspectRatioYOptions,
  animationPreserveAspectRatioScaleOptions,
} from '../utils';

import { Block, BlockTitle, AnimationPreviewWrapper, AnimationPreview } from './style';

interface IProps {
  formDefaultValues: any;
}

export const FieldBlockAnimation = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control, watch, setValue } = useFormContext();
  const animation = watch('animation');
  const animationSize = watch('animationSize');
  const animationSizeCustomValue = watch('animationSizeCustomValue');
  const animationPosition = watch('animationPosition');
  const animationPreserveAspectRatioX = watch('animationPreserveAspectRatioX');
  const animationPreserveAspectRatioY = watch('animationPreserveAspectRatioY');
  const animationPreserveAspectRatioScale = watch('animationPreserveAspectRatioScale');
  const aspectRatioX = animationPreserveAspectRatioX?.value;
  const aspectRatioY = animationPreserveAspectRatioY?.value;
  const aspectRatioScale = animationPreserveAspectRatioScale?.value;
  const [dropZoneElement, dropZoneRefCallback] = useState<HTMLElement | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    if (typeof animation === 'string') {
      const fetchURLAnimation = async () => {
        const json = await fetch(`/lottie/${animation}`).then((res) => res.json());
        setAnimationData(json);
      };

      fetchURLAnimation();
    } else if (animation) {
      const fetchFileAnimation = async () => {
        try {
          const text = await animation.text();
          const json = JSON.parse(text);
          setAnimationData(json);
        } catch (e) {
          console.log(e);
        }
      };

      fetchFileAnimation();
    }
  }, [animation]);

  const clearAnimation = () => {
    setValue('animation', null);
  };
  const addAnimation = () => {
    dropZoneElement?.click();
  };

  const onChangeDropZone = async (value: File | File[] | null) => {
    if (value) {
      setValue('animation', value);
    }
  };

  return (
    <Block>
      <BlockTitle>Анимация</BlockTitle>
      <Grid
        verticalGap={10}
        size={8}
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
          {animation && (
            <AnimationPreviewWrapper>
              <AnimationPreview
                animationSize={
                  animationSize.value === 'custom'
                    ? `${animationSizeCustomValue}px`
                    : animationSize.value
                }
                animationPosition={animationPosition.value}>
                <Lottie
                  autoPlay={true}
                  loop={true}
                  animationData={animationData}
                  rendererSettings={{
                    preserveAspectRatio: `x${aspectRatioX}Y${aspectRatioY} ${aspectRatioScale}`,
                  }}
                />
              </AnimationPreview>
            </AnimationPreviewWrapper>
          )}
        </GridColumn>
        <GridColumn size={4}>
          <Grid staticSize={4}>
            <GridColumn size={4}>
              <ControlledField
                name='animationPosition'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select options={animationPositions} label='Расположение обертки' />
              </ControlledField>
            </GridColumn>
            <GridColumn size={4}>
              <ControlledField
                name='animationSize'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select options={animationSizes} label='Размер обертки' />
              </ControlledField>
            </GridColumn>
            {animationSize.value === 'custom' && (
              <GridColumn>
                <ControlledField
                  control={control}
                  name='animationSizeCustomValue'
                  formDefaultValues={formDefaultValues}>
                  <InputRange
                    label='Высота обертки'
                    min={100}
                    max={1000}
                    step={1}
                    minValueLabel='100'
                    maxValueLabel='1000'
                    valueLabel={`${animationSizeCustomValue || 100}`}
                    withInput={true}
                  />
                </ControlledField>
              </GridColumn>
            )}
            <GridColumn size={4}>
              <ControlledField
                name='animationPreserveAspectRatioX'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select
                  options={animationPreserveAspectRatioXOptions}
                  label='Выравнивании по горизонтали'
                />
              </ControlledField>
            </GridColumn>
            <GridColumn size={4}>
              <ControlledField
                name='animationPreserveAspectRatioY'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select
                  options={animationPreserveAspectRatioYOptions}
                  label='Выравнивании по вертикали'
                />
              </ControlledField>
            </GridColumn>
            <GridColumn size={4}>
              <ControlledField
                name='animationPreserveAspectRatioScale'
                control={control}
                formDefaultValues={formDefaultValues}>
                <Select
                  options={animationPreserveAspectRatioScaleOptions}
                  label='Масштаб анимации'
                />
              </ControlledField>
            </GridColumn>
            <GridColumn size={4} justifyContent='end'>
              {animation && (
                <Button block={true} kind='danger' onClick={clearAnimation}>
                  Удалить анимацию
                </Button>
              )}
              {!animation && (
                <Button block={true} kind='secondary' onClick={addAnimation}>
                  Выбрать фоновую анимацию
                </Button>
              )}
            </GridColumn>
          </Grid>
        </GridColumn>
      </Grid>
      <DropZone hide={true} onChange={onChangeDropZone} ref={dropZoneRefCallback} />
    </Block>
  );
};
