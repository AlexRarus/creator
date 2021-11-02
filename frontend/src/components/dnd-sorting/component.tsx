import React, { forwardRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { IProps } from './interfaces';
import { Sorting } from './sorting';

export const DnDSorting = forwardRef((props: IProps, ref: any) => {
  const {
    label = 'Выберите порядок',
    isEmptyLabel = false,
    onChange,
    value = [],
    CustomOption,
    CustomOptionLabel,
  } = props;
  const [dndAreaId] = useState(Math.random().toString());

  return (
    <DndProvider backend={HTML5Backend}>
      <Sorting
        dndAreaId={dndAreaId}
        label={label}
        isEmptyLabel={isEmptyLabel}
        selectedOptions={value}
        onChange={onChange}
        CustomOption={CustomOption}
        CustomOptionLabel={CustomOptionLabel}
      />
    </DndProvider>
  );
});
