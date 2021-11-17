import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useMapStoreToProps } from './selectors';
import { BlocksFormContainerWrapper } from './style';

interface IProps {
  onSuccess(): void;
  onCancel(): void;
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: string;
}

// контейнер форма создания блока, можно нарисовать в любом месте приложения (в модалке или на отдельной странице)
export const BlocksFormContainer = observer((props: IProps) => {
  const { username, pageSlug, blockType, blockId } = props;
  const { isLoading, getBlockByIdAction } = useMapStoreToProps();

  useEffect(() => {
    if (blockId !== 'new') {
      getBlockByIdAction(blockId);
    }
  }, [username, pageSlug, blockType, blockId]);

  return (
    <BlocksFormContainerWrapper>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <div>block form type "{blockType}"</div>}
    </BlocksFormContainerWrapper>
  );
});
