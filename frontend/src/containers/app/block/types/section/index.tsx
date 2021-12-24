import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ISectionData } from 'src/dal/blocks/section-interfaces';
import { ITheme } from 'src/dal/themes/interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';

import { SectionBlock } from './style';

interface IProps {
  block: IBlock<ISectionData>;
  selectedTheme?: ITheme | null;
}

export const SectionPreview = (props: IProps) => {
  const { block: section, selectedTheme } = props;
  const subBlocks = section?.data?.blocks;
  const sectionData = section.data as any;

  return (
    <SectionBlock {...sectionData}>
      {subBlocks.map((block: IBlock<any>, index: number) => (
        <TargetBlockTypePreview key={index} block={block} selectedTheme={selectedTheme} />
      ))}
    </SectionBlock>
  );
};
