import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { required } from 'src/utils/validators';
import ButtonsGroup from 'src/components/buttons-group';

import { FormInputs } from './interfaces';

interface IProps {
  formDefaultValues: FormInputs | null;
}

const buttonsOptions = [
  {
    value: 's',
    label: 's',
  },
  {
    value: 'm',
    label: 'm',
  },
  {
    value: 'l',
    label: 'l',
  },
];

export const AvatarBlockFields = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Grid verticalGap={24}>
      <GridColumn>
        <ControlledField
          name='dimension'
          control={control}
          rules={required()}
          formDefaultValues={formDefaultValues}>
          <ButtonsGroup buttons={buttonsOptions} />
        </ControlledField>
      </GridColumn>
    </Grid>
  );
};
