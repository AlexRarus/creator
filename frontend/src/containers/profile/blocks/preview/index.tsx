import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';

import { TextPreview } from './types/text';

interface IProps {
  block: IBlock<any>;
}

export const TargetBlockTypePreview = (props: IProps) => {
  switch (props.block.type) {
    case 'text':
      return <TextPreview {...props} />;
    default:
      return <div>Unknown block type</div>;
  }
};
