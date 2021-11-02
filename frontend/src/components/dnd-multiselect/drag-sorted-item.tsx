import React, { useRef, RefObject, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Modal from 'src/components/modal';

import { SortedItem } from './style';
import { IDragItem, ISortedItemProps } from './interfaces';
import Option from './option';
import RemoveConfirm from './remove-confirm';

export const DragSortedItem = (props: ISortedItemProps) => {
  const {
    option,
    index,
    moveItem,
    onRemoveOption,
    CustomOption,
    CustomOptionLabel,
    CustomRemoveConfirm,
    hoverIndexRef,
  } = props;
  const ref: RefObject<any> = useRef<HTMLElement | null>(null);
  const [isOpenRemoveConfirm, setIsOpenRemoveConfirm] = useState(false);

  const [{ handlerId, canDrop, isOver }, drop] = useDrop({
    accept: ['selected'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      };
    },
    hover(item: IDragItem, monitor) {
      if (hoverIndexRef.current !== index) {
        hoverIndexRef.current = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'selected',
    item: (): IDragItem => {
      return {
        ...option,
        index,
      } as IDragItem;
    },
    end: (item: IDragItem) => {
      const dragIndex = item.index;

      moveItem(dragIndex, hoverIndexRef.current);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const onRemove = () => {
    onRemoveOption(index);
    if (isOpenRemoveConfirm) {
      closeRemoveConfirm();
    }
  };

  const closeRemoveConfirm = () => setIsOpenRemoveConfirm(false);
  const openRemoveConfirm = () => setIsOpenRemoveConfirm(true);

  return (
    <SortedItem ref={ref} data-handler-id={handlerId}>
      {CustomOption ? (
        <CustomOption
          option={option}
          index={index}
          sorting={true}
          onRemove={openRemoveConfirm}
          canDrop={canDrop}
          isOver={isOver}
          isDragging={isDragging}
        />
      ) : (
        <Option
          option={option}
          index={index}
          sorting={true}
          onRemove={openRemoveConfirm}
          canDrop={canDrop}
          isOver={isOver}
          isDragging={isDragging}
        >
          {CustomOptionLabel && <CustomOptionLabel option={option} />}
        </Option>
      )}
      {isOpenRemoveConfirm && (
        <Modal onClose={closeRemoveConfirm}>
          {CustomRemoveConfirm ? (
            <CustomRemoveConfirm option={option} remove={onRemove} close={closeRemoveConfirm} />
          ) : (
            <RemoveConfirm option={option} remove={onRemove} close={closeRemoveConfirm} />
          )}
        </Modal>
      )}
    </SortedItem>
  );
};
