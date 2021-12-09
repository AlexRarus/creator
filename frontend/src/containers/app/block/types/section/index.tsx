import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interface';
import { TargetBlockTypePreview } from 'src/containers/app/block';

import { SectionBlock } from './style';

interface IProps {
  block: IBlock<any>;
  selectedTheme: ITheme | null;
}

export const SectionPreview = (props: IProps) => {
  const { block: section, selectedTheme } = props;
  const subBlocks = section?.data?.blocks;

  return (
    <SectionBlock {...section.data}>
      {subBlocks.map((block: any, index: number) => (
        <TargetBlockTypePreview key={index} block={block} selectedTheme={selectedTheme} />
      ))}
    </SectionBlock>
  );
};
