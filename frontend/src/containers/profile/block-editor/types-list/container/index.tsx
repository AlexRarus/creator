import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { IBlockType } from 'src/dal/blocks/interfaces';

import { useMapStoreToProps } from './selectors';
import { BlocksTypesContainerWrapper } from './style';
import { BlockTypeItem } from './type-item';

interface IProps {
  onSelectBlockType(type: IBlockType): void;
}

// контейнер выбора типа блока, можно отрендерить в любом месте приложения
export const BlocksTypesContainer = observer((props: IProps) => {
  const { onSelectBlockType } = props;
  const { types, getTypesListAction } = useMapStoreToProps();

  useEffect(() => {
    getTypesListAction();
  }, []);

  return (
    <BlocksTypesContainerWrapper>
      {types.length > 0 &&
        types.map((type: IBlockType) => (
          <BlockTypeItem key={type.slug} type={type} onClick={onSelectBlockType} />
        ))}
      {types.length === 0 && 'Нет доступных типов'}
    </BlocksTypesContainerWrapper>
  );
});
