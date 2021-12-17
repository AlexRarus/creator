import React from 'react';
import { Grid, GridColumn } from 'src/components/grid';

import { ItemsOrderingField } from './items-ordering-field';

export const CollapsedListBlockFields = () => {
  return (
    <Grid verticalGap={10} gap={0}>
      <GridColumn>
        <ItemsOrderingField />
      </GridColumn>
    </Grid>
  );
};
