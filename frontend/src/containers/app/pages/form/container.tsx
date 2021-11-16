import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import ButtonLink from 'src/components/button-link';
import { IBlock } from 'src/dal/blocks/interfaces';

import { useMapStoreToProps } from './selectors';
import { PagesFormWrapper } from './style';

interface IParams {
  username: string;
  pageSlug: string;
}

export const PagesFormContainer = observer(() => {
  const { isLoading, getMyPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug } = useParams<IParams>();
  const isAuthor = useIsAuthor(username); // show 404 page

  useEffect(() => {
    if (isAuthor) {
      getMyPageBySlugAction(pageSlug);
    }
  }, [isAuthor, pageSlug]);

  return (
    <PagesFormWrapper>
      {!isAuthor && 'Error...'}
      {isLoading && isAuthor && 'Loading...'}
      {!isLoading && data !== null && (
        <Grid verticalGap={32}>
          <GridColumn size={12} direction='row' alignItems='center'>
            <Grid>
              {data.blocks.map((block: IBlock) => (
                <GridColumn key={block.id} size={12}>
                  {block.id} - {block.type}
                </GridColumn>
              ))}
            </Grid>
          </GridColumn>
          <GridColumn>
            <ButtonLink to={`blocks/`} style={{ marginLeft: '10px' }}>
              Add Block
            </ButtonLink>
          </GridColumn>
          <GridColumn>
            <ButtonLink to={`/${username}/${data.slug}/`} style={{ marginLeft: '10px' }}>
              Show Preview
            </ButtonLink>
          </GridColumn>
        </Grid>
      )}
    </PagesFormWrapper>
  );
});
