import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledField } from 'src/components/controlled-field';
import Select from 'src/components/select';
import InputRange from 'src/components/input-range';
import { Grid, GridColumn } from 'src/components/grid';

import { fontSizeOptions, templateOptions } from './utils';
import { FormInputs } from './interfaces';
import { BaseControlsWrapper } from './style';
import { ItemsOrderingField } from './items-ordering-field';

interface IProps {
  formDefaultValues: FormInputs | null;
}

export const ListBlockFields = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Grid verticalGap={10} gap={0}>
      <GridColumn>
        <BaseControlsWrapper>
          <Grid verticalGap={10}>
            <GridColumn direction='row'>
              <ControlledField name='fontSize' control={control}>
                <Select options={fontSizeOptions} label='Размер текста' />
              </ControlledField>
              <ControlledField name='template' control={control}>
                <Select options={templateOptions} label='Расположение иконки' />
              </ControlledField>
            </GridColumn>
            <GridColumn>
              <ControlledField
                name='iconSize'
                control={control}
                formDefaultValues={formDefaultValues}>
                <InputRange label='Размер иконки' min={30} max={90} />
              </ControlledField>
            </GridColumn>
          </Grid>
        </BaseControlsWrapper>
      </GridColumn>
      <GridColumn>
        <ItemsOrderingField formDefaultValues={formDefaultValues} />
      </GridColumn>
    </Grid>
  );
};
