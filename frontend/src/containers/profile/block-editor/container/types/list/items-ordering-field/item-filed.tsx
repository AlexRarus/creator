import React, { useState } from 'react';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import { useFormContext, useWatch } from 'react-hook-form';
import { ImageUploaderModule } from 'src/modules/image-uploader-module';
import { ImageIcon } from 'src/components/image-icon';

import { IListItem } from '../interfaces';

import { ItemFieldWrapper, ItemFieldIconWrapper, ItemFieldContent } from './style';

interface IProps {
  index: number;
  item: IListItem;
}

export const ItemField = (props: IProps) => {
  const [iconElement, iconRefCallback] = useState<HTMLElement | null>(null);
  const { index } = props;
  const { control, watch } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы
  const iconSize = watch('iconSize');
  const fontSize = watch('fontSize');
  const template = watch('template');
  const icon = useWatch({
    name: `items.${index}.icon`,
    control,
  });

  return (
    <ItemFieldWrapper iconSize={parseInt(iconSize)} template={template.value}>
      <ItemFieldIconWrapper>
        <ImageIcon icon={icon} size={iconSize} ref={iconRefCallback} />
      </ItemFieldIconWrapper>
      <ItemFieldContent fontSize={fontSize.value}>
        <ControlledField name={`items.${index}.title`} control={control}>
          <InputText placeholder='Заголовок' fontSizeInherit={true} fontWeight='bold' />
        </ControlledField>
        <ControlledField name={`items.${index}.description`} control={control}>
          <InputText placeholder='Описание' fontSizeInherit={true} />
        </ControlledField>
      </ItemFieldContent>
      <ControlledField name={`items.${index}.icon`} control={control}>
        <ImageUploaderModule
          openerElement={iconElement}
          blockType='list'
          isEditable={true}
          isEditBorderRadius={true}
        />
      </ControlledField>
    </ItemFieldWrapper>
  );
};
