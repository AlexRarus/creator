import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';

import { FormInputs } from '../interfaces';

interface IProps {
  formDefaultValues: FormInputs | null;
}

export const SEOFields = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <ControlledField name='title' control={control} formDefaultValues={formDefaultValues}>
          <InputText label='Title' />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
