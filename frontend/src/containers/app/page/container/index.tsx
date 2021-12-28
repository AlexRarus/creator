import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Grid, GridColumn } from 'src/components/grid';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { ITheme } from 'src/dal/themes/interfaces';
import { useAppTypeContext } from 'src/providers/app-type-provider';

import { useMapStoreToProps } from './selectors';
import { PageWrapper } from './style';

interface IProps {
  username: string;
  pageSlug: string;
  previewData?: IPage;
  selectedTheme?: ITheme | null;
}

// TODO тему для отображения пользовательской страницы берем у АВТОРА страницы
export const PageContainer = observer((props: IProps) => {
  const { isLoading, getPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug, previewData } = props;
  const isAuthor = useIsAuthor(username);
  const { appType } = useAppTypeContext();

  useEffect(() => {
    // если передали данные для предпросмотра то НЕ запрашиваем страницу с бэка
    if (!previewData) {
      getPageBySlugAction(username, pageSlug);
    }
  }, [isAuthor, pageSlug, previewData]);

  const pageData: IPage | null = previewData || data;

  return (
    <PageWrapper
      isApp={appType === 'app'}
      // высота блока для скролла = screenHeight - верхнее меню - нижний блок кнопок
      blockViewHeight={window?.innerHeight - 64 - 64}
      selectedTheme={pageData?.author?.theme}>
      {isLoading && 'Loading...'}
      {pageData && (
        <Grid verticalGap={16}>
          {pageData.blocks.map((block: IBlock<any>) => (
            <GridColumn key={block.id} size={12}>
              <TargetBlockTypePreview block={block} selectedTheme={pageData?.author?.theme} />
            </GridColumn>
          ))}
        </Grid>
      )}
    </PageWrapper>
  );
});
