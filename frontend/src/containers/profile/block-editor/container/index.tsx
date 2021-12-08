import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useMapStoreToProps } from './selectors';
import { BlockEditorContainerWrapper } from './style';
import { TargetTypeForm } from './types';

interface IProps {
  onSuccess(data: any): void;
  onCancel(): void;
  onClose(): void;
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: number | 'new';
  isCloning: boolean;
  setIsCloning(isCloning: boolean): void;
  blockData?: any;
  blockIndex?: number;
}

// контейнер форма создания блока, можно нарисовать в любом месте приложения (в модалке или на отдельной странице)
export const BlocksFormContainer = observer((props: IProps) => {
  const { username, pageSlug, blockType, blockId } = props;
  const { isLoading, initAction, resetAction, initialized } = useMapStoreToProps();

  useEffect(() => {
    initAction(blockId);

    return () => resetAction();
  }, [username, pageSlug, blockType, blockId]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <BlockEditorContainerWrapper>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <TargetTypeForm {...props} />}
    </BlockEditorContainerWrapper>
  );
});
