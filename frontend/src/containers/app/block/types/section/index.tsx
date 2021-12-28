import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ISectionData } from 'src/dal/blocks/section-interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';

import { SectionBlock } from './style';

interface IProps {
  block: IBlock<ISectionData>;
}

export const SectionPreview = (props: IProps) => {
  const { block: section } = props;
  const subBlocks = section?.data?.blocks;
  const sectionData = section.data as any;

  return (
    <SectionBlock {...sectionData}>
      {subBlocks.map((block: IBlock<any>, index: number) => (
        <TargetBlockTypePreview key={index} block={block} />
      ))}
    </SectionBlock>
  );
};
