import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import Button from 'src/components/button';

import { FormInputs } from '../interfaces';

import { ItemsOrderingFieldWrapper } from './style';
import { DroppableList } from './droppable-list';

interface IProps {
  formDefaultValues: FormInputs | null;
}

export const ItemsOrderingField = (props: IProps) => {
  // const { formDefaultValues } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onChangeOrder = (startIndex: number, endIndex: number) => {
    move(startIndex, endIndex);
  };

  const onRemove = (index: number) => {
    remove(index);
  };

  return (
    <ItemsOrderingFieldWrapper>
      <DroppableList fields={fields} onChangeOrder={onChangeOrder} onRemove={onRemove} />
      <Button onClick={() => append({ title: '', description: '' })}>Добавить новый пункт</Button>
    </ItemsOrderingFieldWrapper>
  );
};
