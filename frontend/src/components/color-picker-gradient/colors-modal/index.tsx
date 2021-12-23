import React, { useState } from 'react';
import { ColorPicker } from 'src/components/color-picker';
import Modal, { MobileSize } from 'src/components/modal';
import { Form } from 'src/components/form';
import { useForm, useFieldArray } from 'react-hook-form';
import { Grid, GridColumn } from 'src/components/grid';
import { ControlledField } from 'src/components/controlled-field';
import { Select } from 'src/components/select';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { FormInputs, IColor } from './interfaces';
import { directions, prepareDataToForm, prepareValueToOutput, actions } from './utils';
import { ColorsFormWrapper, ColorFieldWrapper, DeleteIconWrapper } from './style';

interface IProps {
  onClose(): void;
  value: string;
  onSuccess(value: string): void;
  defaultColors: string[];
}

export const ColorsModal = (props: IProps) => {
  const { onClose, value, onSuccess, defaultColors } = props;
  const [formDefaultValues] = useState(prepareDataToForm(value, defaultColors));
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: formDefaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'colors',
  });

  const submit = async (formInputs: FormInputs) => {
    onSuccess(prepareValueToOutput(formInputs));
    onClose();
  };

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        handleSubmit(submit)();
        break;
      case 'cancel':
        onClose();
        break;
      case 'append':
        append({ value: '#FFFFFF' });
        break;
      default:
        onClose();
        return;
    }
  };

  return (
    <Modal onClose={onClose} mobileSize={MobileSize.L} title='Выбор градиента'>
      <ColorsFormWrapper>
        <Form onAction={onAction} actions={actions} submitActionLabel='Готово'>
          <Grid verticalGap={10}>
            <GridColumn>
              <ControlledField
                control={control}
                name='direction'
                formDefaultValues={formDefaultValues}>
                <Select options={directions} label='Направление градиента' />
              </ControlledField>
            </GridColumn>
            <GridColumn>
              {fields.map((field: IColor, index: number) => (
                <ColorFieldWrapper key={index}>
                  <ControlledField
                    control={control}
                    name={`colors.${index}.value`}
                    formDefaultValues={formDefaultValues}>
                    <ColorPicker label={`Цвет ${index + 1}`} />
                  </ControlledField>
                  <DeleteIconWrapper onClick={() => remove(index)} disabled={fields.length < 3}>
                    <DeleteForeverOutlinedIcon />
                  </DeleteIconWrapper>
                </ColorFieldWrapper>
              ))}
            </GridColumn>
          </Grid>
        </Form>
      </ColorsFormWrapper>
    </Modal>
  );
};
