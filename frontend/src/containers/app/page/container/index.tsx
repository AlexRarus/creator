import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { TargetBlockTypePreview } from 'src/containers/app/block';
import { IBlock } from 'src/dal/blocks/interfaces';
import { IPage } from 'src/dal/pages/interfaces';
import { ITemplate } from 'src/dal/templates/interfaces';
import { SelectedThemeProvider } from 'src/providers/selected-theme-provider';
import { ITheme } from 'src/dal/themes/interfaces';
import { UserThemeBackground } from 'src/components/user-theme-background';
import { useTranslation } from 'react-i18next';

import { useMapStoreToProps } from './selectors';
import { PageWrapper, BlockPositioning } from './style';

interface IProps {
  username?: string;
  pageSlug?: string;
  templateSlug?: string;
  previewData?: IPage | ITemplate;
}

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
  const { t } = useTranslation('main');

  useEffect(() => {
    // если передали данные для предпросмотр то НЕ запрашиваем с бэка
    if (!initialized && !previewData && username) {
      getPageBySlugAction(username, pageSlug);
    }
    if (!initialized && !previewData && templateSlug) {
      getTemplateBySlugAction(templateSlug);
    }

    return () => {
      resetStoreAction();
    };
    // Внимание! НЕ следить за флагом initialized - приведет к рекурсивным рендерам
  }, [username, pageSlug, templateSlug, previewData]);

  useEffect(() => {
    // при монтировании страницы (в браузере) устанавливаем title и description страницы (если они есть)
    const title = document.documentElement.querySelector('title');
    const metaDescription = document.documentElement.querySelector('meta[name="description"]');

    if (data.title && title) {
      title.innerText = data.title;
    }
    if (data.description && metaDescription) {
      metaDescription.content = data.description;
    }

    return () => {
      // при размонтировании страницы (в браузере) устанавливаем дефолтные title и description
      if (data.title && title) {
        title.innerText = t('title');
      }
      if (data.description && metaDescription) {
        metaDescription.content = t('description');
      }
    };
  }, [data]);

  return (
    <SelectedThemeProvider selectedTheme={theme}>
      <PageWrapper>
        <UserThemeBackground theme={theme}>
          {isLoading && 'Loading...'}
          {pageData &&
            pageData?.blocks?.map((block: IBlock<any>) => (
              <BlockPositioning key={block.id} isSection={block.type === 'section'}>
                <TargetBlockTypePreview block={block} />
              </BlockPositioning>
            ))}
        </UserThemeBackground>
      </PageWrapper>
    </SelectedThemeProvider>
  );
});
