import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { required, maxLength } from 'src/utils/validators';
import InputText from 'src/components/input-text';

import { FormInputs } from './interfaces';
import { Label } from './style';

interface IProps {
  formDefaultValues: FormInputs | null;
}

export const SectionFields = (props: IProps) => {
  const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <Grid
      gap={20}
      breakPoints={{
        // все переданные здесь значения выставлены по-умолчанию
        // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
        '320px': 6, // 6 колонки при ширине экрана 320 и меньше
        '530px': 6, // 6 колонок при ширине экрана 530 и меньше
        '950px': 12, // 12 колонок при ширине экрана 950 и меньше
        '1024px': 12, // 12 колонок при ширине экрана 1024 и меньше
        '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
      }}>
      <GridColumn size={6}>
        <Label>Цвет фона</Label>
        <ControlledField
          name='background'
          control={control}
          rules={{ ...required(), ...maxLength(35) }}
          formDefaultValues={formDefaultValues}>
          <InputText dimension={'xl'} kind={'formed'} />
        </ControlledField>
      </GridColumn>
      {/*<GridColumn size={6}>*/}
      {/*  <ControlledField*/}
      {/*    name='borderRadius'*/}
      {/*    control={control}*/}
      {/*    rules={{ ...required(), ...maxLength(35) }}*/}
      {/*    formDefaultValues={formDefaultValues}>*/}
      {/*    <InputText dimension={'xl'} kind={'formed'} placeholder='скругленность углов' />*/}
      {/*  </ControlledField>*/}
      {/*</GridColumn>*/}
      {/*<GridColumn size={6}>*/}
      {/*  <ControlledField*/}
      {/*    name='paddingTop'*/}
      {/*    control={control}*/}
      {/*    rules={{ ...required(), ...maxLength(35) }}*/}
      {/*    formDefaultValues={formDefaultValues}>*/}
      {/*    <InputText dimension={'xl'} kind={'formed'} placeholder='отступ сверху' />*/}
      {/*  </ControlledField>*/}
      {/*</GridColumn>*/}
      {/*<GridColumn size={6}>*/}
      {/*  <ControlledField*/}
      {/*    name='paddingBottom'*/}
      {/*    control={control}*/}
      {/*    rules={{ ...required(), ...maxLength(35) }}*/}
      {/*    formDefaultValues={formDefaultValues}>*/}
      {/*    <InputText dimension={'xl'} kind={'formed'} placeholder='отступ снизу' />*/}
      {/*  </ControlledField>*/}
      {/*</GridColumn>*/}
      {/*<GridColumn size={6}>*/}
      {/*  <ControlledField*/}
      {/*    name='paddingRight'*/}
      {/*    control={control}*/}
      {/*    rules={{ ...required(), ...maxLength(35) }}*/}
      {/*    formDefaultValues={formDefaultValues}>*/}
      {/*    <InputText dimension={'xl'} kind={'formed'} placeholder='отступ справа' />*/}
      {/*  </ControlledField>*/}
      {/*</GridColumn>*/}
      {/*<GridColumn size={6}>*/}
      {/*  <ControlledField*/}
      {/*    name='paddingLeft'*/}
      {/*    control={control}*/}
      {/*    rules={{ ...required(), ...maxLength(35) }}*/}
      {/*    formDefaultValues={formDefaultValues}>*/}
      {/*    <InputText dimension={'xl'} kind={'formed'} placeholder='отступ снизу' />*/}
      {/*  </ControlledField>*/}
      {/*</GridColumn>*/}
    </Grid>
  );
};
