import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { useMapStoreToProps } from './selectors';
import { BlocksFormContainerWrapper } from './style';

interface IParams {
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: string;
}

export const BlocksFormContainer = observer(() => {
  const { username, pageSlug, blockType, blockId } = useParams<IParams>();
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
