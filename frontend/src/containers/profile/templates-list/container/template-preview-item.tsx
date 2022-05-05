import React from 'react';
import { ITemplate } from 'src/dal/templates/interfaces';
import { IBlock } from 'src/dal/blocks/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useHistory } from 'react-router-dom';

import {
  TemplatePreviewWrapper,
  TemplatePreviewItemWrapper,
  TemplateContentPreview,
  TemplateLabel,
  BlockMock,
  IconsWrapper,
  EditButton,
  RemoveButton,
} from './style';

interface IProps {
  template: ITemplate;
  onClick(template: ITemplate): void;
  onRemoveTemplate(template: ITemplate): void;
}

export const TemplatePreviewItem = (props: IProps) => {
  const { template, onClick, onRemoveTemplate } = props;
  const { push } = useHistory();

  const clickHandler = () => {
    onClick(template);
  };

  const editHandler = () => {
    push(`/profile/templates/${template.slug}/`);
  };

  const removeHandler = () => {
    onRemoveTemplate(template);
  };

  return (
    <TemplatePreviewWrapper>
      <TemplatePreviewItemWrapper onClick={clickHandler}>
        <TemplateContentPreview>
          {template.blocks.map((block: IBlock<any>) => (
            <BlockMock key={block.id} />
          ))}
        </TemplateContentPreview>
        <TemplateLabel>{template.label}</TemplateLabel>
      </TemplatePreviewItemWrapper>
      <IconsWrapper>
        <EditButton onClick={editHandler}>
          <EditIcon />
        </EditButton>
        <RemoveButton onClick={removeHandler}>
          <DeleteForeverOutlinedIcon />
        </RemoveButton>
      </IconsWrapper>
    </TemplatePreviewWrapper>
  );
};
