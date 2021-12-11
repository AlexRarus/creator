import React from 'react';

import { TextForm } from './text';
import { SectionForm } from './section';
import { AvatarForm } from './avatar';
import { ListForm } from './list';
import { ButtonForm } from './button';

interface IProps {
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: number | 'new';
  onSuccess(data: any): void;
  onCancel(): void;
  onClose(): void;
  isCloning: boolean;
  setIsCloning(isCloning: boolean): void;
  blockData?: any;
  blockIndex?: number;
}

export const TargetTypeForm = (props: IProps) => {
  switch (props.blockType) {
    case 'text':
      return <TextForm {...props} />;
    case 'section':
      return <SectionForm {...props} />;
    case 'avatar':
      return <AvatarForm {...props} />;
    case 'list':
      return <ListForm {...props} />;
    case 'button':
      return <ButtonForm {...props} />;
    default:
      return <div>Unknown block type</div>;
  }
};
