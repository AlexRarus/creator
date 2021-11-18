import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import ButtonLink from 'src/components/button-link';
import { TargetBlockTypePreview } from 'src/containers/profile/blocks/preview';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IPage } from 'src/dal/pages/interfaces';

import { useMapStoreToProps } from './selectors';
import { PageWrapper } from './style';

interface IProps {
  username: string;
  pageSlug: string;
  previewData?: IPage;
}

export const PageContainer = observer((props: IProps) => {
  const { isLoading, getPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug, previewData } = props;
  const isAuthor = useIsAuthor(username);

  useEffect(() => {
    // если передали данные для предпросмотра то НЕ запрашиваем страницу с бэка
    if (!previewData) {
      getPageBySlugAction(username, pageSlug);
    }
  }, [isAuthor, pageSlug, previewData]);

  const resultData = previewData || data;

  return (
    <PageWrapper>
      {isLoading && 'Loading...'}
      {resultData && (
        <Grid>
          {resultData.blocks.map((block: IBlock<any>) => (
            <GridColumn key={block.id} size={12}>
              <TargetBlockTypePreview block={block} />
            </GridColumn>
          ))}
          <GridColumn size={12}>
            {isAuthor && !previewData && (
              <ButtonLink
                to={`/profile/${username}/pages/${resultData.slug}/`}
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
