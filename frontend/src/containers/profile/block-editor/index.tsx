import React, { useState } from 'react';
import Modal from 'src/components/modal';
import { IBlockType } from 'src/dal/blocks/interfaces';

import { BlocksTypesContainer } from './types-list/container';
import { BlocksFormContainer } from './container';

interface IProps {
  onSuccess(): void;
  onClose(): void;
  username: string;
  pageSlug: string;
  blockType?: string;
  blockId?: string;
}

// модалка создания блока для страницы
export const BlockEditorModal = (props: IProps) => {
  const { onSuccess, onClose, blockType: initBlockType, blockId = 'new', ...restProps } = props;
  const [blockType, setBlockType] = useState<string | undefined>(initBlockType);

  const onSetBlockType = (blockType: IBlockType) => setBlockType(blockType.slug);
  const onResetBlockType = () => setBlockType(undefined);

  const onSuccessHandler = () => {
    console.log('onSuccess from MODAL');
    onSuccess();
    onClose();
  };
  const onCancel = () => {
    console.log('onCancel from MODAL');
    onResetBlockType();
  };

  return (
    <Modal onClose={onClose}>
      {!blockType && <BlocksTypesContainer onSelectBlockType={onSetBlockType} />}
      {blockType && (
        <BlocksFormContainer
          {...restProps}
          blockId={blockId}
          blockType={blockType}
          onSuccess={onSuccessHandler}
          onCancel={onCancel}
        />
      )}
    </Modal>
  );
};
