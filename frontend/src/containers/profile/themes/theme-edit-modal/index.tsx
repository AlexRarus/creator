import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Modal, { MobileSize } from 'src/components/modal';

import { useMapStoreToProps } from './selectors';
import { ThemeEditorWrapper } from './style';
import { ThemeForm } from './theme-form';

interface IProps {
  themeId: number | 'new';
  onClose(): void;
  onSuccess?(data: any): void;
  onRemove?(): void;
}

export const ThemeEditModal = observer((props: IProps) => {
  const { themeId: initThemeId, onClose } = props;
  const [themeId, setThemeId] = useState(initThemeId);
  const { initialized, initAction, resetAction } = useMapStoreToProps();
  const isEditing = themeId !== 'new';

  useEffect(() => {
    initAction(initThemeId);

    return () => resetAction();
  }, [initThemeId]);

  return (
    <Modal
      onClose={onClose}
      mobileSize={MobileSize.L}
      title={`${isEditing ? 'Редактирование' : 'Создание'} темы`}
      isCloseOutside={false}>
      <ThemeEditorWrapper>
        {!initialized && 'Loading...'}
        {initialized && <ThemeForm {...props} themeId={themeId} setThemeId={setThemeId} />}
      </ThemeEditorWrapper>
    </Modal>
  );
});
