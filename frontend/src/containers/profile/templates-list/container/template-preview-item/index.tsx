import React from 'react';
import { ITemplate } from 'src/dal/templates/interfaces';
import { IBlock } from 'src/dal/blocks/interfaces';
import { useNavigate } from 'react-router-dom';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IUser } from 'src/dal/auth/interfaces';

import {
  TemplatePreviewWrapper,
  TemplatePreviewItemWrapper,
  DeviceOuter,
  DeviceInner,
  DeviceActions,
  BlockMock,
} from './style';
import { actions } from './utils';

interface IProps {
  template: ITemplate;
  onClick(template: ITemplate): void;
  deleteTemplateAction(templateId: number): void;
  user: IUser | null;
  username?: string;
  templateType?: string;
}

export const TemplatePreviewItem = (props: IProps) => {
  const { username, templateType, template, onClick, deleteTemplateAction, user } = props;
  const navigate = useNavigate();

  const clickHandler = () => {
    onClick(template);
  };

  const editHandler = () => {
    navigate(`/profile/${username}/templates/${templateType}/${template.slug}/`);
  };

  const deleteHandler = () => {
    deleteTemplateAction(template.id);
  };

  const onAction = (actionId: string) => {
    switch (actionId) {
      case 'delete':
        deleteHandler();
        break;
      case 'edit':
        editHandler();
        break;
      default:
        console.warn('Unknown action type', actionId);
    }
  };

  return (
    <TemplatePreviewWrapper>
      <TemplatePreviewItemWrapper>
        <DeviceOuter>
          <DeviceInner onClick={clickHandler}>
            {template.blocks.map((block: IBlock<any>) => (
              <BlockMock key={block.id} isSection={block.type === 'section'}>
                <TargetBlockTypePreview block={block} />
              </BlockMock>
            ))}
          </DeviceInner>
          {user?.role === 'admin' && (
            <DeviceActions actions={actions} onAction={onAction} withLayout={true} />
          )}
        </DeviceOuter>
      </TemplatePreviewItemWrapper>
    </TemplatePreviewWrapper>
  );
};
