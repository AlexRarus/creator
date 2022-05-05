import React, { useState } from 'react';
import Modal, { MobileSize } from 'src/components/modal';
import { IBlockType } from 'src/dal/blocks/interfaces';

import { BlocksTypesContainer } from './types-list/container';
import { BlocksFormContainer } from './container';

interface IProps {
  onSuccess(): void;
  onClose(): void;
  username?: string;
  pageSlug?: string;
  templateSlug?: string;
  blockId: number | 'new';
  blockData?: any;
  blockType?: string;
  blockIndex?: number;
}

const getTitle = (isNew: boolean, isCloning: boolean) => {
  if (isNew) {
    return 'Создание блока';
  }

  if (isCloning) {
    return 'Клонирование блока';
  }

  return 'Редактирование блока';
};

// модалка создания блока для страницы
export const BlockEditorModal = (props: IProps) => {
  const { onSuccess, onClose, blockType: initBlockType, blockId, ...restProps } = props;
  const [blockType, setBlockType] = useState<string | undefined>(initBlockType);
  const [isCloning, setIsCloning] = useState(false);

  const onSetBlockType = (blockType: IBlockType) => setBlockType(blockType.slug);
  const onResetBlockType = () => setBlockType(undefined);

  const onSuccessHandler = () => {
    onSuccess();
  };
  const onCancel = () => {
    if (initBlockType === 'section') {
      onClose();
    } else {
      onResetBlockType();
    }
  };

  return (
    <Modal
      onClose={onClose}
      mobileSize={MobileSize.L}
      title={getTitle(blockId === 'new', isCloning)}>
      {!blockType && <BlocksTypesContainer onSelectBlockType={onSetBlockType} />}
      {blockType && (
        <BlocksFormContainer
          {...restProps}
          blockId={blockId}
          blockType={blockType}
          onSuccess={onSuccessHandler}
          onCancel={onCancel}
          onClose={onClose}
          isCloning={isCloning}
          setIsCloning={setIsCloning}
        />
      )}
    </Modal>
  );
};
