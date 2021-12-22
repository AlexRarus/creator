import React from 'react';
import { IBlock } from 'src/dal/blocks/interfaces';
import { ITheme } from 'src/dal/themes/interface';
import { ImageIcon } from 'src/components/image-icon';
import StarIcon from '@mui/icons-material/Star';

import { SeparatorBlock, IconBlock } from './style';

interface IProps {
  block: IBlock<any>;
  selectedTheme: ITheme | null;
}

export const SeparatorPreview = (props: IProps) => {
  const { block, selectedTheme } = props;
  const kind = block?.data?.kind;
  const icon = block?.data?.icon;
  const isWide = block?.data?.isWide;
  const isTransparent = block?.data?.isTransparent;
  const value = block?.data?.value;

  return (
    <SeparatorBlock
      {...selectedTheme?.button}
      isEmpty={kind === 'empty'}
      isWide={isWide}
      isTransparent={isTransparent}
      value={value}>
      {kind === 'icon' && (
        <IconBlock>
          {icon ? (
            <ImageIcon icon={icon} iconColor='red' size={20} />
          ) : (
            <StarIcon fontSize={'small'} />
          )}
        </IconBlock>
      )}
    </SeparatorBlock>
  );
};
