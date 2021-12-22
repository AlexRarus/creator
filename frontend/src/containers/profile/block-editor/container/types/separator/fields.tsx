import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { maxLength } from 'src/utils/validators';
import { ImageUploaderModule } from 'src/modules/image-uploader-module';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import InputRange from 'src/components/input-range';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { ITheme } from '../../../../../../dal/themes/interface';

import { FormInputs } from './interfaces';
import { Label, Row, MicroLabel } from './style';
import { Toggle } from './custom-toggle';

interface IProps {
  formDefaultValues: FormInputs | null;
  selectedTheme: ITheme | null;
}

export const SeparatorFields = (props: IProps) => {
  const { formDefaultValues, selectedTheme } = props;
  const [iconElement, iconRefCallback] = useState<HTMLElement | null>(null);
  const { control, watch, setValue } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const icon = watch('icon') || formDefaultValues?.icon;
  const isWide = watch('isWide') || formDefaultValues?.isWide;
  const isTransparent = watch('isTransparent') || formDefaultValues?.isTransparent;

  const onClickWide = () => {
    setValue('isWide', !isWide);
  };
  const onClickTransparent = () => {
    setValue('isTransparent', !isTransparent);
  };

  return (
    <Grid
      gap={12}
      verticalGap={12}
      breakPoints={{
        // все переданные здесь значения выставлены по-умолчанию
        // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
        '320px': 12, // 6 колонки при ширине экрана 320 и меньше
        '530px': 12, // 6 колонок при ширине экрана 530 и меньше
        '950px': 12, // 12 колонок при ширине экрана 950 и меньше
        '1024px': 12, // 12 колонок при ширине экрана 1024 и меньше
        '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
      }}>
      <GridColumn>
        <Label>Отступ px:</Label>
        <ControlledField
          name='value'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <InputRange isFakeLabel={true} min={0} max={50} />
        </ControlledField>
      </GridColumn>
      <GridColumn>
        <Label>Настройки линии:</Label>
        <Row>
          <Switch checked={isTransparent} onClick={onClickTransparent} />
          <MicroLabel>Прозрачные края</MicroLabel>
        </Row>
        <Row>
          <Switch checked={isWide} onClick={onClickWide} />
          <MicroLabel>На всю ширину</MicroLabel>
        </Row>
      </GridColumn>
      <GridColumn size={12}>
        <Label>Тип разделителя:</Label>
        <ControlledField
          name='kind'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <Toggle
            list={['empty', 'line', 'icon']}
            iconRefCallback={iconRefCallback}
            isWide={isWide}
            isTransparent={isTransparent}
            icon={icon}
          />
        </ControlledField>
        <ControlledField name={`icon`} control={control}>
          <ImageUploaderModule openerElement={iconElement} blockType='list' isEditable={true} />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
