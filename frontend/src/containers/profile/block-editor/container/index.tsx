import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Loader } from 'src/components/loader';

import { useMapStoreToProps } from './selectors';
import { BlockEditorContainerWrapper, LoadingBox } from './style';
import { TargetTypeForm } from './types';

interface IProps {
  onSuccess(data: any): void;
  onCancel(): void;
  onClose(): void;
  username?: string;
  pageSlug?: string;
  templateSlug?: string;
  blockType: string;
  blockId: number | 'new';
  isCloning: boolean;
  setIsCloning(isCloning: boolean): void;
  blockData?: any;
  blockIndex?: number;
}

// контейнер форма создания блока, можно нарисовать в любом месте приложения (в модалке или на отдельной странице)
export const BlocksFormContainer = observer((props: IProps) => {
  const { username, pageSlug, templateSlug, blockType, blockId } = props;
  const { isLoading, initAction, resetAction, initialized } = useMapStoreToProps();

  useEffect(() => {
    initAction(blockId);

    return () => resetAction();
  }, [username, pageSlug, templateSlug, blockType, blockId]);

  if (!initialized) {
    return (
      <LoadingBox>
        <Loader size={48} />
      </LoadingBox>
    );
  }

  return (
    <BlockEditorContainerWrapper>
      {isLoading && (
        <LoadingBox>
          <Loader size={48} />
        </LoadingBox>
      )}
      {!isLoading && <TargetTypeForm {...props} />}
    </BlockEditorContainerWrapper>
  );
});
