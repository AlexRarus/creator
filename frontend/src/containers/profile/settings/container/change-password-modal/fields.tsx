import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { required, maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';

export const ChangePasswordFields = () => {
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <ControlledField name='currentPassword' control={control} rules={{ ...required() }}>
          <InputText label='Текущий пароль' />
        </ControlledField>
        <ControlledField name='newPassword' control={control} rules={{ ...required() }}>
          <InputText label='Новый пароль' />
        </ControlledField>
        <ControlledField name='newPasswordRepeat' control={control} rules={{ ...required() }}>
          <InputText label='Повторите новый пароль' />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
