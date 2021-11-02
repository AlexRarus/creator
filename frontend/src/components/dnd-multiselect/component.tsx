import React, { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { IProps } from './interfaces';
import { Sorting } from './sorting';
import { Searching } from './searching';
import { DndMultiselectWrapper } from './style';

export const DnDMultiselect = forwardRef((props: IProps, ref: any) => {
  const {
    label = 'Выберите порядок',
    searchLabel = 'Поиск',
    onChange,
    value = [],
    CustomOption,
    CustomOptionLabel,
    options = [],
    ...inputSearchProps
  } = props;

  return (
    <DndProvider backend={HTML5Backend}>
      <input type='hidden' ref={ref} />
      <DndMultiselectWrapper>
        <Sorting
          label={label}
          selectedOptions={value}
          onChange={onChange}
          CustomOption={CustomOption}
          CustomOptionLabel={CustomOptionLabel}
        />
        <Searching
          searchLabel={searchLabel}
          selectedOptions={value}
          searchOptions={options}
          onChange={onChange}
          CustomOption={CustomOption}
          CustomOptionLabel={CustomOptionLabel}
          {...inputSearchProps}
        />
      </DndMultiselectWrapper>
    </DndProvider>
  );
});
