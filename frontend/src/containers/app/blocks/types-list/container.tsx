import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { IBlockType } from 'src/dal/blocks/interfaces';

import { useMapStoreToProps } from './selectors';
import { BlocksTypesContainerWrapper, TypeItem } from './style';

export const BlocksTypesContainer = observer(() => {
  const { types, getTypesListAction } = useMapStoreToProps();

  useEffect(() => {
    getTypesListAction();
  }, []);

  return (
    <BlocksTypesContainerWrapper>
      {types.length > 0 &&
        types.map((type: IBlockType) => (
          <TypeItem key={type.slug} to={`${type.slug}/new/`}>
            {type.label}
          </TypeItem>
        ))}
      {types.length === 0 && 'Нет типов в БД'}
    </BlocksTypesContainerWrapper>
  );
});
