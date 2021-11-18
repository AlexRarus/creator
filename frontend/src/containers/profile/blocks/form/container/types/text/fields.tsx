import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { required } from 'src/utils/validators';
import TinyEditor from 'src/components/tiny-editor';

import { FormInputs } from './interfaces';

interface IProps {
  formDefaultValues: FormInputs | null;
}

export const TextBlockFields = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <ControlledField
          name='text'
          control={control}
          rules={required()}
          formDefaultValues={formDefaultValues}>
          <TinyEditor />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
