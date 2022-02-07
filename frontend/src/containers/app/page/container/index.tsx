import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { SelectedThemeProvider } from 'src/providers/selected-theme-provider';
import { ITheme } from 'src/dal/themes/interfaces';
import { UserThemeBackground } from 'src/components/user-theme-background';

import { useMapStoreToProps } from './selectors';
import { PageWrapper, BlockPositioning } from './style';

interface IProps {
  username: string;
  pageSlug: string;
  previewData?: IPage;
}

// TODO тему для отображения пользовательской страницы берем у АВТОРА страницы
export const PageContainer = observer((props: IProps) => {
  const { isLoading, getPageBySlugAction, data } = useMapStoreToProps();
  const { username, pageSlug, previewData } = props;
  const isAuthor = useIsAuthor(username);
  const pageData: IPage | null = previewData || data;
  const theme: ITheme | null | undefined = pageData?.author?.theme;

  useEffect(() => {
    // если передали данные для предпросмотра то НЕ запрашиваем страницу с бэка
    if (!previewData) {
      getPageBySlugAction(username, pageSlug);
    }
  }, [isAuthor, pageSlug, previewData]);

  return (
    <SelectedThemeProvider selectedTheme={theme}>
      <PageWrapper>
        <UserThemeBackground theme={theme}>
          {isLoading && 'Loading...'}
          {pageData &&
            pageData.blocks.map((block: IBlock<any>) => (
              <BlockPositioning key={block.id} isSection={block.type === 'section'}>
                <TargetBlockTypePreview block={block} />
              </BlockPositioning>
            ))}
        </UserThemeBackground>
      </PageWrapper>
    </SelectedThemeProvider>
  );
});
