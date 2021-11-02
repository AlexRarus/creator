import React, { useCallback, useRef } from 'react';
import update from 'immutability-helper';

import { DragSortedItem } from './drag-sorted-item';
import { SortingWrapper, SortingLabel, SortingOptions } from './style';
import { ISortingProps, IOption } from './interfaces';

export const Sorting = (props: ISortingProps) => {
  const { dndAreaId, label, isEmptyLabel, selectedOptions, onChange, ...restProps } = props;
  const hoverIndexRef = useRef(0);

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = selectedOptions[dragIndex];
      const sortedOptions = update(selectedOptions, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      });
      onChange && onChange(sortedOptions);
    },
    [selectedOptions]
  );

  const onRemoveOption = (optionIndex: number) => {
    const sortedOptions = update(selectedOptions, {
      $splice: [[optionIndex, 1]],
    });
    onChange && onChange(sortedOptions);
  };

  const renderDragSortedItem = (option: IOption, index: any) => {
    return (
      <DragSortedItem
        key={option.value}
        dndAreaId={dndAreaId}
        index={index}
        option={option}
        moveItem={moveItem}
        onRemoveOption={onRemoveOption}
        {...restProps}
        hoverIndexRef={hoverIndexRef}
      />
    );
  };

  return (
    <SortingWrapper>
      {!isEmptyLabel && <SortingLabel>{label}</SortingLabel>}
      <SortingOptions>
        {selectedOptions.map((option: IOption, i) => renderDragSortedItem(option, i))}
      </SortingOptions>
    </SortingWrapper>
  );
};
