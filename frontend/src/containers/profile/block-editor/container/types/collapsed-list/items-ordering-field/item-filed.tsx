import React from 'react';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import Textarea from 'src/components/textarea';
import { useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { AnimationHeight } from 'src/components/animation-height';
import { CollapsedTrigger } from 'src/containers/app/block/types/collapsed-list/style';

import { ICollapsedListItem } from '../interfaces';

import { ItemFieldWrapper, Content } from './style';

interface IProps {
  index: number;
  item: ICollapsedListItem;
  isExpand: boolean;
  onExpandToggle(itemId: any): void;
}

export const ItemField = (props: IProps) => {
  const { index, item, isExpand, onExpandToggle } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  return (
    <ItemFieldWrapper>
      <CollapsedTrigger isExpand={isExpand}>
        <AddIcon onClick={() => onExpandToggle(item.id)} />
      </CollapsedTrigger>
      <Content>
        <ControlledField name={`items.${index}.title`} control={control}>
          <InputText placeholder='Заголовок' fontSizeInherit={true} fontWeight='bold' />
        </ControlledField>
        <AnimationHeight isOpen={isExpand} time={200}>
          <ControlledField name={`items.${index}.description`} control={control}>
            <Textarea placeholder='Описание' fontSizeInherit={true} />
          </ControlledField>
        </AnimationHeight>
      </Content>
    </ItemFieldWrapper>
  );
};
