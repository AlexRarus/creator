import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import ButtonLink from 'src/components/button-link';
import { TargetBlockTypePreview } from 'src/containers/profile/blocks/preview';
import { IBlock } from 'src/dal/blocks/interfaces';

import { useMapStoreToProps } from './selectors';
import { PageWrapper } from './style';

interface IProps {
  username: string;
  pageSlug: string;
}

export const PageContainer = observer((props: IProps) => {
  const { isLoading, getPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug } = props;
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    getPageBySlugAction(username, pageSlug);
  }, [isAuthor, pageSlug]);

  return (
    <PageWrapper>
      {isLoading && 'Loading...'}
      {!isLoading && data !== null && (
        <Grid>
          {data.blocks.map((block: IBlock<any>) => (
            <GridColumn key={block.id} size={12}>
              <TargetBlockTypePreview block={block} />
            </GridColumn>
          ))}
          <GridColumn size={12}>
            {isAuthor && (
              <ButtonLink
                to={`/profile/${username}/pages/${data.slug}/`}
                style={{ marginLeft: '10px' }}>
                Edit Page
              </ButtonLink>
            )}
          </GridColumn>
        </Grid>
      )}
    </PageWrapper>
  );
});
