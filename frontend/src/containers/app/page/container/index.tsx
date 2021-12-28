import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useIsAuthor } from 'src/utils/useIsAuthor';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { useAppTypeContext } from 'src/providers/app-type-provider';
import { SelectedThemeProvider } from 'src/providers/selected-theme-provider';

import { useMapStoreToProps } from './selectors';
import { PageWrapper, UserThemeStyle, BlockPositioning } from './style';

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
  const { appType } = useAppTypeContext();

  useEffect(() => {
    // если передали данные для предпросмотра то НЕ запрашиваем страницу с бэка
    if (!previewData) {
      getPageBySlugAction(username, pageSlug);
    }
  }, [isAuthor, pageSlug, previewData]);

  const pageData: IPage | null = previewData || data;

  return (
    <SelectedThemeProvider selectedTheme={pageData?.author?.theme}>
      <PageWrapper
        isApp={appType === 'app'}
        // высота блока для скролла = screenHeight - верхнее меню - нижний блок кнопок
        blockViewHeight={window?.innerHeight - 64 - 64}>
        <UserThemeStyle selectedTheme={pageData?.author?.theme}>
          {isLoading && 'Loading...'}
          {pageData &&
            pageData.blocks.map((block: IBlock<any>) => (
              <BlockPositioning key={block.id} isSection={block.type === 'section'}>
                <TargetBlockTypePreview block={block} />
              </BlockPositioning>
            ))}
        </UserThemeStyle>
      </PageWrapper>
    </SelectedThemeProvider>
  );
});
