import React, { useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { ITemplate } from 'src/dal/templates/interfaces';
import { SelectedThemeProvider } from 'src/providers/selected-theme-provider';
import { ITheme } from 'src/dal/themes/interfaces';
import { UserThemeBackground } from 'src/components/user-theme-background';

import { useMapStoreToProps } from './selectors';
import { PageWrapper, BlockPositioning } from './style';

interface IProps {
  username?: string;
  pageSlug?: string;
  templateSlug?: string;
  previewData?: IPage | ITemplate;
}

// TODO тему для отображения пользовательской страницы берем у АВТОРА страницы
export const PageContainer = observer((props: IProps) => {
  const { username, pageSlug, templateSlug, previewData } = props;
  const {
    initialized,
    isLoading,
    getPageBySlugAction,
    getTemplateBySlugAction,
    data,
    resetStoreAction,
  } = useMapStoreToProps();
  const pageData: IPage | null = (previewData || data) as IPage;
  const templateData: ITemplate | null = (previewData || data) as ITemplate;
  const isTemplate = Boolean(templateSlug);
  const theme: ITheme | null | undefined = isTemplate
    ? templateData.theme
    : pageData?.author?.theme;

  useEffect(() => {
    // если передали данные для предпросмотр то НЕ запрашиваем с бэка
    if (!initialized && !previewData && username) {
      getPageBySlugAction(username, pageSlug);
    }
    if (!initialized && !previewData && templateSlug) {
      getTemplateBySlugAction(templateSlug);
    }

    return () => resetStoreAction();
  }, [initialized, username, pageSlug, templateSlug, previewData]);

  console.log('data', data && toJS(data));

  return (
    <SelectedThemeProvider selectedTheme={theme}>
      <PageWrapper>
        <UserThemeBackground theme={theme}>
          {isLoading && 'Loading...'}
          {pageData &&
            pageData.blocks?.map((block: IBlock<any>) => (
              <BlockPositioning key={block.id} isSection={block.type === 'section'}>
                <TargetBlockTypePreview block={block} />
              </BlockPositioning>
            ))}
        </UserThemeBackground>
      </PageWrapper>
    </SelectedThemeProvider>
  );
});
