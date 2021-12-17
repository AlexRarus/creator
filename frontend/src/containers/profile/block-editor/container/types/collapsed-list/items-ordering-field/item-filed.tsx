import React from 'react';
import { ControlledField } from 'src/components/controlled-field';
import InputText from 'src/components/input-text';
import Textarea from 'src/components/textarea';
import { useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { AnimationHeight } from 'src/components/animation-height';
import {
  TitleWrapper,
  DescriptionWrapper,
} from 'src/containers/app/block/types/collapsed-list/style';

import { ICollapsedListItem } from '../interfaces';

import { ItemFieldWrapper } from './style';

interface IProps {
  index: number;
  item: ICollapsedListItem;
  isExpand: boolean;
  onExpand(itemId: any): void;
  onExpandToggle(itemId: any): void;
}

export const ItemField = (props: IProps) => {
  const { index, item, isExpand, onExpand, onExpandToggle } = props;
  const { control } = useFormContext(); // так как Fields рендерятся внутри FormProvider, в контексте доступны значения формы

  const onTitleClick = () => {
    // при клике в другом месте заголовка переключать раскрытие и скрытие
    onExpandToggle(item.id);
  };
  const onInputTitleClick = (e: any) => {
    // при клике в инпут всегда раскрывать элементы
    e.stopPropagation();
    onExpand(item.id);
  };

  return (
    <ItemFieldWrapper>
      <TitleWrapper isExpand={isExpand} onClick={onTitleClick}>
        <AddIcon />
        <ControlledField name={`items.${index}.title`} control={control}>
          <InputText
            placeholder='Заголовок'
            fontSizeInherit={true}
            fontWeight='bold'
            onClick={onInputTitleClick}
          />
        </ControlledField>
      </TitleWrapper>
      <DescriptionWrapper>
        <AnimationHeight isOpen={isExpand} time={200}>
          <ControlledField name={`items.${index}.description`} control={control}>
            <Textarea placeholder='Описание' fontSizeInherit={true} />
          </ControlledField>
        </AnimationHeight>
      </DescriptionWrapper>
    </ItemFieldWrapper>
  );
};
