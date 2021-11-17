import React, { useState } from 'react';
import Modal from 'src/components/modal';
import { IBlockType } from 'src/dal/blocks/interfaces';
import { BlocksTypesContainer } from 'src/containers/profile/blocks/types-list/container';

import { BlocksFormContainer } from '../container';

interface IProps {
  onClose(): void;

  username: string;
  pageSlug: string;
  blockType?: string;
  blockId?: string;
}

// модалка создания блока для страницы, показываем на десктопе
export const BlockFormModal = (props: IProps) => {
  const { onClose, blockType: initBlockType, blockId = 'new', ...restProps } = props;
  const [blockType, setBlockType] = useState<string | undefined>(initBlockType);

  const onSetBlockType = (blockType: IBlockType) => setBlockType(blockType.slug);
  const onResetBlockType = () => setBlockType(undefined);
  const onSuccess = () => {
    console.log('send success');
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      {!blockType && <BlocksTypesContainer onSelectBlockType={onSetBlockType} />}
      {blockType && (
        <BlocksFormContainer
          {...restProps}
          blockId={blockId}
          blockType={blockType}
          onSuccess={onSuccess}
          onCancel={onResetBlockType}
        />
      )}
    </Modal>
  );
};
