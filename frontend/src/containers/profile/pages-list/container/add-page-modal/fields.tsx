import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { required } from 'src/utils/validators';
import InputText from 'src/components/input-text';

export const AddPageFields = () => {
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <ControlledField name='label' control={control} rules={required()}>
          <InputText label='Наименование страницы' />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
