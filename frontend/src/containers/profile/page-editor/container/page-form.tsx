import React from 'react';
import { Grid, GridColumn } from 'src/components/grid';
import { IBlock } from 'src/dal/blocks/interfaces';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import Button from 'src/components/button';
import { IPage } from 'src/dal/pages/interfaces';

import { PageFormWrapper } from './style';

interface IProps {
  data: IPage;
  username: string;
  pageSlug: string;
  onClickAddBlock?: () => void;
}

export const PageForm = (props: IProps) => {
  const { data, onClickAddBlock } = props;

  return (
    <PageFormWrapper>
      <Grid verticalGap={32}>
        <GridColumn size={12} direction='row' alignItems='center'>
          <Grid>
            {data.blocks.map((block: IBlock<any>) => (
              <GridColumn key={block.id} size={12}>
                <TargetBlockTypePreview block={block} />
              </GridColumn>
            ))}
          </Grid>
        </GridColumn>
        <GridColumn>
          <Button onClick={onClickAddBlock}>Add Block Modal</Button>
        </GridColumn>
      </Grid>
    </PageFormWrapper>
  );
};
