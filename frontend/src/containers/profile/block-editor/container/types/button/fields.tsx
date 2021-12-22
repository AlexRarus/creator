import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import InputMask from 'src/components/input-mask';
import { ImageUploaderModule } from 'src/modules/image-uploader-module';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { ITheme } from 'src/dal/themes/interfaces';

import { FormInputs } from './interfaces';
import { Label, FakeLabel, ButtonSelectStyled, RefTemplateButton } from './style';

const inputLabelMap = {
  web: 'Ссылка:',
  link: 'Ссылка:',
  phone: 'Телефон:',
  email: 'email: ',
};

const placeholderMap = {
  web: 'https://',
  link: '/',
  phone: '+7 123 123 45 56',
  sms: '+7 123 123 45 56',
  email: 'example@emapmle.com',
};

interface IProps {
  buttonTypes: any[];
  formDefaultValues: FormInputs | null;
  selectedTheme?: ITheme | null;
}

export const ButtonFields = (props: IProps) => {
  const { formDefaultValues, buttonTypes, selectedTheme } = props;
  const [iconElement, iconRefCallback] = useState<HTMLElement | null>(null);
  const { control, watch } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const typeOption = watch('typeOption');
  const icon = watch('icon');
  const kind = watch('kind');

  const defaultButton = {
    id: 0,
    type: 'button',
    author: {},
    data: {
      label: 'Заголовок',
      description: 'Описание',
      value: '',
      type: 'test_type',
      kind,
      icon,
    },
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
        <Label>Заголовок:</Label>
        <ControlledField
          name='label'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <InputText dimension='l' kind='formed' />
        </ControlledField>
      </GridColumn>
      <GridColumn>
        <Label>Подзаголовок:</Label>
        <ControlledField
          name='description'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <InputText dimension='l' kind='formed' />
        </ControlledField>
      </GridColumn>
      <GridColumn size={3}>
        <Label>Действие:</Label>
        <ControlledField
          name='typeOption'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <ButtonSelectStyled dimension='l' kind='formed' width={'100%'} options={buttonTypes} />
        </ControlledField>
      </GridColumn>
      <GridColumn size={9}>
        {typeOption ? <Label>{inputLabelMap[typeOption]}</Label> : <FakeLabel />}
        <ControlledField
          name='value'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <InputMask
            placeholder={placeholderMap[typeOption]}
            mask={typeOption}
            dimension='l'
            kind='formed'
          />
        </ControlledField>
      </GridColumn>
      <GridColumn size={12}>
        <Label>Выберите иконку:</Label>
        <RefTemplateButton ref={iconRefCallback}>
          <TargetBlockTypePreview selectedTheme={selectedTheme} block={defaultButton} />
        </RefTemplateButton>
        <ControlledField name={`icon`} control={control}>
          <ImageUploaderModule openerElement={iconElement} blockType='list' isEditable={true} />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
