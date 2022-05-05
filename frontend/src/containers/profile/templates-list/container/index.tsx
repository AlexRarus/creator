import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { Confirm } from 'src/components/confirm';
import { ITemplate } from 'src/dal/templates/interfaces';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';

import { AddTemplateModal } from './add-template-modal';
import { TemplatePreviewItem } from './template-preview-item';
import { useMapStoreToProps } from './selectors';
import {
  TemplatesListWrapper,
  TemplatesListTitleDesktop,
  TemplateLabel,
  NewTemplateButtonWrapper,
  NewTemplateButton,
} from './style';

export const TemplatesListContainer = observer((props: any) => {
  const {
    isLoading,
    templates,
    getTemplatesListAction,
    createPageByTemplate,
    deleteTemplateAction,
  } = useMapStoreToProps();
  const { push } = useHistory();
  const [confirmTemplate, setConfirmTemplate] = useState<ITemplate | null>(null);
  const [isOpenAddTemplateModal, setIsOpenAddTemplateModal] = useState(false);
  const [removingTemplate, setRemovingTemplate] = useState<ITemplate | null>(null);

  useEffect(() => {
    getTemplatesListAction();
  }, []);

  const onConfirmCreatePageByTemplate = (template: ITemplate) => {
    setConfirmTemplate(template);
  };

  const onCreatePageByTemplate = () => {
    createPageByTemplate(confirmTemplate?.id as number);
  };

  const onDeclineCreatePageByTemplate = () => {
    setConfirmTemplate(null);
  };

  const openAddTemplateModal = () => setIsOpenAddTemplateModal(true);
  const closeAddTemplateModal = () => setIsOpenAddTemplateModal(false);

  const onSuccessAddTemplate = (data: any) => push(`/profile/templates/${data.slug}/`);

  const onConfirmRemoveTemplate = () => {
    if (removingTemplate) {
      deleteTemplateAction(removingTemplate.id);
      setRemovingTemplate(null);
    }
  };
  const onDeclineRemoveTemplate = () => {
    setRemovingTemplate(null);
  };

  return (
    <TemplatesListWrapper>
      <TemplatesListTitleDesktop>Шаблоны</TemplatesListTitleDesktop>
      {isLoading && 'Loading...'}
      {!isLoading && templates !== null && (
        <Grid>
          {templates.map((template: ITemplate) => (
            <GridColumn size={2} alignItems='center' key={template.slug}>
              <TemplatePreviewItem
                template={template}
                onClick={onConfirmCreatePageByTemplate}
                onRemoveTemplate={setRemovingTemplate}
              />
            </GridColumn>
          ))}
          {!isLoading && (
            <GridColumn size={2} alignItems='center'>
              <NewTemplateButtonWrapper>
                <NewTemplateButton onClick={openAddTemplateModal}>
                  <AddIcon />
                </NewTemplateButton>
                <TemplateLabel>Создать шаблон</TemplateLabel>
              </NewTemplateButtonWrapper>
            </GridColumn>
          )}
        </Grid>
      )}
      {isOpenAddTemplateModal && (
        <AddTemplateModal onClose={closeAddTemplateModal} onSuccess={onSuccessAddTemplate} />
      )}
      {Boolean(removingTemplate) && (
        <Confirm
          onConfirm={onConfirmRemoveTemplate}
          onClose={onDeclineRemoveTemplate}
          confirmMessage='Удалить шаблон и все его данные?'
          confirmTitle='Удаление шаблона'
          confirmButton={{
            label: 'Удалить',
            kind: 'delete',
          }}
        />
      )}
      {Boolean(confirmTemplate) && (
        <Confirm
          onConfirm={onCreatePageByTemplate}
          onClose={onDeclineCreatePageByTemplate}
          confirmMessage='Создать страницу из шаблона?'
          confirmTitle='Подтверждение'
        />
      )}
    </TemplatesListWrapper>
  );
});
