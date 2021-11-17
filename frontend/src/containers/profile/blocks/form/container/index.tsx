import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useMapStoreToProps } from './selectors';
import { BlocksFormContainerWrapper } from './style';
import { TargetTypeForm } from './types';

interface IProps {
  onSuccess(data: any): void;
  onCancel(): void;
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: string;
}

// контейнер форма создания блока, можно нарисовать в любом месте приложения (в модалке или на отдельной странице)
export const BlocksFormContainer = observer((props: IProps) => {
  const { username, pageSlug, blockType, blockId } = props;
  const { isLoading, initAction, initialized } = useMapStoreToProps();

  useEffect(() => {
    initAction(blockId);
  }, [username, pageSlug, blockType, blockId]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <BlocksFormContainerWrapper>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <TargetTypeForm {...props} />}
    </BlocksFormContainerWrapper>
  );
});
