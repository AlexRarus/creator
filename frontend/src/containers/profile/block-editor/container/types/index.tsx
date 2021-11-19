import React from 'react';

import { TextForm } from './text';

interface IProps {
  username: string;
  pageSlug: string;
  blockType: string;
  blockId: string;
  onSuccess(data: any): void;
  onCancel(): void;
}

export const TargetTypeForm = (props: IProps) => {
  switch (props.blockType) {
    case 'text':
      return <TextForm {...props} />;
    default:
      return <div>Unknown block type</div>;
  }
};
