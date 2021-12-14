import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';
import InputMask from 'src/components/input-mask';

import { FormInputs } from './interfaces';
import { Label, FakeLabel, ButtonSelectStyled } from './style';

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
}

export const ButtonFields = (props: IProps) => {
  const { formDefaultValues, buttonTypes } = props;
  const { control, watch } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const typeOption = watch('typeOption');

  return (
    <Grid
      gap={12}
      verticalGap={12}
      breakPoints={{
        // все переданные здесь значения выставлены по-умолчанию
        // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
        '320px': 6, // 6 колонки при ширине экрана 320 и меньше
        '530px': 6, // 6 колонок при ширине экрана 530 и меньше
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
      <GridColumn size={4}>
        <Label>Выберите тип:</Label>
        <ControlledField
          name='typeOption'
          control={control}
          rules={{ ...maxLength(99) }}
          formDefaultValues={formDefaultValues}>
          <ButtonSelectStyled dimension='l' kind='formed' width={'100%'} options={buttonTypes} />
        </ControlledField>
      </GridColumn>
      <GridColumn size={8}>
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
    </Grid>
  );
};
