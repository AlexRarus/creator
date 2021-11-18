import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Grid, GridColumn } from 'src/components/grid';
import { IBlock } from 'src/dal/blocks/interfaces';
import { TargetBlockTypePreview } from 'src/containers/profile/blocks/preview';
import Button from 'src/components/button';
import ButtonLink from 'src/components/button-link';
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
          <BrowserView>
            <Button onClick={onClickAddBlock}>Add Block Modal</Button>
          </BrowserView>
          <MobileView>
            <ButtonLink to={`blocks/`} style={{ marginLeft: '10px' }}>
              Add Block Page
            </ButtonLink>
          </MobileView>
        </GridColumn>
      </Grid>
    </PageFormWrapper>
  );
};
