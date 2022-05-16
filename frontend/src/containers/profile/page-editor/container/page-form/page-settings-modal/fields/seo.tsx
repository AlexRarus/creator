import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import Textarea from 'src/components/textarea';
import { IPage } from 'src/dal/pages/interfaces';

import { FormInputs } from '../interfaces';

interface IProps {
  formDefaultValues: FormInputs | null;
  pageData: IPage;
}

export const SEOFields = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  // TODO при разработке SSR в шаблон подставлять эти данные о странице
  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <ControlledField name='title' control={control} formDefaultValues={formDefaultValues}>
          <InputText label='Title' />
        </ControlledField>
      </GridColumn>
      <GridColumn>
        <ControlledField name='description' control={control} formDefaultValues={formDefaultValues}>
          <Textarea label='Description' />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
