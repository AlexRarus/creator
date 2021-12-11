import React from 'react';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import { useFormContext } from 'react-hook-form';

import { IListItem } from '../interfaces';

import {
  ItemFieldWrapper,
  ItemFieldIconWrapper,
  ItemFieldIconShape,
  ItemFieldContent,
} from './style';

interface IProps {
  index: number;
  item: IListItem;
}

export const ItemField = (props: IProps) => {
  const { index } = props;
  const { control, watch } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const iconSize = watch('iconSize');
  const fontSize = watch('fontSize');
  const template = watch('template');

  return (
    <ItemFieldWrapper iconSize={parseInt(iconSize)} template={template.value}>
      <ItemFieldIconWrapper>
        <ItemFieldIconShape iconSize={iconSize}>icon</ItemFieldIconShape>
      </ItemFieldIconWrapper>
      <ItemFieldContent fontSize={fontSize.value}>
        <ControlledField name={`items.${index}.title`} control={control}>
          <InputText placeholder='Заголовок' fontSizeInherit={true} fontWeight='bold' />
        </ControlledField>
        <ControlledField name={`items.${index}.description`} control={control}>
          <InputText placeholder='Описание' fontSizeInherit={true} />
        </ControlledField>
      </ItemFieldContent>
    </ItemFieldWrapper>
  );
};
